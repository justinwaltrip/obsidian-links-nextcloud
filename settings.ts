import { InternalWikilinkWithoutTextAction } from "utils";

export interface IObsidianLinksSettings {
	linkReplacements: { source: string, target: string }[];
	titleSeparator: string;
	showPerformanceNotification: boolean;

	//TODO: remove
	removeLinksFromHeadingsInternalWikilinkWithoutTextReplacement: string;
	deleteUnreferencedLinkTarget: boolean;

	removeLinksFromHeadingsInternalWikilinkWithoutTextAction: InternalWikilinkWithoutTextAction;
	onConvertToMdlinkAppendMdExtension: boolean;
	autoselectWordOnCreateLink: boolean;
	skipFrontmatterInNoteWideCommands: boolean;

	// feature flags
	ffReplaceLink: boolean;
	ffExtractSection: boolean;
	ffWrapNoteInFolder: boolean;
	ffConvertLinksInFolder: boolean;
	ffObsidianUrlSupport: boolean;
	ffHighlightBrokenLinks: boolean;
	ffSetLinkDestinationFromClipbard: boolean;
	ffSkipFrontmatterInNoteWideCommands: boolean;
	ffCopyLinkToObject: boolean;
	ffCopyLinkToBlock: boolean;

	//context menu
	contexMenu: {
		editLinkText: boolean;
		setLinkText: boolean;
		setLinkTextFromClipboard: boolean;
		editLinkDestination: boolean;
		setLinkDestinationFromClipboard: boolean;
		copyLinkDestination: boolean;
		unlink: boolean;
		convertToWikilink: boolean;
		convertToAutolink: boolean;
		convertToMakrdownLink: boolean;
		convertToHtmlLink: boolean;
		replaceLink: boolean;
		embedUnembedLink: boolean;
		deleteLink: boolean;
		createLink: boolean;
		createLinkFromClipboard: boolean;
		convertAllLinksToMdLinks: boolean;
		convertWikilinkToMdLinks: boolean;
		convertUrlsToMdlinks: boolean;
		convertAutolinksToMdlinks: boolean;
		convertHtmllinksToMdlinks: boolean;
		extractSection: boolean;
		wrapNoteInFolder: boolean;
		copyLinkToClipboard: boolean;
		copyLinkToHeadingToClipboard: boolean;
		copyLinkToBlockToClipboard: boolean;
		cutLinkToClipboard: boolean;
	}
}

export const DEFAULT_SETTINGS: IObsidianLinksSettings = {
	linkReplacements: [],
	titleSeparator: " • ",
	showPerformanceNotification: false,

	//TODO: remove
	removeLinksFromHeadingsInternalWikilinkWithoutTextReplacement: "Destination",

	deleteUnreferencedLinkTarget: true,

	removeLinksFromHeadingsInternalWikilinkWithoutTextAction: InternalWikilinkWithoutTextAction.None,
	onConvertToMdlinkAppendMdExtension: false,
	autoselectWordOnCreateLink: true,
	skipFrontmatterInNoteWideCommands: true,

	//feature flags
	ffReplaceLink: false,
	ffExtractSection: false,
	ffWrapNoteInFolder: false,
	ffConvertLinksInFolder: false,
	ffObsidianUrlSupport: false,
	ffHighlightBrokenLinks: false,
	ffSetLinkDestinationFromClipbard: false,
	ffSkipFrontmatterInNoteWideCommands: false,
	ffCopyLinkToObject: false,
	ffCopyLinkToBlock: false,


	//context menu
	//TODO: fix typo
	contexMenu: {
		editLinkText: true,
		setLinkText: true,
		setLinkTextFromClipboard: true,
		editLinkDestination: true,
		setLinkDestinationFromClipboard: true,
		copyLinkDestination: true,
		unlink: true,
		convertToWikilink: true,
		convertToAutolink: true,
		convertToMakrdownLink: true,
		convertToHtmlLink: false,
		replaceLink: true,
		embedUnembedLink: true,
		deleteLink: true,
		createLink: true,
		createLinkFromClipboard: true,
		convertAllLinksToMdLinks: false,
		convertWikilinkToMdLinks: false,
		convertUrlsToMdlinks: false,
		convertAutolinksToMdlinks: false,
		convertHtmllinksToMdlinks: false,
		extractSection: false,
		wrapNoteInFolder: false,
		copyLinkToClipboard: true,
		copyLinkToHeadingToClipboard: true,
		copyLinkToBlockToClipboard: false,
		cutLinkToClipboard: true
	}
}