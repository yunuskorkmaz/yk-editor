import { ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class MarkdownDirective {
    private el;
    private sanitize;
    private render2;
    markdowntext: any;
    readonly html: string;
    _content: any;
    markedContent: string;
    renderer: any;
    constructor(el: ElementRef, sanitize: DomSanitizer, render2: Renderer2);
    renderMarkdown(text: any): void;
    markedRenderer(): void;
}
