import { OnInit, ElementRef, EventEmitter } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event/resized-event';
export declare class YKEditorComponent implements OnInit {
    content: string;
    contentChange: EventEmitter<{}>;
    _content: string;
    host: ElementRef;
    editorContainer: ElementRef;
    previewContainer: ElementRef;
    mainContainer: ElementRef;
    baseEditor: any;
    displayMode: string;
    isFullScreen: boolean;
    theme: boolean;
    changeTheme(): void;
    changeLayout(type: any): void;
    constructor();
    config: any;
    ngOnInit(): void;
    charRepeatBasedInsertText(char: any, aftercharnewLine?: boolean, line?: number): void;
    linkBasedInsertText(type: any): void;
    listBasedInsertText(type: any, fill?: boolean): void;
    insertContent(type: any): void;
    onResized(event: ResizedEvent): void;
}
