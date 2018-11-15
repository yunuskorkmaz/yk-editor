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
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.contentChange = new EventEmitter();
        this._content = "";
        this.displayMode = "split";
        this.isFullScreen = false;
        this.theme = true;
        this.config = {
            language: "markdown",
            minimap: { enabled: false },
            lineNumbers: "off",
            theme: this.theme ? "vs" : "vs-dark",
            scrollBeyondLastLine: false,
            wordWrap: "on",
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
                case "edit":
                    this.previewContainer.nativeElement.setAttribute("style", "display : none");
                    this.editorContainer.nativeElement.setAttribute("style", "min-width : 100%;max-width : 100%");
                    break;
                case "preview":
                    this.editorContainer.nativeElement.setAttribute("style", "display : none");
                    this.previewContainer.nativeElement.setAttribute("style", "min-width : 100%;max-width : 100%");
                    break;
                case "split":
                    this.previewContainer.nativeElement.setAttribute("style", "");
                    this.editorContainer.nativeElement.setAttribute("style", "");
                    this.resizeLayout();
                    break;
                case "fullscreen":
                    this.isFullScreen = !this.isFullScreen;
                    if (this.isFullScreen == true) {
                        this.mainContainer.nativeElement.setAttribute("style", "position: fixed;top: 0px;left: 0;bottom: 0;right: 0;width: 100%;height: 100%;");
                        this.resizeLayout();
                    }
                    else {
                        this.mainContainer.nativeElement.setAttribute("style", "");
                        this.resizeLayout();
                    }
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
        this.baseEditor.setModel(editor.createModel(this.content, "markdown"));
        this.baseEditor.onDidChangeModelContent(e => {
            this.content = this.baseEditor.getValue();
        });
        /** @type {?} */
        var emojilist = [];
        for (var k in emoji.emoji) {
            emojilist.push({
                label: k + " " + emoji.emoji[k],
                kind: languages.CompletionItemKind.Function,
                insertText: k + ":"
            });
        }
        languages.registerCompletionItemProvider("markdown", {
            provideCompletionItems: function (model, position) {
                /** @type {?} */
                var textUntilPosition = model.getValueInRange({
                    startLineNumber: position.lineNumber,
                    startColumn: position.column - 1,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column
                });
                if (textUntilPosition === ":") {
                    return emojilist;
                }
                return [];
            },
            triggerCharacters: [":"]
        });
        languages.setLanguageConfiguration("markdown", {
            onEnterRules: [
                {
                    beforeText: /^[-]\s(.*)/,
                    action: {
                        appendText: "- ",
                        indentAction: languages.IndentAction.None
                    }
                }
            ]
        });
        languages.registerCompletionItemProvider("markdown", {
            provideCompletionItems: () => {
                return [
                    {
                        label: "h1",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "# ${1:text}"
                        }
                    },
                    {
                        label: "h2",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "## ${1:text}"
                        }
                    },
                    {
                        label: "h3",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "### ${1:text}"
                        }
                    },
                    {
                        label: "h4",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "#### ${1:text}"
                        }
                    },
                    {
                        label: "h5",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "##### ${1:text}"
                        }
                    },
                    {
                        label: "h6",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "###### ${1:text}"
                        }
                    },
                    {
                        label: "code",
                        kind: languages.CompletionItemKind.Snippet,
                        insertText: {
                            value: ["```", "${1:code}", "```"].join("\n")
                        },
                        documentation: "If-Else Statement"
                    },
                    {
                        label: "link",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "[${1:linkText}](${2:url})"
                        }
                    },
                    {
                        label: "image",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "![${1:altText}](${2:url})"
                        }
                    },
                    {
                        label: "linkreferance",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "[${1:name}]: ${2:link}"
                        }
                    },
                    {
                        label: "list",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "\n - ${1:text}"
                        }
                    },
                    {
                        label: "todo un check",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "\n - [ ] ${2:text}"
                        }
                    },
                    {
                        label: "todo check",
                        kind: languages.CompletionItemKind.Keyword,
                        insertText: {
                            value: "\n - [x] ${2:text}"
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
            this.baseEditor.executeEdits("", [{ range: afterselection, text: "" }]);
            this.baseEditor.executeEdits("", [{ range: beforeselection, text: "" }]);
        }
        else {
            text = `${aftercharnewLine == true ? "\n" : ""}${char}${aftercharnewLine == true ? "\n" : ""}${text}${aftercharnewLine == true ? "\n" : ""}${char}`;
            this.baseEditor.executeEdits("", [{ range: selection, text: text }]);
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
        this.baseEditor.executeEdits("", [{ range: selection, text: newText }]);
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
        var extra = type == "todo" ? (fill == true ? "[x]" : "[ ]") : "";
        /** @type {?} */
        const selection = this.baseEditor.getSelection();
        /** @type {?} */
        var text = this.baseEditor.getModel().getValueInRange(selection);
        /** @type {?} */
        var newText = `\n - ${extra} ${text} `;
        this.baseEditor.executeEdits("", [{ range: selection, text: newText }]);
        this.baseEditor.setPosition({
            lineNumber: selection.endLineNumber + 1,
            column: type == "todo" ? 8 : 4
        });
        this.baseEditor.focus();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    insertContent(type) {
        switch (type) {
            case "bold":
                this.charRepeatBasedInsertText("**");
                break;
            case "italic":
                this.charRepeatBasedInsertText("*");
                break;
            case "strikethrough":
                this.charRepeatBasedInsertText("~~");
                break;
            case "link":
                this.linkBasedInsertText("link");
                break;
            case "image":
                this.linkBasedInsertText("image");
                break;
            case "code":
                this.charRepeatBasedInsertText("```", true, +1);
                break;
            case "inline-code":
                this.charRepeatBasedInsertText("`");
                break;
            case "undo":
                this.baseEditor.trigger("", "undo", "");
                break;
            case "redo":
                this.baseEditor.trigger("", "redo", "");
                break;
            case "list":
                this.listBasedInsertText("link");
                break;
            case "todo-x":
                this.listBasedInsertText("todo", true);
                break;
            case "todo-o":
                this.listBasedInsertText("todo", false);
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResized(event) {
        this.baseEditor.layout();
        this.resizeLayout();
    }
    /**
     * @return {?}
     */
    resizeLayout() {
        /** @type {?} */
        var witdh = this.resizeContainer.nativeElement.offsetWidth;
        this.editorContainer.nativeElement.style.width = witdh / 2 + "px";
        this.previewContainer.nativeElement.style.width = witdh / 2 + "px";
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.resizeLayout();
    }
}
YKEditorComponent.decorators = [
    { type: Component, args: [{
                selector: "yk-editor",
                template: "<div (resized)=\"onResized($event)\" class=\"main-container\" #mainContainer>\n  <div class=\"toolbar\">\n    <div>\n      <button (click)=\"insertContent('undo')\">\n        <i class=\"yi undo\"></i>\n      </button>\n      <button (click)=\"insertContent('redo')\">\n        <i class=\"yi repeat\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('bold')\">\n        <i class=\"yi bold\"></i>\n      </button>\n      <button (click)=\"insertContent('italic')\">\n        <i class=\"yi italic\"></i>\n      </button>\n\n      <button (click)=\"insertContent('strikethrough')\">\n        <i class=\"yi strikethrough\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('link')\">\n        <i class=\"yi link\"></i>\n      </button>\n      <button (click)=\"insertContent('image')\">\n        <i class=\"yi picture-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('code')\">\n        <i class=\"yi code\"></i>\n      </button>\n      <button (click)=\"insertContent('inline-code')\">\n        <i class=\"yi terminal\"></i>\n      </button>\n      <button (click)=\"insertContent('list')\">\n        <i class=\"yi list-ul\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-x')\">\n        <i class=\"yi check-square-o\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-o')\">\n        <i class=\"yi square-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"changeTheme()\">\n        <i class=\"yi\" [ngClass]=\"{'moon-o': theme, 'sun-o': !theme}\"></i>\n      </button>\n      <button (click)=\"changeLayout('fullscreen')\">\n        <i class=\"yi arrows-alt\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button (click)=\"changeLayout('edit')\" [ngClass]=\"{'active': displayMode == 'edit'}\">\n        <i class=\"yi pencil-square-o\"></i>\n      </button>\n      <button (click)=\"changeLayout('split')\" [ngClass]=\" {'active': displayMode=='split' }\">\n        <i class=\"yi columns\"></i>\n      </button>\n      <button (click)=\"changeLayout('preview')\" [ngClass]=\"{'active': displayMode == 'preview'}\">\n        <i class=\"yi eye\"></i>\n      </button>\n    </div>\n\n  </div>\n  <div (resized)=\"onResized($event)\" #resizeContainer class=\"editor-container\">\n    <div (resized)=\"onResized($event)\" class=\"editor\" #editorContainer>\n      <div class=\"monaco-editor\" #editorhost></div>\n    </div>\n    <div (resized)=\"onResized($event)\" class=\"preview\" #previewContainer [ngClass]=\"{'light': theme, 'dark':!theme}\">\n      <div markdown [markdowntext]=\"content\" class=\"rendered-markdown\"></div>\n    </div>\n  </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
YKEditorComponent.ctorParameters = () => [
    { type: ElementRef }
];
YKEditorComponent.propDecorators = {
    content: [{ type: Input }],
    contentChange: [{ type: Output }],
    host: [{ type: ViewChild, args: ["editorhost",] }],
    editorContainer: [{ type: ViewChild, args: ["editorContainer",] }],
    previewContainer: [{ type: ViewChild, args: ["previewContainer",] }],
    mainContainer: [{ type: ViewChild, args: ["mainContainer",] }],
    resizeContainer: [{ type: ViewChild, args: ["resizeContainer",] }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWstZWRpdG9yLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly95ay1lZGl0b3IvbGliL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudC50cyIsIm5nOi8veWstZWRpdG9yL2xpYi9tYXJrZG93bi5kaXJlY3RpdmUudHMiLCJuZzovL3lrLWVkaXRvci9saWIveWstZWRpdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBlZGl0b3IsIFNlbGVjdGlvbiwgbGFuZ3VhZ2VzfSBmcm9tICdtb25hY28tZWRpdG9yJztcclxuaW1wb3J0IGVtb2ppIGZyb20gJ25vZGUtZW1vamknXHJcbmltcG9ydCB7IFJlc2l6ZWRFdmVudCB9IGZyb20gJ2FuZ3VsYXItcmVzaXplLWV2ZW50L3Jlc2l6ZWQtZXZlbnQnO1xyXG5pbXBvcnQgeyBSZXNpemVkRGlyZWN0aXZlIH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQvcmVzaXplZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBBbmd1bGFyUmVzaXplZEV2ZW50TW9kdWxlIH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwieWstZWRpdG9yXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi95a2VkaXRvci5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi95a2VkaXRvci5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBZS0VkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodikge1xyXG4gICAgdGhpcy5fY29udGVudCA9IHY7XHJcbiAgICB0aGlzLmNvbnRlbnRDaGFuZ2UuZW1pdCh2KTtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBjb250ZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBfY29udGVudCA9IFwiXCI7XHJcbiAgQFZpZXdDaGlsZChcImVkaXRvcmhvc3RcIikgaG9zdDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZWRpdG9yQ29udGFpbmVyXCIpIGVkaXRvckNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicHJldmlld0NvbnRhaW5lclwiKSBwcmV2aWV3Q29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJtYWluQ29udGFpbmVyXCIpIG1haW5Db250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInJlc2l6ZUNvbnRhaW5lclwiKSByZXNpemVDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgXHJcbiAgYmFzZUVkaXRvcjogYW55O1xyXG5cclxuICBkaXNwbGF5TW9kZTogc3RyaW5nID0gXCJzcGxpdFwiO1xyXG5cclxuICBpc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgdGhlbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjaGFuZ2VUaGVtZSgpIHtcclxuICAgIHRoaXMudGhlbWUgPSAhdGhpcy50aGVtZTtcclxuICAgIHRoaXMudGhlbWUgPT0gdHJ1ZSA/IGVkaXRvci5zZXRUaGVtZShcInZzXCIpIDogZWRpdG9yLnNldFRoZW1lKFwidnMtZGFya1wiKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUxheW91dCh0eXBlKSB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5TW9kZSAhPSB0eXBlIHx8IHR5cGUgPT0gXCJmdWxsc2NyZWVuXCIpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5TW9kZSA9IHR5cGU7XHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJlZGl0XCI6XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgXCJkaXNwbGF5IDogbm9uZVwiXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgXCJtaW4td2lkdGggOiAxMDAlO21heC13aWR0aCA6IDEwMCVcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJwcmV2aWV3XCI6XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcclxuICAgICAgICAgICAgXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBcImRpc3BsYXkgOiBub25lXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgXCJtaW4td2lkdGggOiAxMDAlO21heC13aWR0aCA6IDEwMCVcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJzcGxpdFwiOlxyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsc2NyZWVuXCI6XHJcbiAgICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbiA9ICF0aGlzLmlzRnVsbFNjcmVlbjtcclxuICAgICAgICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbiA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgICBcInBvc2l0aW9uOiBmaXhlZDt0b3A6IDBweDtsZWZ0OiAwO2JvdHRvbTogMDtyaWdodDogMDt3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxheW91dCgpO1xyXG4gICAgICAgIH1icmVhaztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IubGF5b3V0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBlbCA6IEVsZW1lbnRSZWYpIHt9XHJcbiAgXHJcblxyXG4gIGNvbmZpZzogYW55ID0ge1xyXG4gICAgbGFuZ3VhZ2U6IFwibWFya2Rvd25cIixcclxuICAgIG1pbmltYXA6IHsgZW5hYmxlZDogZmFsc2UgfSxcclxuICAgIGxpbmVOdW1iZXJzOiBcIm9mZlwiLFxyXG4gICAgdGhlbWU6IHRoaXMudGhlbWUgPyBcInZzXCIgOiBcInZzLWRhcmtcIixcclxuICAgIHNjcm9sbEJleW9uZExhc3RMaW5lOiBmYWxzZSxcclxuICAgIHdvcmRXcmFwOiBcIm9uXCIsXHJcbiAgICBnbHlwaE1hcmdpbjogZmFsc2VcclxuICB9O1xyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYmFzZUVkaXRvciA9IGVkaXRvci5jcmVhdGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuY29uZmlnKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRNb2RlbChlZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5jb250ZW50LCBcIm1hcmtkb3duXCIpKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5vbkRpZENoYW5nZU1vZGVsQ29udGVudChlID0+IHtcclxuICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5iYXNlRWRpdG9yLmdldFZhbHVlKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBlbW9qaWxpc3QgPSBbXTtcclxuICAgIGZvciAodmFyIGsgaW4gZW1vamkuZW1vamkpIHtcclxuICAgICAgZW1vamlsaXN0LnB1c2goe1xyXG4gICAgICAgIGxhYmVsOiBrICsgXCIgXCIgKyBlbW9qaS5lbW9qaVtrXSxcclxuICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uLFxyXG4gICAgICAgIGluc2VydFRleHQ6IGsgKyBcIjpcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKFwibWFya2Rvd25cIiwge1xyXG4gICAgICBwcm92aWRlQ29tcGxldGlvbkl0ZW1zOiBmdW5jdGlvbihtb2RlbCwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdGV4dFVudGlsUG9zaXRpb24gPSBtb2RlbC5nZXRWYWx1ZUluUmFuZ2Uoe1xyXG4gICAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLFxyXG4gICAgICAgICAgc3RhcnRDb2x1bW46IHBvc2l0aW9uLmNvbHVtbiAtIDEsXHJcbiAgICAgICAgICBlbmRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLFxyXG4gICAgICAgICAgZW5kQ29sdW1uOiBwb3NpdGlvbi5jb2x1bW5cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGV4dFVudGlsUG9zaXRpb24gPT09IFwiOlwiKSB7XHJcbiAgICAgICAgICByZXR1cm4gZW1vamlsaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIH0sXHJcbiAgICAgIHRyaWdnZXJDaGFyYWN0ZXJzOiBbXCI6XCJdXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW5ndWFnZXMuc2V0TGFuZ3VhZ2VDb25maWd1cmF0aW9uKFwibWFya2Rvd25cIiwge1xyXG4gICAgICBvbkVudGVyUnVsZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBiZWZvcmVUZXh0OiAvXlstXVxccyguKikvLFxyXG4gICAgICAgICAgYWN0aW9uOiB7XHJcbiAgICAgICAgICAgIGFwcGVuZFRleHQ6IFwiLSBcIixcclxuICAgICAgICAgICAgaW5kZW50QWN0aW9uOiBsYW5ndWFnZXMuSW5kZW50QWN0aW9uLk5vbmVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgbGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcihcIm1hcmtkb3duXCIsIHtcclxuICAgICAgcHJvdmlkZUNvbXBsZXRpb25JdGVtczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImgxXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDJcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDNcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMjICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImg0XCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiMjIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDVcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMjIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDZcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMjIyMjICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImNvZGVcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5TbmlwcGV0LFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFtcImBgYFwiLCBcIiR7MTpjb2RlfVwiLCBcImBgYFwiXS5qb2luKFwiXFxuXCIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRvY3VtZW50YXRpb246IFwiSWYtRWxzZSBTdGF0ZW1lbnRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwibGlua1wiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJbJHsxOmxpbmtUZXh0fV0oJHsyOnVybH0pXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaW1hZ2VcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIVskezE6YWx0VGV4dH1dKCR7Mjp1cmx9KVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImxpbmtyZWZlcmFuY2VcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiWyR7MTpuYW1lfV06ICR7MjpsaW5rfVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImxpc3RcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiXFxuIC0gJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwidG9kbyB1biBjaGVja1wiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJcXG4gLSBbIF0gJHsyOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcInRvZG8gY2hlY2tcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiXFxuIC0gW3hdICR7Mjp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmJhc2VFZGl0b3IudXBkYXRlT3B0aW9ucyh7XHJcbiAgICAgIGdseXBoTWFyZ2luOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KGNoYXIsIGFmdGVyY2hhcm5ld0xpbmUgPSBmYWxzZSwgbGluZSA9IDApIHtcclxuICAgIHZhciBjb3VudCA9IGNoYXIudHJpbSgpLmxlbmd0aDtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB0ZXh0LnRyaW0oKTtcclxuICAgIHZhciBiZWZvcmVzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKFxyXG4gICAgICBzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRDb2x1bW4gLSBjb3VudCxcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uTGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uIC0gdGV4dC5sZW5ndGhcclxuICAgICk7XHJcblxyXG4gICAgdmFyIGFmdGVyc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihcclxuICAgICAgc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25MaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25Db2x1bW4gKyBjb3VudFxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgc3RhcnRjaGFyID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKGJlZm9yZXNlbGVjdGlvbik7XHJcbiAgICB2YXIgZW5kY2hhciA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShhZnRlcnNlbGVjdGlvbik7XHJcblxyXG4gICAgaWYgKHN0YXJ0Y2hhciA9PSBjaGFyICYmIGVuZGNoYXIgPT0gY2hhcikge1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBhZnRlcnNlbGVjdGlvbiwgdGV4dDogXCJcIiB9XSk7XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoXCJcIiwgW3sgcmFuZ2U6IGJlZm9yZXNlbGVjdGlvbiwgdGV4dDogXCJcIiB9XSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZXh0ID0gYCR7YWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gXCJcXG5cIiA6IFwiXCJ9JHtjaGFyfSR7XHJcbiAgICAgICAgYWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gXCJcXG5cIiA6IFwiXCJcclxuICAgICAgfSR7dGV4dH0ke2FmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/IFwiXFxuXCIgOiBcIlwifSR7Y2hhcn1gO1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IHRleHQgfV0pO1xyXG5cclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLnNldFNlbGVjdGlvbih7XHJcbiAgICAgICAgc3RhcnRDb2x1bW46IHNlbGVjdGlvbi5zdGFydENvbHVtbiArIChsaW5lID09IDAgPyBjb3VudCA6IDApLFxyXG4gICAgICAgIGVuZENvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIChsaW5lID09IDAgPyBjb3VudCA6IDApLFxyXG4gICAgICAgIHN0YXJ0TGluZU51bWJlcjogc2VsZWN0aW9uLnN0YXJ0TGluZU51bWJlciArIGxpbmUsXHJcbiAgICAgICAgZW5kTGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIgKyBsaW5lXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmZvY3VzKCk7XHJcbiAgfVxyXG4gIGxpbmtCYXNlZEluc2VydFRleHQodHlwZSkge1xyXG4gICAgdmFyIGNvdW50ID0gdHlwZSA9PSBcImltYWdlXCIgPyA0IDogMztcclxuICAgIHZhciBleHRyYWNoYXIgPSB0eXBlID09IFwiaW1hZ2VcIiA/IFwiIVwiIDogXCJcIjtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB2YXIgbmV3VGV4dCA9IGAke2V4dHJhY2hhcn1bJHt0ZXh0fV0oKWA7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IG5ld1RleHQgfV0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldFBvc2l0aW9uKHtcclxuICAgICAgbGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIsXHJcbiAgICAgIGNvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIGNvdW50XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuICBsaXN0QmFzZWRJbnNlcnRUZXh0KHR5cGUsIGZpbGwgPSBmYWxzZSkge1xyXG4gICAgdmFyIGV4dHJhID0gdHlwZSA9PSBcInRvZG9cIiA/IChmaWxsID09IHRydWUgPyBcIlt4XVwiIDogXCJbIF1cIikgOiBcIlwiO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHZhciBuZXdUZXh0ID0gYFxcbiAtICR7ZXh0cmF9ICR7dGV4dH0gYDtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoXCJcIiwgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogbmV3VGV4dCB9XSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0UG9zaXRpb24oe1xyXG4gICAgICBsaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlciArIDEsXHJcbiAgICAgIGNvbHVtbjogdHlwZSA9PSBcInRvZG9cIiA/IDggOiA0XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgaW5zZXJ0Q29udGVudCh0eXBlKSB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSBcImJvbGRcIjpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoXCIqKlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIml0YWxpY1wiOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIipcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzdHJpa2V0aHJvdWdoXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwifn5cIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJsaW5rXCI6XHJcbiAgICAgICAgdGhpcy5saW5rQmFzZWRJbnNlcnRUZXh0KFwibGlua1wiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImltYWdlXCI6XHJcbiAgICAgICAgdGhpcy5saW5rQmFzZWRJbnNlcnRUZXh0KFwiaW1hZ2VcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjb2RlXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiYGBgXCIsIHRydWUsICsxKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImlubGluZS1jb2RlXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiYFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInVuZG9cIjpcclxuICAgICAgICB0aGlzLmJhc2VFZGl0b3IudHJpZ2dlcihcIlwiLCBcInVuZG9cIiwgXCJcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJyZWRvXCI6XHJcbiAgICAgICAgdGhpcy5iYXNlRWRpdG9yLnRyaWdnZXIoXCJcIiwgXCJyZWRvXCIsIFwiXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibGlzdFwiOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dChcImxpbmtcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJ0b2RvLXhcIjpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoXCJ0b2RvXCIsIHRydWUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwidG9kby1vXCI6XHJcbiAgICAgICAgdGhpcy5saXN0QmFzZWRJbnNlcnRUZXh0KFwidG9kb1wiLCBmYWxzZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJlc2l6ZWQoZXZlbnQ6IFJlc2l6ZWRFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmxheW91dCgpO1xyXG4gICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICB9XHJcbiAgcmVzaXplTGF5b3V0KCkge1xyXG4gICAgdmFyIHdpdGRoID0gdGhpcy5yZXNpemVDb250YWluZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aXRkaCAvIDIgKyBcInB4XCI7XHJcbiAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpdGRoIC8gMiArIFwicHhcIjtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIE91dHB1dCwgUmVuZGVyZXIyLCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBtYXJrZWQgZnJvbSAnbWFya2VkJztcbmltcG9ydCBobGpzIGZyb20gXCJoaWdobGlnaHQuanNcIjtcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IGVtb2ppIGZyb20gJ25vZGUtZW1vamknXG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hcmtkb3duXSdcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25EaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHNldCBtYXJrZG93bnRleHQodikge1xuICAgIGlmICh2ICE9IG51bGwgJiYgdiAhPSB0aGlzLl9jb250ZW50KSB7XG4gICAgICB0aGlzLl9jb250ZW50ID0gdjtcbiAgICAgIHRoaXMucmVuZGVyTWFya2Rvd24odGhpcy5fY29udGVudCk7XG4gICAgfVxuICB9XG4gIEBPdXRwdXQoKSBnZXQgaHRtbCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZWRDb250ZW50O1xuICB9XG4gIF9jb250ZW50O1xuICBtYXJrZWRDb250ZW50OiBzdHJpbmc7XG4gIHJlbmRlcmVyID0gbmV3IG1hcmtlZC5SZW5kZXJlcigpO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBzYW5pdGl6ZTogRG9tU2FuaXRpemVyLCBwcml2YXRlIHJlbmRlcjI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMubWFya2VkUmVuZGVyZXIoKTtcbiAgICB0aGlzLnJlbmRlck1hcmtkb3duKFwiXCIpO1xuICB9XG5cblxuICByZW5kZXJNYXJrZG93bih0ZXh0KSB7XG4gICAgY29uc3QgcmVwbGFjZXIgPSAobWF0Y2gpID0+IGVtb2ppLmVtb2ppZnkobWF0Y2gpO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyg6Lio6KS9nLCByZXBsYWNlcik7XG5cbiAgICB0aGlzLm1hcmtlZENvbnRlbnQgPSBtYXJrZWQodGV4dCk7XG5cbiAgICB0aGlzLm1hcmtlZENvbnRlbnQgPSB0aGlzLnNhbml0aXplLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHRoaXMubWFya2VkQ29udGVudCkgYXMgc3RyaW5nXG5cbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5zYW5pdGl6ZS5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgdGhpcy5tYXJrZWRDb250ZW50KTtcblxuICB9XG5cbiAgbWFya2VkUmVuZGVyZXIoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0aXRlbSA9ICh0ZXh0OiBhbnkpID0+IHtcbiAgICAgIGlmICgvXlxccypcXFtbeCBdXFxdXFxzKi8udGVzdCh0ZXh0KSkge1xuICAgICAgICB0ZXh0ID0gdGV4dFxuICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKlxcWyBcXF1cXHMqLywgJzxpIGNsYXNzPVwiZmEgZmEtc3F1YXJlLW9cIiBzdHlsZT1cIm1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtO1wiPjwvaT4gJylcbiAgICAgICAgICAucmVwbGFjZSgvXlxccypcXFt4XFxdXFxzKi8sICc8aSBjbGFzcz1cImZhIGZhLWNoZWNrLXNxdWFyZVwiIHN0eWxlPVwibWFyZ2luOiAwIDAuMmVtIDAuMjVlbSAtMS42ZW07XCI+PC9pPiAnKTtcbiAgICAgICAgcmV0dXJuIGA8bGkgc3R5bGU9XCJsaXN0LXN0eWxlOiBub25lO1wiPiR7dGV4dH08L2xpPmA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYDxsaT4ke3RleHR9PC9saT5gO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5yZW5kZXJlci50YWJsZSA9IChoZWFkZXI6IHN0cmluZywgYm9keTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkXCI+XFxuPHRoZWFkPlxcbiR7aGVhZGVyfTwvdGhlYWQ+XFxuPHRib2R5PlxcbiR7Ym9keX08L3Rib2R5PlxcbjwvdGFibGU+XFxuYDtcbiAgICB9O1xuXG4gICAgbWFya2VkLnNldE9wdGlvbnMoe1xuICAgICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICByZXR1cm4gaGxqcy5oaWdobGlnaHRBdXRvKGNvZGUpLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHJlbmRlcmVyOiB0aGlzLnJlbmRlcmVyLFxuICAgICAgdGFibGVzOiB0cnVlLFxuICAgICAgc2FuaXRpemU6IGZhbHNlLFxuICAgICAgc21hcnRMaXN0czogdHJ1ZSxcblxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWUtFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZG93bkRpcmVjdGl2ZSB9IGZyb20gJy4vbWFya2Rvd24uZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEFuZ3VsYXJSZXNpemVkRXZlbnRNb2R1bGUgfSBmcm9tICdhbmd1bGFyLXJlc2l6ZS1ldmVudCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEFuZ3VsYXJSZXNpemVkRXZlbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFlLRWRpdG9yQ29tcG9uZW50LCBNYXJrZG93bkRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtZS0VkaXRvckNvbXBvbmVudCxNYXJrZG93bkRpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgWWtFZGl0b3JNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBNkZFLFlBQXFCLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhOzZCQXRFVixJQUFJLFlBQVksRUFBRTt3QkFFakMsRUFBRTsyQkFTUyxPQUFPOzRCQUVkLEtBQUs7cUJBRUgsSUFBSTtzQkEwRFA7WUFDWixRQUFRLEVBQUUsVUFBVTtZQUNwQixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQzNCLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTO1lBQ3BDLG9CQUFvQixFQUFFLEtBQUs7WUFDM0IsUUFBUSxFQUFFLElBQUk7WUFDZCxXQUFXLEVBQUUsS0FBSztTQUNuQjtLQVh1Qzs7OztJQWhGeEMsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7OztJQUVELElBQUksT0FBTyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1Qjs7OztJQW1CRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJ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