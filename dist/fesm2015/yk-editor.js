import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, Directive, Renderer2, SecurityContext, NgModule } from '@angular/core';
import { editor, Selection, languages } from 'monaco-editor';
import emoji from 'node-emoji';
import marked from 'marked';
import hljs from 'highlight.js';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AngularResizedEventModule } from 'angular-resize-event';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class YKEditorComponent {
    constructor() {
        this.contentChange = new EventEmitter();
        this._content = "";
        this.displayMode = "split";
        this.isFullScreen = false;
        this.theme = true;
        this.config = {
            language: "markdown",
            minimap: { enabled: false },
            lineNumbers: "off",
            theme: this.theme ? 'vs' : 'vs-dark',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            glyphMargin: false
        };
    }
    /**
     * @return {?}
     */
    get content() {
        return this._content;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set content(v) {
        this._content = v;
        this.contentChange.emit(v);
    }
    /**
     * @return {?}
     */
    changeTheme() {
        this.theme = !this.theme;
        this.theme == true ? editor.setTheme("vs") : editor.setTheme("vs-dark");
    }
    /**
     * @param {?} type
     * @return {?}
     */
    changeLayout(type) {
        if (this.displayMode != type || type == "fullscreen") {
            this.displayMode = type;
            switch (type) {
                case 'edit':
                    this.previewContainer.nativeElement.setAttribute("style", "display : none");
                    this.editorContainer.nativeElement.setAttribute("style", "min-width : 100%;max-width : 100%");
                    break;
                case 'preview':
                    this.editorContainer.nativeElement.setAttribute("style", "display : none");
                    this.previewContainer.nativeElement.setAttribute("style", "min-width : 100%;max-width : 100%");
                    break;
                case 'split':
                    this.previewContainer.nativeElement.setAttribute("style", "");
                    this.editorContainer.nativeElement.setAttribute("style", "");
                    break;
                case 'fullscreen':
                    this.isFullScreen = !this.isFullScreen;
                    if (this.isFullScreen == true)
                        this.mainContainer.nativeElement.setAttribute('style', "position: fixed;top: 0px;left: 0;bottom: 0;right: 0;width: 100%;height: 100%;");
                    else
                        this.mainContainer.nativeElement.setAttribute('style', "");
                    break;
            }
            this.baseEditor.layout();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.baseEditor = editor.create(this.host.nativeElement, this.config);
        this.baseEditor.setModel(editor.createModel(this.content, 'markdown'));
        this.baseEditor.onDidChangeModelContent((e) => {
            this.content = this.baseEditor.getValue();
        });
        /** @type {?} */
        var emojilist = [];
        for (var k in emoji.emoji) {
            emojilist.push({ label: k + " " + emoji.emoji[k], kind: languages.CompletionItemKind.Function, insertText: k + ":" });
        }
        languages.registerCompletionItemProvider('markdown', {
            provideCompletionItems: function (model, position) {
                /** @type {?} */
                var textUntilPosition = model.getValueInRange({ startLineNumber: position.lineNumber, startColumn: position.column - 1, endLineNumber: position.lineNumber, endColumn: position.column });
                if (textUntilPosition === ':') {
                    return emojilist;
                }
                return [];
            },
            triggerCharacters: [':']
        });
        languages.setLanguageConfiguration('markdown', {
            onEnterRules: [
                {
                    beforeText: /^[-]\s(.*)/,
                    action: { appendText: '- ', indentAction: languages.IndentAction.None }
                }
            ]
        });
        languages.registerCompletionItemProvider('markdown', {
            provideCompletionItems: () => {
                return [
                    {
                        label: 'h1',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '# ${1:text}'
                        }
                    },
                    {
                        label: 'h2',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '## ${1:text}'
                        }
                    },
                    {
                        label: 'h3',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '### ${1:text}'
                        }
                    },
                    {
                        label: 'h4',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '#### ${1:text}'
                        }
                    },
                    {
                        label: 'h5',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '##### ${1:text}'
                        }
                    },
                    {
                        label: 'h6',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '###### ${1:text}'
                        }
                    },
                    {
                        label: 'code',
                        kind: languages.CompletionItemKind.Snippet,
                        insertText: {
                            value: [
                                '```',
                                '${1:code}',
                                '```',
                            ].join('\n')
                        },
                        documentation: 'If-Else Statement'
                    },
                    {
                        label: 'link',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '[${1:linkText}](${2:url})'
                        }
                    },
                    {
                        label: 'image',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '![${1:altText}](${2:url})'
                        }
                    },
                    {
                        label: 'linkreferance',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '[${1:name}]: ${2:link}'
                        }
                    },
                    {
                        label: 'list',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '\n - ${1:text}'
                        }
                    },
                    {
                        label: 'todo un check',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '\n - [ ] ${2:text}'
                        }
                    },
                    {
                        label: 'todo check',
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: '\n - [x] ${2:text}'
                        }
                    }
                ];
            }
        });
        this.baseEditor.updateOptions({
            glyphMargin: false
        });
    }
    /**
     * @param {?} char
     * @param {?=} aftercharnewLine
     * @param {?=} line
     * @return {?}
     */
    charRepeatBasedInsertText(char, aftercharnewLine = false, line = 0) {
        /** @type {?} */
        var count = char.trim().length;
        /** @type {?} */
        const selection = this.baseEditor.getSelection();
        /** @type {?} */
        var text = this.baseEditor.getModel().getValueInRange(selection);
        text.trim();
        /** @type {?} */
        var beforeselection = new Selection(selection.selectionStartLineNumber, selection.selectionStartColumn - count, selection.positionLineNumber, selection.positionColumn - text.length);
        /** @type {?} */
        var afterselection = new Selection(selection.selectionStartLineNumber, selection.positionColumn, selection.positionLineNumber, selection.positionColumn + count);
        /** @type {?} */
        var startchar = this.baseEditor.getModel().getValueInRange(beforeselection);
        /** @type {?} */
        var endchar = this.baseEditor.getModel().getValueInRange(afterselection);
        if (startchar == char && endchar == char) {
            this.baseEditor.executeEdits('', [{ range: afterselection, text: '' }]);
            this.baseEditor.executeEdits('', [{ range: beforeselection, text: '' }]);
        }
        else {
            text = `${aftercharnewLine == true ? '\n' : ''}${char}${aftercharnewLine == true ? '\n' : ''}${text}${aftercharnewLine == true ? '\n' : ''}${char}`;
            this.baseEditor.executeEdits('', [{ range: selection, text: text }]);
            this.baseEditor.setSelection({
                startColumn: selection.startColumn + (line == 0 ? count : 0),
                endColumn: selection.endColumn + (line == 0 ? count : 0),
                startLineNumber: selection.startLineNumber + line,
                endLineNumber: selection.endLineNumber + line
            });
        }
        this.baseEditor.focus();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    linkBasedInsertText(type) {
        /** @type {?} */
        var count = type == "image" ? 4 : 3;
        /** @type {?} */
        var extrachar = type == "image" ? "!" : "";
        /** @type {?} */
        const selection = this.baseEditor.getSelection();
        /** @type {?} */
        var text = this.baseEditor.getModel().getValueInRange(selection);
        /** @type {?} */
        var newText = `${extrachar}[${text}]()`;
        this.baseEditor.executeEdits('', [{ range: selection, text: newText }]);
        this.baseEditor.setPosition({
            lineNumber: selection.endLineNumber,
            column: selection.endColumn + count
        });
        this.baseEditor.focus();
    }
    /**
     * @param {?} type
     * @param {?=} fill
     * @return {?}
     */
    listBasedInsertText(type, fill = false) {
        /** @type {?} */
        var extra = type == 'todo' ? fill == true ? '[x]' : '[ ]' : '';
        /** @type {?} */
        const selection = this.baseEditor.getSelection();
        /** @type {?} */
        var text = this.baseEditor.getModel().getValueInRange(selection);
        /** @type {?} */
        var newText = `\n - ${extra} ${text} `;
        this.baseEditor.executeEdits('', [{ range: selection, text: newText }]);
        this.baseEditor.setPosition({
            lineNumber: selection.endLineNumber + 1,
            column: type == 'todo' ? 8 : 4
        });
        this.baseEditor.focus();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    insertContent(type) {
        switch (type) {
            case 'bold':
                this.charRepeatBasedInsertText("**");
                break;
            case 'italic':
                this.charRepeatBasedInsertText("*");
                break;
            case 'strikethrough':
                this.charRepeatBasedInsertText("~~");
                break;
            case 'link':
                this.linkBasedInsertText("link");
                break;
            case 'image':
                this.linkBasedInsertText("image");
                break;
            case 'code':
                this.charRepeatBasedInsertText('```', true, +1);
                break;
            case 'inline-code':
                this.charRepeatBasedInsertText('`');
                break;
            case 'undo':
                this.baseEditor.trigger("", "undo", "");
                break;
            case 'redo':
                this.baseEditor.trigger('', 'redo', '');
                break;
            case 'list':
                this.listBasedInsertText('link');
                break;
            case 'todo-x':
                this.listBasedInsertText('todo', true);
                break;
            case 'todo-o':
                this.listBasedInsertText('todo', false);
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResized(event) {
        this.baseEditor.layout();
    }
}
YKEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'yk-editor',
                template: "<div (resized)=\"onResized($event)\" class=\"main-container\" #mainContainer>\n  <div class=\"toolbar\">\n    <div>\n      <button (click)=\"insertContent('undo')\">\n        <i class=\"fa fa-undo\"></i>\n      </button>\n      <button (click)=\"insertContent('redo')\">\n        <i class=\"fa fa-repeat\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('bold')\">\n        <i class=\"fa fa-bold\"></i>\n      </button>\n      <button (click)=\"insertContent('italic')\">\n        <i class=\"fa fa-italic\"></i>\n      </button>\n\n      <button (click)=\"insertContent('strikethrough')\">\n        <i class=\"fa fa-strikethrough\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('link')\">\n        <i class=\"fa fa-link\"></i>\n      </button>\n      <button (click)=\"insertContent('image')\">\n        <i class=\"fa fa-picture-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('code')\">\n        <i class=\"fa fa-code\"></i>\n      </button>\n      <button (click)=\"insertContent('inline-code')\">\n        <i class=\"fa fa-terminal\"></i>\n      </button>\n      <button (click)=\"insertContent('list')\">\n        <i class=\"fa fa-list-ul\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-x')\">\n        <i class=\"fa fa-check-square-o\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-o')\">\n        <i class=\"fa fa-square-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"changeTheme()\">\n        <i class=\"fa\" [ngClass]=\"{'fa-moon-o': theme, 'fa-sun-o': !theme}\"></i>\n      </button>\n      <button (click)=\"changeLayout('fullscreen')\">\n        <i class=\"fa fa-arrows-alt\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button (click)=\"changeLayout('edit')\" [ngClass]=\"{'active': displayMode == 'edit'}\">\n        <i class=\"fa fa-pencil-square-o\"></i>\n      </button>\n      <button (click)=\"changeLayout('split')\" [ngClass]=\" {'active': displayMode=='split' }\">\n        <i class=\"fa fa-columns\"></i>\n      </button>\n      <button (click)=\"changeLayout('preview')\" [ngClass]=\"{'active': displayMode == 'preview'}\">\n        <i class=\"fa fa-eye\"></i>\n      </button>\n    </div>\n\n  </div>\n  <div (resized)=\"onResized($event)\" class=\"editor-container\">\n    <div (resized)=\"onResized($event)\" class=\"editor\" #editorContainer>\n      <div class=\"monaco-editor\" #editorhost></div>\n    </div>\n    <div (resized)=\"onResized($event)\" class=\"preview\" #previewContainer [ngClass]=\"{'light': theme, 'dark':!theme}\">\n      <div markdown [markdowntext]=\"content\" class=\"rendered-markdown\"></div>\n    </div>\n  </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
YKEditorComponent.ctorParameters = () => [];
YKEditorComponent.propDecorators = {
    content: [{ type: Input }],
    contentChange: [{ type: Output }],
    host: [{ type: ViewChild, args: ["editorhost",] }],
    editorContainer: [{ type: ViewChild, args: ["editorContainer",] }],
    previewContainer: [{ type: ViewChild, args: ["previewContainer",] }],
    mainContainer: [{ type: ViewChild, args: ['mainContainer',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MarkdownDirective {
    /**
     * @param {?} el
     * @param {?} sanitize
     * @param {?} render2
     */
    constructor(el, sanitize, render2) {
        this.el = el;
        this.sanitize = sanitize;
        this.render2 = render2;
        this.renderer = new marked.Renderer();
        this.markedRenderer();
        this.renderMarkdown("");
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set markdowntext(v) {
        if (v != null && v != this._content) {
            this._content = v;
            this.renderMarkdown(this._content);
        }
    }
    /**
     * @return {?}
     */
    get html() {
        return this.markedContent;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    renderMarkdown(text) {
        /** @type {?} */
        const replacer = (match) => emoji.emojify(match);
        text = text.replace(/(:.*:)/g, replacer);
        this.markedContent = marked(text);
        this.markedContent = /** @type {?} */ (this.sanitize.bypassSecurityTrustHtml(this.markedContent));
        this.el.nativeElement.innerHTML = this.sanitize.sanitize(SecurityContext.HTML, this.markedContent);
    }
    /**
     * @return {?}
     */
    markedRenderer() {
        this.renderer.listitem = (text) => {
            if (/^\s*\[[x ]\]\s*/.test(text)) {
                text = text
                    .replace(/^\s*\[ \]\s*/, '<i class="fa fa-square-o" style="margin: 0 0.2em 0.25em -1.6em;"></i> ')
                    .replace(/^\s*\[x\]\s*/, '<i class="fa fa-check-square" style="margin: 0 0.2em 0.25em -1.6em;"></i> ');
                return `<li style="list-style: none;">${text}</li>`;
            }
            else {
                return `<li>${text}</li>`;
            }
        };
        this.renderer.table = (header, body) => {
            return `<table class="table table-bordered">\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>\n`;
        };
        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            },
            renderer: this.renderer,
            tables: true,
            sanitize: false,
            smartLists: true,
        });
    }
}
MarkdownDirective.decorators = [
    { type: Directive, args: [{
                selector: '[markdown]'
            },] }
];
/** @nocollapse */
MarkdownDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DomSanitizer },
    { type: Renderer2 }
];
MarkdownDirective.propDecorators = {
    markdowntext: [{ type: Input }],
    html: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class YkEditorModule {
}
YkEditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    AngularResizedEventModule
                ],
                declarations: [YKEditorComponent, MarkdownDirective],
                exports: [YKEditorComponent, MarkdownDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { YkEditorModule, YKEditorComponent, MarkdownDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWstZWRpdG9yLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly95ay1lZGl0b3IvbGliL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudC50cyIsIm5nOi8veWstZWRpdG9yL2xpYi9tYXJrZG93bi5kaXJlY3RpdmUudHMiLCJuZzovL3lrLWVkaXRvci9saWIveWstZWRpdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZWRpdG9yLCBTZWxlY3Rpb24sIGxhbmd1YWdlc30gZnJvbSAnbW9uYWNvLWVkaXRvcic7XHJcbmltcG9ydCBlbW9qaSBmcm9tICdub2RlLWVtb2ppJ1xyXG5pbXBvcnQgeyBSZXNpemVkRXZlbnQgfSBmcm9tICdhbmd1bGFyLXJlc2l6ZS1ldmVudC9yZXNpemVkLWV2ZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAneWstZWRpdG9yJyxcclxuICB0ZW1wbGF0ZVVybDogJy4veWtlZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3lrZWRpdG9yLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgWUtFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuXHJcbiAgQElucHV0KCkgZ2V0IGNvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGVudDtcclxuICB9XHJcblxyXG4gIHNldCBjb250ZW50KHYpIHtcclxuICAgIHRoaXMuX2NvbnRlbnQgPSB2O1xyXG4gICAgdGhpcy5jb250ZW50Q2hhbmdlLmVtaXQodik7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgY29udGVudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgX2NvbnRlbnQgPSBcIlwiO1xyXG4gIEBWaWV3Q2hpbGQoXCJlZGl0b3Job3N0XCIpIGhvc3Q6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImVkaXRvckNvbnRhaW5lclwiKSBlZGl0b3JDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInByZXZpZXdDb250YWluZXJcIikgcHJldmlld0NvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdtYWluQ29udGFpbmVyJykgbWFpbkNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBiYXNlRWRpdG9yOiBhbnk7XHJcblxyXG4gIGRpc3BsYXlNb2RlOiBzdHJpbmcgPSBcInNwbGl0XCI7XHJcblxyXG4gIGlzRnVsbFNjcmVlbiA9IGZhbHNlO1xyXG5cclxuICB0aGVtZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNoYW5nZVRoZW1lKCkge1xyXG4gICAgdGhpcy50aGVtZSA9ICF0aGlzLnRoZW1lO1xyXG4gICAgdGhpcy50aGVtZSA9PSB0cnVlID8gZWRpdG9yLnNldFRoZW1lKFwidnNcIikgOiBlZGl0b3Iuc2V0VGhlbWUoXCJ2cy1kYXJrXCIpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTGF5b3V0KHR5cGUpIHtcclxuICAgIGlmICh0aGlzLmRpc3BsYXlNb2RlICE9IHR5cGUgfHwgdHlwZSA9PSBcImZ1bGxzY3JlZW5cIikge1xyXG4gICAgICB0aGlzLmRpc3BsYXlNb2RlID0gdHlwZTtcclxuICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnZWRpdCc6XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXkgOiBub25lXCIpO1xyXG4gICAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1pbi13aWR0aCA6IDEwMCU7bWF4LXdpZHRoIDogMTAwJVwiKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3ByZXZpZXcnOlxyXG4gICAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXkgOiBub25lXCIpO1xyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJtaW4td2lkdGggOiAxMDAlO21heC13aWR0aCA6IDEwMCVcIik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzcGxpdCc6XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIlwiKTtcclxuICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdmdWxsc2NyZWVuJzpcclxuXHJcbiAgICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbiA9ICF0aGlzLmlzRnVsbFNjcmVlbjtcclxuICAgICAgICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbiA9PSB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJwb3NpdGlvbjogZml4ZWQ7dG9wOiAwcHg7bGVmdDogMDtib3R0b206IDA7cmlnaHQ6IDA7d2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO1wiKTtcclxuICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiXCIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmxheW91dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgXHJcblxyXG4gIH1cclxuXHJcbiAgY29uZmlnOiBhbnkgPSB7XHJcblxyXG4gICAgbGFuZ3VhZ2U6IFwibWFya2Rvd25cIixcclxuICAgIG1pbmltYXA6IHsgZW5hYmxlZDogZmFsc2UgfSxcclxuICAgIGxpbmVOdW1iZXJzOiBcIm9mZlwiLFxyXG4gICAgdGhlbWU6IHRoaXMudGhlbWUgPyAndnMnIDogJ3ZzLWRhcmsnLFxyXG4gICAgc2Nyb2xsQmV5b25kTGFzdExpbmU6IGZhbHNlLFxyXG4gICAgd29yZFdyYXA6ICdvbicsXHJcbiAgICBnbHlwaE1hcmdpbjogZmFsc2VcclxuICB9XHJcblxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYmFzZUVkaXRvciA9IGVkaXRvci5jcmVhdGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuY29uZmlnKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRNb2RlbChlZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5jb250ZW50LCAnbWFya2Rvd24nKSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKGUpID0+IHtcclxuICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5iYXNlRWRpdG9yLmdldFZhbHVlKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBlbW9qaWxpc3QgPSBbXTtcclxuICAgIGZvciAodmFyIGsgaW4gZW1vamkuZW1vamkpIHsgZW1vamlsaXN0LnB1c2goeyBsYWJlbDogayArIFwiIFwiICsgZW1vamkuZW1vamlba10sIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuRnVuY3Rpb24sIGluc2VydFRleHQ6IGsgKyBcIjpcIiB9KSB9XHJcblxyXG4gICAgbGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcignbWFya2Rvd24nLCB7XHJcbiAgICAgIHByb3ZpZGVDb21wbGV0aW9uSXRlbXM6IGZ1bmN0aW9uIChtb2RlbCwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdGV4dFVudGlsUG9zaXRpb24gPSBtb2RlbC5nZXRWYWx1ZUluUmFuZ2UoeyBzdGFydExpbmVOdW1iZXI6IHBvc2l0aW9uLmxpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uOiBwb3NpdGlvbi5jb2x1bW4gLSAxLCBlbmRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLCBlbmRDb2x1bW46IHBvc2l0aW9uLmNvbHVtbiB9KTtcclxuICAgICAgICBpZiAodGV4dFVudGlsUG9zaXRpb24gPT09ICc6JykgeyByZXR1cm4gZW1vamlsaXN0OyB9IHJldHVybiBbXTtcclxuICAgICAgfSxcclxuICAgICAgdHJpZ2dlckNoYXJhY3RlcnM6IFsnOiddXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW5ndWFnZXMuc2V0TGFuZ3VhZ2VDb25maWd1cmF0aW9uKCdtYXJrZG93bicsIHtcclxuICAgICAgb25FbnRlclJ1bGVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYmVmb3JlVGV4dDogL15bLV1cXHMoLiopLyxcclxuICAgICAgICAgIGFjdGlvbjogeyBhcHBlbmRUZXh0OiAnLSAnLCBpbmRlbnRBY3Rpb246IGxhbmd1YWdlcy5JbmRlbnRBY3Rpb24uTm9uZSB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBsYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKCdtYXJrZG93bicsIHtcclxuICAgICAgcHJvdmlkZUNvbXBsZXRpb25JdGVtczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDEnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2gyJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDMnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDQnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2g1JyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyMjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDYnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjIyMjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnY29kZScsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuU25pcHBldCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBbXHJcbiAgICAgICAgICAgICAgICAnYGBgJyxcclxuICAgICAgICAgICAgICAgICckezE6Y29kZX0nLFxyXG4gICAgICAgICAgICAgICAgJ2BgYCcsXHJcblxyXG4gICAgICAgICAgICAgIF0uam9pbignXFxuJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJ0lmLUVsc2UgU3RhdGVtZW50J1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdsaW5rJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdbJHsxOmxpbmtUZXh0fV0oJHsyOnVybH0pJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2ltYWdlJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICchWyR7MTphbHRUZXh0fV0oJHsyOnVybH0pJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2xpbmtyZWZlcmFuY2UnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1skezE6bmFtZX1dOiAkezI6bGlua30nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnbGlzdCcsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnXFxuIC0gJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ3RvZG8gdW4gY2hlY2snLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1xcbiAtIFsgXSAkezI6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ3RvZG8gY2hlY2snLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1xcbiAtIFt4XSAkezI6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYmFzZUVkaXRvci51cGRhdGVPcHRpb25zKHtcclxuICAgICAgZ2x5cGhNYXJnaW4gOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIGNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoY2hhciwgYWZ0ZXJjaGFybmV3TGluZSA9IGZhbHNlLCBsaW5lID0gMCkge1xyXG4gICAgdmFyIGNvdW50ID0gY2hhci50cmltKCkubGVuZ3RoO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHRleHQudHJpbSgpO1xyXG4gICAgdmFyIGJlZm9yZXNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0Q29sdW1uIC0gY291bnQsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkxpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbiAtIHRleHQubGVuZ3RoKTtcclxuXHJcbiAgICB2YXIgYWZ0ZXJzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uTGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uICsgY291bnQpO1xyXG5cclxuICAgIHZhciBzdGFydGNoYXIgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2UoYmVmb3Jlc2VsZWN0aW9uKTtcclxuICAgIHZhciBlbmRjaGFyID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKGFmdGVyc2VsZWN0aW9uKTtcclxuXHJcblxyXG5cclxuICAgIGlmIChzdGFydGNoYXIgPT0gY2hhciAmJiBlbmRjaGFyID09IGNoYXIpIHtcclxuXHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBhZnRlcnNlbGVjdGlvbiwgdGV4dDogJycgfV0pO1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKCcnLCBbeyByYW5nZTogYmVmb3Jlc2VsZWN0aW9uLCB0ZXh0OiAnJyB9XSk7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRleHQgPSBgJHthZnRlcmNoYXJuZXdMaW5lID09IHRydWUgPyAnXFxuJyA6ICcnfSR7Y2hhcn0ke2FmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/ICdcXG4nIDogJyd9JHt0ZXh0fSR7YWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gJ1xcbicgOiAnJ30ke2NoYXJ9YDtcclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cygnJywgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogdGV4dCB9XSk7XHJcblxyXG4gICAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0U2VsZWN0aW9uKHtcclxuICAgICAgICBzdGFydENvbHVtbjogc2VsZWN0aW9uLnN0YXJ0Q29sdW1uICsgKGxpbmUgPT0gMCA/IGNvdW50IDogMCksXHJcbiAgICAgICAgZW5kQ29sdW1uOiBzZWxlY3Rpb24uZW5kQ29sdW1uICsgKGxpbmUgPT0gMCA/IGNvdW50IDogMCksXHJcbiAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiBzZWxlY3Rpb24uc3RhcnRMaW5lTnVtYmVyICsgbGluZSxcclxuICAgICAgICBlbmRMaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlciArIGxpbmVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcbiAgbGlua0Jhc2VkSW5zZXJ0VGV4dCh0eXBlKSB7XHJcbiAgICB2YXIgY291bnQgPSB0eXBlID09IFwiaW1hZ2VcIiA/IDQgOiAzO1xyXG4gICAgdmFyIGV4dHJhY2hhciA9IHR5cGUgPT0gXCJpbWFnZVwiID8gXCIhXCIgOiBcIlwiO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHZhciBuZXdUZXh0ID0gYCR7ZXh0cmFjaGFyfVske3RleHR9XSgpYDtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IG5ld1RleHQgfV0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldFBvc2l0aW9uKHtcclxuICAgICAgbGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIsXHJcbiAgICAgIGNvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIGNvdW50XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuICBsaXN0QmFzZWRJbnNlcnRUZXh0KHR5cGUsIGZpbGwgPSBmYWxzZSkge1xyXG4gICAgdmFyIGV4dHJhID0gdHlwZSA9PSAndG9kbycgPyBmaWxsID09IHRydWUgPyAnW3hdJyA6ICdbIF0nIDogJyc7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmJhc2VFZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICB2YXIgdGV4dCA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShzZWxlY3Rpb24pO1xyXG4gICAgdmFyIG5ld1RleHQgPSBgXFxuIC0gJHtleHRyYX0gJHt0ZXh0fSBgO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cygnJywgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogbmV3VGV4dCB9XSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0UG9zaXRpb24oe1xyXG4gICAgICBsaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlciArIDEsXHJcbiAgICAgIGNvbHVtbjogdHlwZSA9PSAndG9kbycgPyA4IDogNFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGluc2VydENvbnRlbnQodHlwZSkge1xyXG5cclxuXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnYm9sZCc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiKipcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2l0YWxpYyc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiKlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc3RyaWtldGhyb3VnaCc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwifn5cIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xpbmsnOlxyXG4gICAgICAgIHRoaXMubGlua0Jhc2VkSW5zZXJ0VGV4dChcImxpbmtcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2ltYWdlJzpcclxuICAgICAgICB0aGlzLmxpbmtCYXNlZEluc2VydFRleHQoXCJpbWFnZVwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY29kZSc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KCdgYGAnLCB0cnVlLCArMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2lubGluZS1jb2RlJzpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoJ2AnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndW5kbyc6XHJcbiAgICAgICAgdGhpcy5iYXNlRWRpdG9yLnRyaWdnZXIoXCJcIiwgXCJ1bmRvXCIsIFwiXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyZWRvJzpcclxuICAgICAgICB0aGlzLmJhc2VFZGl0b3IudHJpZ2dlcignJywgJ3JlZG8nLCAnJyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xpc3QnOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dCgnbGluaycpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b2RvLXgnOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dCgndG9kbycsIHRydWUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b2RvLW8nOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dCgndG9kbycsIGZhbHNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUmVzaXplZChldmVudDogUmVzaXplZEV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IubGF5b3V0KCk7XHJcbiAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBPdXRwdXQsIFJlbmRlcmVyMiwgU2VjdXJpdHlDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgbWFya2VkIGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgaGxqcyBmcm9tIFwiaGlnaGxpZ2h0LmpzXCI7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCBlbW9qaSBmcm9tICdub2RlLWVtb2ppJ1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXJrZG93bl0nXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBzZXQgbWFya2Rvd250ZXh0KHYpIHtcbiAgICBpZiAodiAhPSBudWxsICYmIHYgIT0gdGhpcy5fY29udGVudCkge1xuICAgICAgdGhpcy5fY29udGVudCA9IHY7XG4gICAgICB0aGlzLnJlbmRlck1hcmtkb3duKHRoaXMuX2NvbnRlbnQpO1xuICAgIH1cbiAgfVxuICBAT3V0cHV0KCkgZ2V0IGh0bWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2VkQ29udGVudDtcbiAgfVxuICBfY29udGVudDtcbiAgbWFya2VkQ29udGVudDogc3RyaW5nO1xuICByZW5kZXJlciA9IG5ldyBtYXJrZWQuUmVuZGVyZXIoKTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgc2FuaXRpemU6IERvbVNhbml0aXplciwgcHJpdmF0ZSByZW5kZXIyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLm1hcmtlZFJlbmRlcmVyKCk7XG4gICAgdGhpcy5yZW5kZXJNYXJrZG93bihcIlwiKTtcbiAgfVxuXG5cbiAgcmVuZGVyTWFya2Rvd24odGV4dCkge1xuICAgIGNvbnN0IHJlcGxhY2VyID0gKG1hdGNoKSA9PiBlbW9qaS5lbW9qaWZ5KG1hdGNoKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oOi4qOikvZywgcmVwbGFjZXIpO1xuXG4gICAgdGhpcy5tYXJrZWRDb250ZW50ID0gbWFya2VkKHRleHQpO1xuXG4gICAgdGhpcy5tYXJrZWRDb250ZW50ID0gdGhpcy5zYW5pdGl6ZS5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLm1hcmtlZENvbnRlbnQpIGFzIHN0cmluZ1xuXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuc2FuaXRpemUuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LkhUTUwsIHRoaXMubWFya2VkQ29udGVudCk7XG5cbiAgfVxuXG4gIG1hcmtlZFJlbmRlcmVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0gPSAodGV4dDogYW55KSA9PiB7XG4gICAgICBpZiAoL15cXHMqXFxbW3ggXVxcXVxccyovLnRlc3QodGV4dCkpIHtcbiAgICAgICAgdGV4dCA9IHRleHRcbiAgICAgICAgICAucmVwbGFjZSgvXlxccypcXFsgXFxdXFxzKi8sICc8aSBjbGFzcz1cImZhIGZhLXNxdWFyZS1vXCIgc3R5bGU9XCJtYXJnaW46IDAgMC4yZW0gMC4yNWVtIC0xLjZlbTtcIj48L2k+ICcpXG4gICAgICAgICAgLnJlcGxhY2UoL15cXHMqXFxbeFxcXVxccyovLCAnPGkgY2xhc3M9XCJmYSBmYS1jaGVjay1zcXVhcmVcIiBzdHlsZT1cIm1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtO1wiPjwvaT4gJyk7XG4gICAgICAgIHJldHVybiBgPGxpIHN0eWxlPVwibGlzdC1zdHlsZTogbm9uZTtcIj4ke3RleHR9PC9saT5gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGA8bGk+JHt0ZXh0fTwvbGk+YDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMucmVuZGVyZXIudGFibGUgPSAoaGVhZGVyOiBzdHJpbmcsIGJvZHk6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZFwiPlxcbjx0aGVhZD5cXG4ke2hlYWRlcn08L3RoZWFkPlxcbjx0Ym9keT5cXG4ke2JvZHl9PC90Ym9keT5cXG48L3RhYmxlPlxcbmA7XG4gICAgfTtcblxuICAgIG1hcmtlZC5zZXRPcHRpb25zKHtcbiAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGhsanMuaGlnaGxpZ2h0QXV0byhjb2RlKS52YWx1ZTtcbiAgICAgIH0sXG4gICAgICByZW5kZXJlcjogdGhpcy5yZW5kZXJlcixcbiAgICAgIHRhYmxlczogdHJ1ZSxcbiAgICAgIHNhbml0aXplOiBmYWxzZSxcbiAgICAgIHNtYXJ0TGlzdHM6IHRydWUsXG5cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFlLRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi95a2VkaXRvci95a2VkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFya2Rvd25EaXJlY3RpdmUgfSBmcm9tICcuL21hcmtkb3duLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBBbmd1bGFyUmVzaXplZEV2ZW50TW9kdWxlIH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBBbmd1bGFyUmVzaXplZEV2ZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWyBZS0VkaXRvckNvbXBvbmVudCwgTWFya2Rvd25EaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbWUtFZGl0b3JDb21wb25lbnQsTWFya2Rvd25EaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIFlrRWRpdG9yTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQXdFRTs2QkFsRDBCLElBQUksWUFBWSxFQUFFO3dCQUVqQyxFQUFFOzJCQU9TLE9BQU87NEJBRWQsS0FBSztxQkFFSCxJQUFJO3NCQTBDUDtZQUVaLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLE9B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