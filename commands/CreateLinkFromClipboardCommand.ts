import { Editor } from "obsidian";
import { CommandBase, Func } from "./ICommand";
import { LinkTypes, findLink, findLinks, getFileName, getPageTitle, getSafeFilename } from "../utils";
import { IObsidianProxy } from "./IObsidianProxy";
import { selectWordUnderCursor } from "../editorUtils";
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import * as dotenv from 'dotenv';

dotenv.config();

async function getFilePath(
	fileId,
	username = process.env.DAV_USERNAME || '',
	password = process.env.DAV_PASSWORD || '',
	url = 'https://nixos.tailc910f.ts.net/remote.php/dav/'
) {
	const data = `<?xml version="1.0" encoding="UTF-8"?>
<d:searchrequest xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns">
    <d:basicsearch>
        <d:select>
            <d:prop>
                <d:displayname/>
            </d:prop>
        </d:select>
        <d:from>
            <d:scope>
                <d:href>/files/admin</d:href>
                <d:depth>infinity</d:depth>
            </d:scope>
        </d:from>
        <d:where>
            <d:eq>
                <d:prop>
                    <oc:fileid/>
                </d:prop>
                <d:literal>${fileId}</d:literal>
            </d:eq>
        </d:where>
        <d:orderby/>
    </d:basicsearch>
</d:searchrequest>`;

	const headers = { 'Content-Type': 'text/xml' };

	try {
		const response = await axios({
			method: 'SEARCH',
			url,
			data,
			headers,
			auth: {
				username,
				password,
			},
		});

		if (response.status !== 207) {
			return null;
		}

		const parser = new XMLParser();
		const parsedData = parser.parse(response.data);
		const href = parsedData['d:multistatus']?.['d:response']?.['d:href'];

		if (href) {
			const fullPath = href as string;
			if (fullPath.includes('/files/admin/')) {
				const filePath = fullPath.split('/files/admin/')[1];
				return filePath;
			}
		}

		return null;
	} catch (error) {
		return null;
	}
}

export class CreateLinkFromClipboardCommand extends CommandBase {
	obsidianProxy: IObsidianProxy;
	callback: ((error: Error | null, data: any) => void) | undefined

	constructor(obsidianProxy: IObsidianProxy,
		isPresentInContextMenu: Func<boolean> = () => true, isEnabled: Func<boolean> = () => true,
		callback: ((error: Error | null, data: any) => void) | undefined = undefined) {
		super(isPresentInContextMenu, isEnabled);
		this.id = 'editor-create-link-from-clipboard';
		this.displayNameCommand = 'Create link from clipboard';
		this.displayNameContextMenu = 'Create link from clipboard';
		this.icon = 'link';
		this.obsidianProxy = obsidianProxy;
		this.callback = callback;
	}

	handler(editor: Editor, checking: boolean): boolean | void {
		if (checking && !this.isEnabled()) {
			return false;
		}

		if (checking) {
			const noteText = editor.getValue();
			const cursorOffset = editor.posToOffset(editor.getCursor('from'))
			const link = findLink(noteText, cursorOffset, cursorOffset, LinkTypes.All)
			if (link && link.position.start < cursorOffset && link.position.end > cursorOffset) {
				return false;
			}
			return true;
		}

		(async () => {
			const httpUrlRegEx = /^(http|https):\/\/[^ "]+$/i;

			const clipboardText = await this.obsidianProxy.clipboardReadText();
			let linkDestination = clipboardText;

			if (!httpUrlRegEx.test(linkDestination)) {
				return;
			}

			const url = new URL(linkDestination);
			const pathSegments = url.pathname.split('/');
			const fileId = pathSegments[pathSegments.length - 1];

			if (!fileId) {
				console.error('Invalid URL format');
				return;
			}

			const filePath = await getFilePath(fileId);

			if (!filePath) {
				console.error('File path not found');
				return;
			}

			const username = 'admin';
			const newLink = `nextcloud://open-file?user=${username}&link=${url.origin}&path=${filePath}`;

			let selection = editor.getSelection();

			if (!selection && this.obsidianProxy.settings.autoselectWordOnCreateLink) {
				selection = selectWordUnderCursor(editor);
			}

			let posRangeStart = editor.getCursor();
			let posRangeEnd = posRangeStart;
			if (selection.length > 0) {
				posRangeStart = editor.getCursor('from');
				posRangeEnd = editor.getCursor('to');
				linkDestination = selection;
			}

			const requireAngleBrackets = newLink.indexOf(' ') > 0;
			const linkRawText = requireAngleBrackets ? `[${linkDestination}](<${newLink}>)` : `[${linkDestination}](${newLink})`;

			const endOffset = editor.posToOffset(posRangeStart) + linkRawText.length;
			editor.replaceRange(linkRawText, posRangeStart, posRangeEnd);
			if (linkDestination) {
				editor.setCursor(editor.offsetToPos(endOffset));
			} else {
				editor.setCursor(editor.offsetToPos(editor.posToOffset(posRangeStart) + 1));
			}
			this.callback?.(null, undefined);
		})();
	}

	async getPageText(url: URL): Promise<string> {
		const response = await this.obsidianProxy.requestUrl({ url: url.toString() });
		if (response.status !== 200) {
			throw new Error(`Failed to request '${url}': ${response.status}`);
		}
		return response.text;
	}
}
