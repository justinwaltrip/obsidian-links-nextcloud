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

	// feature flags
	ffReplaceLink: boolean;
	ffExtractSection: boolean;
	ffWrapNoteInFolder: boolean;
	ffConvertLinksInFolder: boolean;
	ffConvertLinkToHtmllink: boolean;
	ffObsidianUrlSupport: boolean;
	ffAutoselectWordOnCreateLink: boolean;
	ffHighlightBrokenLinks: boolean;
	ffSetLinkDestinationFromClipbard: boolean;

	//context menu
	contexMenu: {
		editLinkText: boolean;
		setLinkText: boolean;
		setLinkTextFromClipboard: boolean;
		editLinkDestination: boolean;
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
	autoselectWordOnCreateLink: false,

	//feature flags
	ffReplaceLink: false,
	ffExtractSection: false,
	ffWrapNoteInFolder: false,
	ffConvertLinksInFolder: false,
	ffConvertLinkToHtmllink: false,
	ffObsidianUrlSupport: false,
	ffAutoselectWordOnCreateLink: false,
	ffHighlightBrokenLinks: false,
	ffSetLinkDestinationFromClipbard: false,

	//context menu
	contexMenu: {
		editLinkText: true,
		setLinkText: true,
		setLinkTextFromClipboard: true,
		editLinkDestination: true,
		copyLinkDestination: true,
		unlink: true,
		convertToWikilink: true,
		convertToAutolink: true,
		convertToMakrdownLink: true,
		convertToHtmlLink: true,
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
		cutLinkToClipboard: true
	}
}