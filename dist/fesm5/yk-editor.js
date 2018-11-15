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
var YKEditorComponent = /** @class */ (function () {
    function YKEditorComponent(el) {
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
    Object.defineProperty(YKEditorComponent.prototype, "content", {
        get: /**
         * @return {?}
         */
        function () {
            return this._content;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._content = v;
            this.contentChange.emit(v);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    YKEditorComponent.prototype.changeTheme = /**
     * @return {?}
     */
    function () {
        this.theme = !this.theme;
        this.theme == true ? editor.setTheme("vs") : editor.setTheme("vs-dark");
    };
    /**
     * @param {?} type
     * @return {?}
     */
    YKEditorComponent.prototype.changeLayout = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
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
    };
    /**
     * @return {?}
     */
    YKEditorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.baseEditor = editor.create(this.host.nativeElement, this.config);
        this.baseEditor.setModel(editor.createModel(this.content, "markdown"));
        this.baseEditor.onDidChangeModelContent(function (e) {
            _this.content = _this.baseEditor.getValue();
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
            provideCompletionItems: function () {
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
    };
    /**
     * @param {?} char
     * @param {?=} aftercharnewLine
     * @param {?=} line
     * @return {?}
     */
    YKEditorComponent.prototype.charRepeatBasedInsertText = /**
     * @param {?} char
     * @param {?=} aftercharnewLine
     * @param {?=} line
     * @return {?}
     */
    function (char, aftercharnewLine, line) {
        if (aftercharnewLine === void 0) { aftercharnewLine = false; }
        if (line === void 0) { line = 0; }
        /** @type {?} */
        var count = char.trim().length;
        /** @type {?} */
        var selection = this.baseEditor.getSelection();
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
            text = "" + (aftercharnewLine == true ? "\n" : "") + char + (aftercharnewLine == true ? "\n" : "") + text + (aftercharnewLine == true ? "\n" : "") + char;
            this.baseEditor.executeEdits("", [{ range: selection, text: text }]);
            this.baseEditor.setSelection({
                startColumn: selection.startColumn + (line == 0 ? count : 0),
                endColumn: selection.endColumn + (line == 0 ? count : 0),
                startLineNumber: selection.startLineNumber + line,
                endLineNumber: selection.endLineNumber + line
            });
        }
        this.baseEditor.focus();
    };
    /**
     * @param {?} type
     * @return {?}
     */
    YKEditorComponent.prototype.linkBasedInsertText = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var count = type == "image" ? 4 : 3;
        /** @type {?} */
        var extrachar = type == "image" ? "!" : "";
        /** @type {?} */
        var selection = this.baseEditor.getSelection();
        /** @type {?} */
        var text = this.baseEditor.getModel().getValueInRange(selection);
        /** @type {?} */
        var newText = extrachar + "[" + text + "]()";
        this.baseEditor.executeEdits("", [{ range: selection, text: newText }]);
        this.baseEditor.setPosition({
            lineNumber: selection.endLineNumber,
            column: selection.endColumn + count
        });
        this.baseEditor.focus();
    };
    /**
     * @param {?} type
     * @param {?=} fill
     * @return {?}
     */
    YKEditorComponent.prototype.listBasedInsertText = /**
     * @param {?} type
     * @param {?=} fill
     * @return {?}
     */
    function (type, fill) {
        if (fill === void 0) { fill = false; }
        /** @type {?} */
        var extra = type == "todo" ? (fill == true ? "[x]" : "[ ]") : "";
        /** @type {?} */
        var selection = this.baseEditor.getSelection();
        /** @type {?} */
        var text = this.baseEditor.getModel().getValueInRange(selection);
        /** @type {?} */
        var newText = "\n - " + extra + " " + text + " ";
        this.baseEditor.executeEdits("", [{ range: selection, text: newText }]);
        this.baseEditor.setPosition({
            lineNumber: selection.endLineNumber + 1,
            column: type == "todo" ? 8 : 4
        });
        this.baseEditor.focus();
    };
    /**
     * @param {?} type
     * @return {?}
     */
    YKEditorComponent.prototype.insertContent = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    YKEditorComponent.prototype.onResized = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.baseEditor.layout();
        this.resizeLayout();
    };
    /**
     * @return {?}
     */
    YKEditorComponent.prototype.resizeLayout = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var witdh = this.resizeContainer.nativeElement.offsetWidth;
        this.editorContainer.nativeElement.style.width = witdh / 2 + "px";
        this.previewContainer.nativeElement.style.width = witdh / 2 + "px";
    };
    /**
     * @return {?}
     */
    YKEditorComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.resizeLayout();
    };
    YKEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: "yk-editor",
                    template: "<div (resized)=\"onResized($event)\" class=\"main-container\" #mainContainer>\n  <div class=\"toolbar\">\n    <div>\n      <button (click)=\"insertContent('undo')\">\n        <i class=\"yi undo\"></i>\n      </button>\n      <button (click)=\"insertContent('redo')\">\n        <i class=\"yi repeat\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('bold')\">\n        <i class=\"yi bold\"></i>\n      </button>\n      <button (click)=\"insertContent('italic')\">\n        <i class=\"yi italic\"></i>\n      </button>\n\n      <button (click)=\"insertContent('strikethrough')\">\n        <i class=\"yi strikethrough\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('link')\">\n        <i class=\"yi link\"></i>\n      </button>\n      <button (click)=\"insertContent('image')\">\n        <i class=\"yi picture-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('code')\">\n        <i class=\"yi code\"></i>\n      </button>\n      <button (click)=\"insertContent('inline-code')\">\n        <i class=\"yi terminal\"></i>\n      </button>\n      <button (click)=\"insertContent('list')\">\n        <i class=\"yi list-ul\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-x')\">\n        <i class=\"yi check-square-o\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-o')\">\n        <i class=\"yi square-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"changeTheme()\">\n        <i class=\"yi\" [ngClass]=\"{'moon-o': theme, 'sun-o': !theme}\"></i>\n      </button>\n      <button (click)=\"changeLayout('fullscreen')\">\n        <i class=\"yi arrows-alt\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button (click)=\"changeLayout('edit')\" [ngClass]=\"{'active': displayMode == 'edit'}\">\n        <i class=\"yi pencil-square-o\"></i>\n      </button>\n      <button (click)=\"changeLayout('split')\" [ngClass]=\" {'active': displayMode=='split' }\">\n        <i class=\"yi columns\"></i>\n      </button>\n      <button (click)=\"changeLayout('preview')\" [ngClass]=\"{'active': displayMode == 'preview'}\">\n        <i class=\"yi eye\"></i>\n      </button>\n    </div>\n\n  </div>\n  <div (resized)=\"onResized($event)\" #resizeContainer class=\"editor-container\">\n    <div (resized)=\"onResized($event)\" class=\"editor\" #editorContainer>\n      <div class=\"monaco-editor\" #editorhost></div>\n    </div>\n    <div (resized)=\"onResized($event)\" class=\"preview\" #previewContainer [ngClass]=\"{'light': theme, 'dark':!theme}\">\n      <div markdown [markdowntext]=\"content\" class=\"rendered-markdown\"></div>\n    </div>\n  </div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    YKEditorComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    YKEditorComponent.propDecorators = {
        content: [{ type: Input }],
        contentChange: [{ type: Output }],
        host: [{ type: ViewChild, args: ["editorhost",] }],
        editorContainer: [{ type: ViewChild, args: ["editorContainer",] }],
        previewContainer: [{ type: ViewChild, args: ["previewContainer",] }],
        mainContainer: [{ type: ViewChild, args: ["mainContainer",] }],
        resizeContainer: [{ type: ViewChild, args: ["resizeContainer",] }]
    };
    return YKEditorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MarkdownDirective = /** @class */ (function () {
    function MarkdownDirective(el, sanitize, render2) {
        this.el = el;
        this.sanitize = sanitize;
        this.render2 = render2;
        this.renderer = new marked.Renderer();
        this.markedRenderer();
        this.renderMarkdown("");
    }
    Object.defineProperty(MarkdownDirective.prototype, "markdowntext", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v != null && v != this._content) {
                this._content = v;
                this.renderMarkdown(this._content);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownDirective.prototype, "html", {
        get: /**
         * @return {?}
         */
        function () {
            return this.markedContent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} text
     * @return {?}
     */
    MarkdownDirective.prototype.renderMarkdown = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        /** @type {?} */
        var replacer = function (match) { return emoji.emojify(match); };
        text = text.replace(/(:.*:)/g, replacer);
        this.markedContent = marked(text);
        this.markedContent = /** @type {?} */ (this.sanitize.bypassSecurityTrustHtml(this.markedContent));
        this.el.nativeElement.innerHTML = this.sanitize.sanitize(SecurityContext.HTML, this.markedContent);
    };
    /**
     * @return {?}
     */
    MarkdownDirective.prototype.markedRenderer = /**
     * @return {?}
     */
    function () {
        this.renderer.listitem = function (text) {
            if (/^\s*\[[x ]\]\s*/.test(text)) {
                text = text
                    .replace(/^\s*\[ \]\s*/, '<i class="fa fa-square-o" style="margin: 0 0.2em 0.25em -1.6em;"></i> ')
                    .replace(/^\s*\[x\]\s*/, '<i class="fa fa-check-square" style="margin: 0 0.2em 0.25em -1.6em;"></i> ');
                return "<li style=\"list-style: none;\">" + text + "</li>";
            }
            else {
                return "<li>" + text + "</li>";
            }
        };
        this.renderer.table = function (header, body) {
            return "<table class=\"table table-bordered\">\n<thead>\n" + header + "</thead>\n<tbody>\n" + body + "</tbody>\n</table>\n";
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
    };
    MarkdownDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[markdown]'
                },] }
    ];
    /** @nocollapse */
    MarkdownDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DomSanitizer },
        { type: Renderer2 }
    ]; };
    MarkdownDirective.propDecorators = {
        markdowntext: [{ type: Input }],
        html: [{ type: Output }]
    };
    return MarkdownDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var YkEditorModule = /** @class */ (function () {
    function YkEditorModule() {
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
    return YkEditorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { YkEditorModule, YKEditorComponent, MarkdownDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWstZWRpdG9yLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly95ay1lZGl0b3IvbGliL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudC50cyIsIm5nOi8veWstZWRpdG9yL2xpYi9tYXJrZG93bi5kaXJlY3RpdmUudHMiLCJuZzovL3lrLWVkaXRvci9saWIveWstZWRpdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBlZGl0b3IsIFNlbGVjdGlvbiwgbGFuZ3VhZ2VzfSBmcm9tICdtb25hY28tZWRpdG9yJztcclxuaW1wb3J0IGVtb2ppIGZyb20gJ25vZGUtZW1vamknXHJcbmltcG9ydCB7IFJlc2l6ZWRFdmVudCB9IGZyb20gJ2FuZ3VsYXItcmVzaXplLWV2ZW50L3Jlc2l6ZWQtZXZlbnQnO1xyXG5pbXBvcnQgeyBSZXNpemVkRGlyZWN0aXZlIH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQvcmVzaXplZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBBbmd1bGFyUmVzaXplZEV2ZW50TW9kdWxlIH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwieWstZWRpdG9yXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi95a2VkaXRvci5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi95a2VkaXRvci5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBZS0VkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodikge1xyXG4gICAgdGhpcy5fY29udGVudCA9IHY7XHJcbiAgICB0aGlzLmNvbnRlbnRDaGFuZ2UuZW1pdCh2KTtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBjb250ZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBfY29udGVudCA9IFwiXCI7XHJcbiAgQFZpZXdDaGlsZChcImVkaXRvcmhvc3RcIikgaG9zdDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZWRpdG9yQ29udGFpbmVyXCIpIGVkaXRvckNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicHJldmlld0NvbnRhaW5lclwiKSBwcmV2aWV3Q29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJtYWluQ29udGFpbmVyXCIpIG1haW5Db250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInJlc2l6ZUNvbnRhaW5lclwiKSByZXNpemVDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgXHJcbiAgYmFzZUVkaXRvcjogYW55O1xyXG5cclxuICBkaXNwbGF5TW9kZTogc3RyaW5nID0gXCJzcGxpdFwiO1xyXG5cclxuICBpc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgdGhlbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjaGFuZ2VUaGVtZSgpIHtcclxuICAgIHRoaXMudGhlbWUgPSAhdGhpcy50aGVtZTtcclxuICAgIHRoaXMudGhlbWUgPT0gdHJ1ZSA/IGVkaXRvci5zZXRUaGVtZShcInZzXCIpIDogZWRpdG9yLnNldFRoZW1lKFwidnMtZGFya1wiKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUxheW91dCh0eXBlKSB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5TW9kZSAhPSB0eXBlIHx8IHR5cGUgPT0gXCJmdWxsc2NyZWVuXCIpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5TW9kZSA9IHR5cGU7XHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJlZGl0XCI6XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgXCJkaXNwbGF5IDogbm9uZVwiXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgXCJtaW4td2lkdGggOiAxMDAlO21heC13aWR0aCA6IDEwMCVcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJwcmV2aWV3XCI6XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcclxuICAgICAgICAgICAgXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBcImRpc3BsYXkgOiBub25lXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgXCJtaW4td2lkdGggOiAxMDAlO21heC13aWR0aCA6IDEwMCVcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJzcGxpdFwiOlxyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsc2NyZWVuXCI6XHJcbiAgICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbiA9ICF0aGlzLmlzRnVsbFNjcmVlbjtcclxuICAgICAgICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbiA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgICBcInBvc2l0aW9uOiBmaXhlZDt0b3A6IDBweDtsZWZ0OiAwO2JvdHRvbTogMDtyaWdodDogMDt3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxheW91dCgpO1xyXG4gICAgICAgIH1icmVhaztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IubGF5b3V0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBlbCA6IEVsZW1lbnRSZWYpIHt9XHJcbiAgXHJcblxyXG4gIGNvbmZpZzogYW55ID0ge1xyXG4gICAgbGFuZ3VhZ2U6IFwibWFya2Rvd25cIixcclxuICAgIG1pbmltYXA6IHsgZW5hYmxlZDogZmFsc2UgfSxcclxuICAgIGxpbmVOdW1iZXJzOiBcIm9mZlwiLFxyXG4gICAgdGhlbWU6IHRoaXMudGhlbWUgPyBcInZzXCIgOiBcInZzLWRhcmtcIixcclxuICAgIHNjcm9sbEJleW9uZExhc3RMaW5lOiBmYWxzZSxcclxuICAgIHdvcmRXcmFwOiBcIm9uXCIsXHJcbiAgICBnbHlwaE1hcmdpbjogZmFsc2VcclxuICB9O1xyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYmFzZUVkaXRvciA9IGVkaXRvci5jcmVhdGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuY29uZmlnKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRNb2RlbChlZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5jb250ZW50LCBcIm1hcmtkb3duXCIpKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5vbkRpZENoYW5nZU1vZGVsQ29udGVudChlID0+IHtcclxuICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5iYXNlRWRpdG9yLmdldFZhbHVlKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBlbW9qaWxpc3QgPSBbXTtcclxuICAgIGZvciAodmFyIGsgaW4gZW1vamkuZW1vamkpIHtcclxuICAgICAgZW1vamlsaXN0LnB1c2goe1xyXG4gICAgICAgIGxhYmVsOiBrICsgXCIgXCIgKyBlbW9qaS5lbW9qaVtrXSxcclxuICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uLFxyXG4gICAgICAgIGluc2VydFRleHQ6IGsgKyBcIjpcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKFwibWFya2Rvd25cIiwge1xyXG4gICAgICBwcm92aWRlQ29tcGxldGlvbkl0ZW1zOiBmdW5jdGlvbihtb2RlbCwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdGV4dFVudGlsUG9zaXRpb24gPSBtb2RlbC5nZXRWYWx1ZUluUmFuZ2Uoe1xyXG4gICAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLFxyXG4gICAgICAgICAgc3RhcnRDb2x1bW46IHBvc2l0aW9uLmNvbHVtbiAtIDEsXHJcbiAgICAgICAgICBlbmRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLFxyXG4gICAgICAgICAgZW5kQ29sdW1uOiBwb3NpdGlvbi5jb2x1bW5cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGV4dFVudGlsUG9zaXRpb24gPT09IFwiOlwiKSB7XHJcbiAgICAgICAgICByZXR1cm4gZW1vamlsaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIH0sXHJcbiAgICAgIHRyaWdnZXJDaGFyYWN0ZXJzOiBbXCI6XCJdXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW5ndWFnZXMuc2V0TGFuZ3VhZ2VDb25maWd1cmF0aW9uKFwibWFya2Rvd25cIiwge1xyXG4gICAgICBvbkVudGVyUnVsZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBiZWZvcmVUZXh0OiAvXlstXVxccyguKikvLFxyXG4gICAgICAgICAgYWN0aW9uOiB7XHJcbiAgICAgICAgICAgIGFwcGVuZFRleHQ6IFwiLSBcIixcclxuICAgICAgICAgICAgaW5kZW50QWN0aW9uOiBsYW5ndWFnZXMuSW5kZW50QWN0aW9uLk5vbmVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgbGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcihcIm1hcmtkb3duXCIsIHtcclxuICAgICAgcHJvdmlkZUNvbXBsZXRpb25JdGVtczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImgxXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDJcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDNcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMjICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImg0XCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiMjIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDVcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMjIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDZcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMjIyMjICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImNvZGVcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5TbmlwcGV0LFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFtcImBgYFwiLCBcIiR7MTpjb2RlfVwiLCBcImBgYFwiXS5qb2luKFwiXFxuXCIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRvY3VtZW50YXRpb246IFwiSWYtRWxzZSBTdGF0ZW1lbnRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwibGlua1wiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJbJHsxOmxpbmtUZXh0fV0oJHsyOnVybH0pXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaW1hZ2VcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIVskezE6YWx0VGV4dH1dKCR7Mjp1cmx9KVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImxpbmtyZWZlcmFuY2VcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiWyR7MTpuYW1lfV06ICR7MjpsaW5rfVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImxpc3RcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiXFxuIC0gJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwidG9kbyB1biBjaGVja1wiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJcXG4gLSBbIF0gJHsyOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcInRvZG8gY2hlY2tcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiXFxuIC0gW3hdICR7Mjp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmJhc2VFZGl0b3IudXBkYXRlT3B0aW9ucyh7XHJcbiAgICAgIGdseXBoTWFyZ2luOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KGNoYXIsIGFmdGVyY2hhcm5ld0xpbmUgPSBmYWxzZSwgbGluZSA9IDApIHtcclxuICAgIHZhciBjb3VudCA9IGNoYXIudHJpbSgpLmxlbmd0aDtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB0ZXh0LnRyaW0oKTtcclxuICAgIHZhciBiZWZvcmVzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKFxyXG4gICAgICBzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRDb2x1bW4gLSBjb3VudCxcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uTGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uIC0gdGV4dC5sZW5ndGhcclxuICAgICk7XHJcblxyXG4gICAgdmFyIGFmdGVyc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihcclxuICAgICAgc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25MaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25Db2x1bW4gKyBjb3VudFxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgc3RhcnRjaGFyID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKGJlZm9yZXNlbGVjdGlvbik7XHJcbiAgICB2YXIgZW5kY2hhciA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShhZnRlcnNlbGVjdGlvbik7XHJcblxyXG4gICAgaWYgKHN0YXJ0Y2hhciA9PSBjaGFyICYmIGVuZGNoYXIgPT0gY2hhcikge1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBhZnRlcnNlbGVjdGlvbiwgdGV4dDogXCJcIiB9XSk7XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoXCJcIiwgW3sgcmFuZ2U6IGJlZm9yZXNlbGVjdGlvbiwgdGV4dDogXCJcIiB9XSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZXh0ID0gYCR7YWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gXCJcXG5cIiA6IFwiXCJ9JHtjaGFyfSR7XHJcbiAgICAgICAgYWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gXCJcXG5cIiA6IFwiXCJcclxuICAgICAgfSR7dGV4dH0ke2FmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/IFwiXFxuXCIgOiBcIlwifSR7Y2hhcn1gO1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IHRleHQgfV0pO1xyXG5cclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLnNldFNlbGVjdGlvbih7XHJcbiAgICAgICAgc3RhcnRDb2x1bW46IHNlbGVjdGlvbi5zdGFydENvbHVtbiArIChsaW5lID09IDAgPyBjb3VudCA6IDApLFxyXG4gICAgICAgIGVuZENvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIChsaW5lID09IDAgPyBjb3VudCA6IDApLFxyXG4gICAgICAgIHN0YXJ0TGluZU51bWJlcjogc2VsZWN0aW9uLnN0YXJ0TGluZU51bWJlciArIGxpbmUsXHJcbiAgICAgICAgZW5kTGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIgKyBsaW5lXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmZvY3VzKCk7XHJcbiAgfVxyXG4gIGxpbmtCYXNlZEluc2VydFRleHQodHlwZSkge1xyXG4gICAgdmFyIGNvdW50ID0gdHlwZSA9PSBcImltYWdlXCIgPyA0IDogMztcclxuICAgIHZhciBleHRyYWNoYXIgPSB0eXBlID09IFwiaW1hZ2VcIiA/IFwiIVwiIDogXCJcIjtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB2YXIgbmV3VGV4dCA9IGAke2V4dHJhY2hhcn1bJHt0ZXh0fV0oKWA7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IG5ld1RleHQgfV0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldFBvc2l0aW9uKHtcclxuICAgICAgbGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIsXHJcbiAgICAgIGNvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIGNvdW50XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuICBsaXN0QmFzZWRJbnNlcnRUZXh0KHR5cGUsIGZpbGwgPSBmYWxzZSkge1xyXG4gICAgdmFyIGV4dHJhID0gdHlwZSA9PSBcInRvZG9cIiA/IChmaWxsID09IHRydWUgPyBcIlt4XVwiIDogXCJbIF1cIikgOiBcIlwiO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHZhciBuZXdUZXh0ID0gYFxcbiAtICR7ZXh0cmF9ICR7dGV4dH0gYDtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoXCJcIiwgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogbmV3VGV4dCB9XSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0UG9zaXRpb24oe1xyXG4gICAgICBsaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlciArIDEsXHJcbiAgICAgIGNvbHVtbjogdHlwZSA9PSBcInRvZG9cIiA/IDggOiA0XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgaW5zZXJ0Q29udGVudCh0eXBlKSB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSBcImJvbGRcIjpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoXCIqKlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIml0YWxpY1wiOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIipcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzdHJpa2V0aHJvdWdoXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwifn5cIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJsaW5rXCI6XHJcbiAgICAgICAgdGhpcy5saW5rQmFzZWRJbnNlcnRUZXh0KFwibGlua1wiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImltYWdlXCI6XHJcbiAgICAgICAgdGhpcy5saW5rQmFzZWRJbnNlcnRUZXh0KFwiaW1hZ2VcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjb2RlXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiYGBgXCIsIHRydWUsICsxKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImlubGluZS1jb2RlXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiYFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInVuZG9cIjpcclxuICAgICAgICB0aGlzLmJhc2VFZGl0b3IudHJpZ2dlcihcIlwiLCBcInVuZG9cIiwgXCJcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJyZWRvXCI6XHJcbiAgICAgICAgdGhpcy5iYXNlRWRpdG9yLnRyaWdnZXIoXCJcIiwgXCJyZWRvXCIsIFwiXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibGlzdFwiOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dChcImxpbmtcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJ0b2RvLXhcIjpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoXCJ0b2RvXCIsIHRydWUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwidG9kby1vXCI6XHJcbiAgICAgICAgdGhpcy5saXN0QmFzZWRJbnNlcnRUZXh0KFwidG9kb1wiLCBmYWxzZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJlc2l6ZWQoZXZlbnQ6IFJlc2l6ZWRFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmxheW91dCgpO1xyXG4gICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICB9XHJcbiAgcmVzaXplTGF5b3V0KCkge1xyXG4gICAgdmFyIHdpdGRoID0gdGhpcy5yZXNpemVDb250YWluZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aXRkaCAvIDIgKyBcInB4XCI7XHJcbiAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpdGRoIC8gMiArIFwicHhcIjtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIE91dHB1dCwgUmVuZGVyZXIyLCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBtYXJrZWQgZnJvbSAnbWFya2VkJztcbmltcG9ydCBobGpzIGZyb20gXCJoaWdobGlnaHQuanNcIjtcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IGVtb2ppIGZyb20gJ25vZGUtZW1vamknXG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hcmtkb3duXSdcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25EaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHNldCBtYXJrZG93bnRleHQodikge1xuICAgIGlmICh2ICE9IG51bGwgJiYgdiAhPSB0aGlzLl9jb250ZW50KSB7XG4gICAgICB0aGlzLl9jb250ZW50ID0gdjtcbiAgICAgIHRoaXMucmVuZGVyTWFya2Rvd24odGhpcy5fY29udGVudCk7XG4gICAgfVxuICB9XG4gIEBPdXRwdXQoKSBnZXQgaHRtbCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZWRDb250ZW50O1xuICB9XG4gIF9jb250ZW50O1xuICBtYXJrZWRDb250ZW50OiBzdHJpbmc7XG4gIHJlbmRlcmVyID0gbmV3IG1hcmtlZC5SZW5kZXJlcigpO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBzYW5pdGl6ZTogRG9tU2FuaXRpemVyLCBwcml2YXRlIHJlbmRlcjI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMubWFya2VkUmVuZGVyZXIoKTtcbiAgICB0aGlzLnJlbmRlck1hcmtkb3duKFwiXCIpO1xuICB9XG5cblxuICByZW5kZXJNYXJrZG93bih0ZXh0KSB7XG4gICAgY29uc3QgcmVwbGFjZXIgPSAobWF0Y2gpID0+IGVtb2ppLmVtb2ppZnkobWF0Y2gpO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyg6Lio6KS9nLCByZXBsYWNlcik7XG5cbiAgICB0aGlzLm1hcmtlZENvbnRlbnQgPSBtYXJrZWQodGV4dCk7XG5cbiAgICB0aGlzLm1hcmtlZENvbnRlbnQgPSB0aGlzLnNhbml0aXplLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHRoaXMubWFya2VkQ29udGVudCkgYXMgc3RyaW5nXG5cbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5zYW5pdGl6ZS5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgdGhpcy5tYXJrZWRDb250ZW50KTtcblxuICB9XG5cbiAgbWFya2VkUmVuZGVyZXIoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0aXRlbSA9ICh0ZXh0OiBhbnkpID0+IHtcbiAgICAgIGlmICgvXlxccypcXFtbeCBdXFxdXFxzKi8udGVzdCh0ZXh0KSkge1xuICAgICAgICB0ZXh0ID0gdGV4dFxuICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKlxcWyBcXF1cXHMqLywgJzxpIGNsYXNzPVwiZmEgZmEtc3F1YXJlLW9cIiBzdHlsZT1cIm1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtO1wiPjwvaT4gJylcbiAgICAgICAgICAucmVwbGFjZSgvXlxccypcXFt4XFxdXFxzKi8sICc8aSBjbGFzcz1cImZhIGZhLWNoZWNrLXNxdWFyZVwiIHN0eWxlPVwibWFyZ2luOiAwIDAuMmVtIDAuMjVlbSAtMS42ZW07XCI+PC9pPiAnKTtcbiAgICAgICAgcmV0dXJuIGA8bGkgc3R5bGU9XCJsaXN0LXN0eWxlOiBub25lO1wiPiR7dGV4dH08L2xpPmA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYDxsaT4ke3RleHR9PC9saT5gO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5yZW5kZXJlci50YWJsZSA9IChoZWFkZXI6IHN0cmluZywgYm9keTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkXCI+XFxuPHRoZWFkPlxcbiR7aGVhZGVyfTwvdGhlYWQ+XFxuPHRib2R5PlxcbiR7Ym9keX08L3Rib2R5PlxcbjwvdGFibGU+XFxuYDtcbiAgICB9O1xuXG4gICAgbWFya2VkLnNldE9wdGlvbnMoe1xuICAgICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICByZXR1cm4gaGxqcy5oaWdobGlnaHRBdXRvKGNvZGUpLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHJlbmRlcmVyOiB0aGlzLnJlbmRlcmVyLFxuICAgICAgdGFibGVzOiB0cnVlLFxuICAgICAgc2FuaXRpemU6IGZhbHNlLFxuICAgICAgc21hcnRMaXN0czogdHJ1ZSxcblxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWUtFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZG93bkRpcmVjdGl2ZSB9IGZyb20gJy4vbWFya2Rvd24uZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEFuZ3VsYXJSZXNpemVkRXZlbnRNb2R1bGUgfSBmcm9tICdhbmd1bGFyLXJlc2l6ZS1ldmVudCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEFuZ3VsYXJSZXNpemVkRXZlbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFlLRWRpdG9yQ29tcG9uZW50LCBNYXJrZG93bkRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtZS0VkaXRvckNvbXBvbmVudCxNYXJrZG93bkRpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgWWtFZGl0b3JNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0lBNkZFLDJCQUFxQixFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTs2QkF0RVYsSUFBSSxZQUFZLEVBQUU7d0JBRWpDLEVBQUU7MkJBU1MsT0FBTzs0QkFFZCxLQUFLO3FCQUVILElBQUk7c0JBMERQO1lBQ1osUUFBUSxFQUFFLFVBQVU7WUFDcEIsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUMzQixXQUFXLEVBQUUsS0FBSztZQUNsQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsU0FBUztZQUNwQyxvQkFBb0IsRUFBRSxLQUFLO1lBQzNCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUFFLEtBQUs7U0FDbkI7S0FYdUM7SUFoRnhDLHNCQUNJLHNDQUFPOzs7O1FBRFg7WUFFRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEI7Ozs7O1FBRUQsVUFBWSxDQUFDO1lBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUI7OztPQUxBOzs7O0lBd0JELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFR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