import { IVault } from "IVault";
import { VaultImp } from "Vault";
import { App, Notice, RequestUrlParam, RequestUrlResponsePromise, requestUrl, request } from "obsidian";
import { IObsidianLinksSettings } from "settings";
import { ILinkTextSuggestContext } from "suggesters/ILinkTextSuggestContext";
import { IUiFactory } from "ui/IUiFactory";
import { ButtonInfo } from "ui/PromotModal.common";
import { createMarkdownLink, createWikiLink, DestinationType, LinkData } from "utils";

export class ObsidianProxy {

    linkTextSuggestContext: ILinkTextSuggestContext;
    settings: IObsidianLinksSettings;
    Vault: IVault;
    app: App;
    uiFactory: IUiFactory;

    constructor(app: App, linkTextSuggestContext: ILinkTextSuggestContext, settings: IObsidianLinksSettings, uiFactory: IUiFactory) {
        this.app = app;
        this.linkTextSuggestContext = linkTextSuggestContext;
        this.settings = settings;

        this.Vault = new VaultImp(app);
        this.uiFactory = uiFactory;
    }

    createNotice(message: string | DocumentFragment, timeout?: number): Notice {
        return new Notice(message, timeout)
    }

    requestUrl(request: RequestUrlParam | string): RequestUrlResponsePromise {
        return requestUrl(request)
    }

    request(req: RequestUrlParam | string): Promise<string> {
        return request(req)
    }

    clipboardWriteText(text: string): void {
        navigator.clipboard.writeText(text);
    }

    clipboardReadText(): Promise<string> {
        return navigator.clipboard.readText();
    }

    linkTextSuggestContextSetLinkData(linkData: LinkData, titles: string[]): void {
        this.linkTextSuggestContext.setLinkData(linkData, titles);
    }

    showPromptModal(title: string, text: string[], buttons: ButtonInfo[], onSubmit: (result: string) => void): void {
        this.uiFactory.createPromptModal(title, text, buttons, onSubmit)
            .open();
    }

    createLink(sourcePath: string, destination: string, destinationSubPath?: string, text?: string, dimensions?: string): string {
        const useMarkdownLinks = this.Vault.configuration.useMarkdownLinks;
        //TODO: use destination type (absolute, relative, ...)
        return useMarkdownLinks
            ? createMarkdownLink(sourcePath, destination, destinationSubPath, text, dimensions, DestinationType.None)
            : createWikiLink(sourcePath, destination, destinationSubPath, text, dimensions, DestinationType.None)
    }
}