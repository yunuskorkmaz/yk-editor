(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('monaco-editor'), require('node-emoji'), require('marked'), require('highlight.js'), require('@angular/platform-browser'), require('@angular/common'), require('angular-resize-event')) :
    typeof define === 'function' && define.amd ? define('yk-editor', ['exports', '@angular/core', 'monaco-editor', 'node-emoji', 'marked', 'highlight.js', '@angular/platform-browser', '@angular/common', 'angular-resize-event'], factory) :
    (factory((global['yk-editor'] = {}),global.ng.core,global.monacoEditor,global.emoji,global.marked,global.hljs,global.ng.platformBrowser,global.ng.common,global.angularResizeEvent));
}(this, (function (exports,core,monacoEditor,emoji,marked,hljs,platformBrowser,common,angularResizeEvent) { 'use strict';

    emoji = emoji && emoji.hasOwnProperty('default') ? emoji['default'] : emoji;
    marked = marked && marked.hasOwnProperty('default') ? marked['default'] : marked;
    hljs = hljs && hljs.hasOwnProperty('default') ? hljs['default'] : hljs;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var YKEditorComponent = /** @class */ (function () {
        function YKEditorComponent(el) {
            this.el = el;
            this.contentChange = new core.EventEmitter();
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
             */ function () {
                return this._content;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
                this.theme == true ? monacoEditor.editor.setTheme("vs") : monacoEditor.editor.setTheme("vs-dark");
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
                this.baseEditor = monacoEditor.editor.create(this.host.nativeElement, this.config);
                this.baseEditor.setModel(monacoEditor.editor.createModel(this.content, "markdown"));
                this.baseEditor.onDidChangeModelContent(function (e) {
                    _this.content = _this.baseEditor.getValue();
                });
                /** @type {?} */
                var emojilist = [];
                for (var k in emoji.emoji) {
                    emojilist.push({
                        label: k + " " + emoji.emoji[k],
                        kind: monacoEditor.languages.CompletionItemKind.Function,
                        insertText: k + ":"
                    });
                }
                monacoEditor.languages.registerCompletionItemProvider("markdown", {
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
                monacoEditor.languages.setLanguageConfiguration("markdown", {
                    onEnterRules: [
                        {
                            beforeText: /^[-]\s(.*)/,
                            action: {
                                appendText: "- ",
                                indentAction: monacoEditor.languages.IndentAction.None
                            }
                        }
                    ]
                });
                monacoEditor.languages.registerCompletionItemProvider("markdown", {
                    provideCompletionItems: function () {
                        return [
                            {
                                label: "h1",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "# ${1:text}"
                                }
                            },
                            {
                                label: "h2",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "## ${1:text}"
                                }
                            },
                            {
                                label: "h3",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "### ${1:text}"
                                }
                            },
                            {
                                label: "h4",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "#### ${1:text}"
                                }
                            },
                            {
                                label: "h5",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "##### ${1:text}"
                                }
                            },
                            {
                                label: "h6",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "###### ${1:text}"
                                }
                            },
                            {
                                label: "code",
                                kind: monacoEditor.languages.CompletionItemKind.Snippet,
                                insertText: {
                                    value: ["```", "${1:code}", "```"].join("\n")
                                },
                                documentation: "If-Else Statement"
                            },
                            {
                                label: "link",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "[${1:linkText}](${2:url})"
                                }
                            },
                            {
                                label: "image",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "![${1:altText}](${2:url})"
                                }
                            },
                            {
                                label: "linkreferance",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "[${1:name}]: ${2:link}"
                                }
                            },
                            {
                                label: "list",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "\n - ${1:text}"
                                }
                            },
                            {
                                label: "todo un check",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: "\n - [ ] ${2:text}"
                                }
                            },
                            {
                                label: "todo check",
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
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
                if (aftercharnewLine === void 0) {
                    aftercharnewLine = false;
                }
                if (line === void 0) {
                    line = 0;
                }
                /** @type {?} */
                var count = char.trim().length;
                /** @type {?} */
                var selection = this.baseEditor.getSelection();
                /** @type {?} */
                var text = this.baseEditor.getModel().getValueInRange(selection);
                text.trim();
                /** @type {?} */
                var beforeselection = new monacoEditor.Selection(selection.selectionStartLineNumber, selection.selectionStartColumn - count, selection.positionLineNumber, selection.positionColumn - text.length);
                /** @type {?} */
                var afterselection = new monacoEditor.Selection(selection.selectionStartLineNumber, selection.positionColumn, selection.positionLineNumber, selection.positionColumn + count);
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
                if (fill === void 0) {
                    fill = false;
                }
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
            { type: core.Component, args: [{
                        selector: "yk-editor",
                        template: "<div (resized)=\"onResized($event)\" class=\"main-container\" #mainContainer>\n  <div class=\"toolbar\">\n    <div>\n      <button (click)=\"insertContent('undo')\">\n        <i class=\"yi undo\"></i>\n      </button>\n      <button (click)=\"insertContent('redo')\">\n        <i class=\"yi repeat\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('bold')\">\n        <i class=\"yi bold\"></i>\n      </button>\n      <button (click)=\"insertContent('italic')\">\n        <i class=\"yi italic\"></i>\n      </button>\n\n      <button (click)=\"insertContent('strikethrough')\">\n        <i class=\"yi strikethrough\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('link')\">\n        <i class=\"yi link\"></i>\n      </button>\n      <button (click)=\"insertContent('image')\">\n        <i class=\"yi picture-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('code')\">\n        <i class=\"yi code\"></i>\n      </button>\n      <button (click)=\"insertContent('inline-code')\">\n        <i class=\"yi terminal\"></i>\n      </button>\n      <button (click)=\"insertContent('list')\">\n        <i class=\"yi list-ul\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-x')\">\n        <i class=\"yi check-square-o\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-o')\">\n        <i class=\"yi square-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"changeTheme()\">\n        <i class=\"yi\" [ngClass]=\"{'moon-o': theme, 'sun-o': !theme}\"></i>\n      </button>\n      <button (click)=\"changeLayout('fullscreen')\">\n        <i class=\"yi arrows-alt\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button (click)=\"changeLayout('edit')\" [ngClass]=\"{'active': displayMode == 'edit'}\">\n        <i class=\"yi pencil-square-o\"></i>\n      </button>\n      <button (click)=\"changeLayout('split')\" [ngClass]=\" {'active': displayMode=='split' }\">\n        <i class=\"yi columns\"></i>\n      </button>\n      <button (click)=\"changeLayout('preview')\" [ngClass]=\"{'active': displayMode == 'preview'}\">\n        <i class=\"yi eye\"></i>\n      </button>\n    </div>\n\n  </div>\n  <div (resized)=\"onResized($event)\" #resizeContainer class=\"editor-container\">\n    <div (resized)=\"onResized($event)\" class=\"editor\" #editorContainer>\n      <div class=\"monaco-editor\" #editorhost></div>\n    </div>\n    <div (resized)=\"onResized($event)\" class=\"preview\" #previewContainer [ngClass]=\"{'light': theme, 'dark':!theme}\">\n      <div markdown [markdowntext]=\"content\" class=\"rendered-markdown\"></div>\n    </div>\n  </div>\n</div>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        YKEditorComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        YKEditorComponent.propDecorators = {
            content: [{ type: core.Input }],
            contentChange: [{ type: core.Output }],
            host: [{ type: core.ViewChild, args: ["editorhost",] }],
            editorContainer: [{ type: core.ViewChild, args: ["editorContainer",] }],
            previewContainer: [{ type: core.ViewChild, args: ["previewContainer",] }],
            mainContainer: [{ type: core.ViewChild, args: ["mainContainer",] }],
            resizeContainer: [{ type: core.ViewChild, args: ["resizeContainer",] }]
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
             */ function (v) {
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
             */ function () {
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
                this.el.nativeElement.innerHTML = this.sanitize.sanitize(core.SecurityContext.HTML, this.markedContent);
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
            { type: core.Directive, args: [{
                        selector: '[markdown]'
                    },] }
        ];
        /** @nocollapse */
        MarkdownDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: platformBrowser.DomSanitizer },
                { type: core.Renderer2 }
            ];
        };
        MarkdownDirective.propDecorators = {
            markdowntext: [{ type: core.Input }],
            html: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            angularResizeEvent.AngularResizedEventModule
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

    exports.YkEditorModule = YkEditorModule;
    exports.YKEditorComponent = YKEditorComponent;
    exports.MarkdownDirective = MarkdownDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWstZWRpdG9yLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8veWstZWRpdG9yL2xpYi95a2VkaXRvci95a2VkaXRvci5jb21wb25lbnQudHMiLCJuZzovL3lrLWVkaXRvci9saWIvbWFya2Rvd24uZGlyZWN0aXZlLnRzIiwibmc6Ly95ay1lZGl0b3IvbGliL3lrLWVkaXRvci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlclZpZXdJbml0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZWRpdG9yLCBTZWxlY3Rpb24sIGxhbmd1YWdlc30gZnJvbSAnbW9uYWNvLWVkaXRvcic7XHJcbmltcG9ydCBlbW9qaSBmcm9tICdub2RlLWVtb2ppJ1xyXG5pbXBvcnQgeyBSZXNpemVkRXZlbnQgfSBmcm9tICdhbmd1bGFyLXJlc2l6ZS1ldmVudC9yZXNpemVkLWV2ZW50JztcclxuaW1wb3J0IHsgUmVzaXplZERpcmVjdGl2ZSB9IGZyb20gJ2FuZ3VsYXItcmVzaXplLWV2ZW50L3Jlc2l6ZWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQW5ndWxhclJlc2l6ZWRFdmVudE1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItcmVzaXplLWV2ZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcInlrLWVkaXRvclwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4veWtlZGl0b3IuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcIi4veWtlZGl0b3IuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgWUtFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGVudDtcclxuICB9XHJcblxyXG4gIHNldCBjb250ZW50KHYpIHtcclxuICAgIHRoaXMuX2NvbnRlbnQgPSB2O1xyXG4gICAgdGhpcy5jb250ZW50Q2hhbmdlLmVtaXQodik7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgY29udGVudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgX2NvbnRlbnQgPSBcIlwiO1xyXG4gIEBWaWV3Q2hpbGQoXCJlZGl0b3Job3N0XCIpIGhvc3Q6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImVkaXRvckNvbnRhaW5lclwiKSBlZGl0b3JDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInByZXZpZXdDb250YWluZXJcIikgcHJldmlld0NvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwibWFpbkNvbnRhaW5lclwiKSBtYWluQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJyZXNpemVDb250YWluZXJcIikgcmVzaXplQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIFxyXG4gIGJhc2VFZGl0b3I6IGFueTtcclxuXHJcbiAgZGlzcGxheU1vZGU6IHN0cmluZyA9IFwic3BsaXRcIjtcclxuXHJcbiAgaXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcblxyXG4gIHRoZW1lOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY2hhbmdlVGhlbWUoKSB7XHJcbiAgICB0aGlzLnRoZW1lID0gIXRoaXMudGhlbWU7XHJcbiAgICB0aGlzLnRoZW1lID09IHRydWUgPyBlZGl0b3Iuc2V0VGhlbWUoXCJ2c1wiKSA6IGVkaXRvci5zZXRUaGVtZShcInZzLWRhcmtcIik7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VMYXlvdXQodHlwZSkge1xyXG4gICAgaWYgKHRoaXMuZGlzcGxheU1vZGUgIT0gdHlwZSB8fCB0eXBlID09IFwiZnVsbHNjcmVlblwiKSB7XHJcbiAgICAgIHRoaXMuZGlzcGxheU1vZGUgPSB0eXBlO1xyXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiZWRpdFwiOlxyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgICAgICBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGxheSA6IG5vbmVcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgICAgICBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIFwibWluLXdpZHRoIDogMTAwJTttYXgtd2lkdGggOiAxMDAlXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwicHJldmlld1wiOlxyXG4gICAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgXCJkaXNwbGF5IDogbm9uZVwiXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgICAgICBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIFwibWluLXdpZHRoIDogMTAwJTttYXgtd2lkdGggOiAxMDAlXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwic3BsaXRcIjpcclxuICAgICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIlwiKTtcclxuICAgICAgICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbHNjcmVlblwiOlxyXG4gICAgICAgICAgdGhpcy5pc0Z1bGxTY3JlZW4gPSAhdGhpcy5pc0Z1bGxTY3JlZW47XHJcbiAgICAgICAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcclxuICAgICAgICAgICAgICBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgICAgXCJwb3NpdGlvbjogZml4ZWQ7dG9wOiAwcHg7bGVmdDogMDtib3R0b206IDA7cmlnaHQ6IDA7d2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO1wiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICAgICAgICB9YnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmxheW91dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoIHByaXZhdGUgZWwgOiBFbGVtZW50UmVmKSB7fVxyXG4gIFxyXG5cclxuICBjb25maWc6IGFueSA9IHtcclxuICAgIGxhbmd1YWdlOiBcIm1hcmtkb3duXCIsXHJcbiAgICBtaW5pbWFwOiB7IGVuYWJsZWQ6IGZhbHNlIH0sXHJcbiAgICBsaW5lTnVtYmVyczogXCJvZmZcIixcclxuICAgIHRoZW1lOiB0aGlzLnRoZW1lID8gXCJ2c1wiIDogXCJ2cy1kYXJrXCIsXHJcbiAgICBzY3JvbGxCZXlvbmRMYXN0TGluZTogZmFsc2UsXHJcbiAgICB3b3JkV3JhcDogXCJvblwiLFxyXG4gICAgZ2x5cGhNYXJnaW46IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IgPSBlZGl0b3IuY3JlYXRlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCB0aGlzLmNvbmZpZyk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0TW9kZWwoZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMuY29udGVudCwgXCJtYXJrZG93blwiKSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoZSA9PiB7XHJcbiAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuYmFzZUVkaXRvci5nZXRWYWx1ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgZW1vamlsaXN0ID0gW107XHJcbiAgICBmb3IgKHZhciBrIGluIGVtb2ppLmVtb2ppKSB7XHJcbiAgICAgIGVtb2ppbGlzdC5wdXNoKHtcclxuICAgICAgICBsYWJlbDogayArIFwiIFwiICsgZW1vamkuZW1vamlba10sXHJcbiAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5GdW5jdGlvbixcclxuICAgICAgICBpbnNlcnRUZXh0OiBrICsgXCI6XCJcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcihcIm1hcmtkb3duXCIsIHtcclxuICAgICAgcHJvdmlkZUNvbXBsZXRpb25JdGVtczogZnVuY3Rpb24obW9kZWwsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRleHRVbnRpbFBvc2l0aW9uID0gbW9kZWwuZ2V0VmFsdWVJblJhbmdlKHtcclxuICAgICAgICAgIHN0YXJ0TGluZU51bWJlcjogcG9zaXRpb24ubGluZU51bWJlcixcclxuICAgICAgICAgIHN0YXJ0Q29sdW1uOiBwb3NpdGlvbi5jb2x1bW4gLSAxLFxyXG4gICAgICAgICAgZW5kTGluZU51bWJlcjogcG9zaXRpb24ubGluZU51bWJlcixcclxuICAgICAgICAgIGVuZENvbHVtbjogcG9zaXRpb24uY29sdW1uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRleHRVbnRpbFBvc2l0aW9uID09PSBcIjpcIikge1xyXG4gICAgICAgICAgcmV0dXJuIGVtb2ppbGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICB9LFxyXG4gICAgICB0cmlnZ2VyQ2hhcmFjdGVyczogW1wiOlwiXVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGFuZ3VhZ2VzLnNldExhbmd1YWdlQ29uZmlndXJhdGlvbihcIm1hcmtkb3duXCIsIHtcclxuICAgICAgb25FbnRlclJ1bGVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYmVmb3JlVGV4dDogL15bLV1cXHMoLiopLyxcclxuICAgICAgICAgIGFjdGlvbjoge1xyXG4gICAgICAgICAgICBhcHBlbmRUZXh0OiBcIi0gXCIsXHJcbiAgICAgICAgICAgIGluZGVudEFjdGlvbjogbGFuZ3VhZ2VzLkluZGVudEFjdGlvbi5Ob25lXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICAgIGxhbmd1YWdlcy5yZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIoXCJtYXJrZG93blwiLCB7XHJcbiAgICAgIHByb3ZpZGVDb21wbGV0aW9uSXRlbXM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJoMVwiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCIjICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImgyXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiMjICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImgzXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiMjIyAkezE6dGV4dH1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJoNFwiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCIjIyMjICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImg1XCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiMjIyMjICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImg2XCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiMjIyMjIyAkezE6dGV4dH1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJjb2RlXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuU25pcHBldCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBbXCJgYGBcIiwgXCIkezE6Y29kZX1cIiwgXCJgYGBcIl0uam9pbihcIlxcblwiKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkb2N1bWVudGF0aW9uOiBcIklmLUVsc2UgU3RhdGVtZW50XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImxpbmtcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiWyR7MTpsaW5rVGV4dH1dKCR7Mjp1cmx9KVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImltYWdlXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiFbJHsxOmFsdFRleHR9XSgkezI6dXJsfSlcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJsaW5rcmVmZXJhbmNlXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIlskezE6bmFtZX1dOiAkezI6bGlua31cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJsaXN0XCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIlxcbiAtICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcInRvZG8gdW4gY2hlY2tcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiXFxuIC0gWyBdICR7Mjp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJ0b2RvIGNoZWNrXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIlxcbiAtIFt4XSAkezI6dGV4dH1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnVwZGF0ZU9wdGlvbnMoe1xyXG4gICAgICBnbHlwaE1hcmdpbjogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChjaGFyLCBhZnRlcmNoYXJuZXdMaW5lID0gZmFsc2UsIGxpbmUgPSAwKSB7XHJcbiAgICB2YXIgY291bnQgPSBjaGFyLnRyaW0oKS5sZW5ndGg7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmJhc2VFZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICB2YXIgdGV4dCA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShzZWxlY3Rpb24pO1xyXG4gICAgdGV4dC50cmltKCk7XHJcbiAgICB2YXIgYmVmb3Jlc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihcclxuICAgICAgc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0Q29sdW1uIC0gY291bnQsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkxpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbiAtIHRleHQubGVuZ3RoXHJcbiAgICApO1xyXG5cclxuICAgIHZhciBhZnRlcnNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oXHJcbiAgICAgIHNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uTGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uICsgY291bnRcclxuICAgICk7XHJcblxyXG4gICAgdmFyIHN0YXJ0Y2hhciA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShiZWZvcmVzZWxlY3Rpb24pO1xyXG4gICAgdmFyIGVuZGNoYXIgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2UoYWZ0ZXJzZWxlY3Rpb24pO1xyXG5cclxuICAgIGlmIChzdGFydGNoYXIgPT0gY2hhciAmJiBlbmRjaGFyID09IGNoYXIpIHtcclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cyhcIlwiLCBbeyByYW5nZTogYWZ0ZXJzZWxlY3Rpb24sIHRleHQ6IFwiXCIgfV0pO1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBiZWZvcmVzZWxlY3Rpb24sIHRleHQ6IFwiXCIgfV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dCA9IGAke2FmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/IFwiXFxuXCIgOiBcIlwifSR7Y2hhcn0ke1xyXG4gICAgICAgIGFmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/IFwiXFxuXCIgOiBcIlwiXHJcbiAgICAgIH0ke3RleHR9JHthZnRlcmNoYXJuZXdMaW5lID09IHRydWUgPyBcIlxcblwiIDogXCJcIn0ke2NoYXJ9YDtcclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cyhcIlwiLCBbeyByYW5nZTogc2VsZWN0aW9uLCB0ZXh0OiB0ZXh0IH1dKTtcclxuXHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5zZXRTZWxlY3Rpb24oe1xyXG4gICAgICAgIHN0YXJ0Q29sdW1uOiBzZWxlY3Rpb24uc3RhcnRDb2x1bW4gKyAobGluZSA9PSAwID8gY291bnQgOiAwKSxcclxuICAgICAgICBlbmRDb2x1bW46IHNlbGVjdGlvbi5lbmRDb2x1bW4gKyAobGluZSA9PSAwID8gY291bnQgOiAwKSxcclxuICAgICAgICBzdGFydExpbmVOdW1iZXI6IHNlbGVjdGlvbi5zdGFydExpbmVOdW1iZXIgKyBsaW5lLFxyXG4gICAgICAgIGVuZExpbmVOdW1iZXI6IHNlbGVjdGlvbi5lbmRMaW5lTnVtYmVyICsgbGluZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuICBsaW5rQmFzZWRJbnNlcnRUZXh0KHR5cGUpIHtcclxuICAgIHZhciBjb3VudCA9IHR5cGUgPT0gXCJpbWFnZVwiID8gNCA6IDM7XHJcbiAgICB2YXIgZXh0cmFjaGFyID0gdHlwZSA9PSBcImltYWdlXCIgPyBcIiFcIiA6IFwiXCI7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmJhc2VFZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICB2YXIgdGV4dCA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShzZWxlY3Rpb24pO1xyXG4gICAgdmFyIG5ld1RleHQgPSBgJHtleHRyYWNoYXJ9WyR7dGV4dH1dKClgO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cyhcIlwiLCBbeyByYW5nZTogc2VsZWN0aW9uLCB0ZXh0OiBuZXdUZXh0IH1dKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRQb3NpdGlvbih7XHJcbiAgICAgIGxpbmVOdW1iZXI6IHNlbGVjdGlvbi5lbmRMaW5lTnVtYmVyLFxyXG4gICAgICBjb2x1bW46IHNlbGVjdGlvbi5lbmRDb2x1bW4gKyBjb3VudFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcbiAgbGlzdEJhc2VkSW5zZXJ0VGV4dCh0eXBlLCBmaWxsID0gZmFsc2UpIHtcclxuICAgIHZhciBleHRyYSA9IHR5cGUgPT0gXCJ0b2RvXCIgPyAoZmlsbCA9PSB0cnVlID8gXCJbeF1cIiA6IFwiWyBdXCIpIDogXCJcIjtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB2YXIgbmV3VGV4dCA9IGBcXG4gLSAke2V4dHJhfSAke3RleHR9IGA7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IG5ld1RleHQgfV0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldFBvc2l0aW9uKHtcclxuICAgICAgbGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIgKyAxLFxyXG4gICAgICBjb2x1bW46IHR5cGUgPT0gXCJ0b2RvXCIgPyA4IDogNFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGluc2VydENvbnRlbnQodHlwZSkge1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgXCJib2xkXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiKipcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJpdGFsaWNcIjpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoXCIqXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic3RyaWtldGhyb3VnaFwiOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIn5+XCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibGlua1wiOlxyXG4gICAgICAgIHRoaXMubGlua0Jhc2VkSW5zZXJ0VGV4dChcImxpbmtcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJpbWFnZVwiOlxyXG4gICAgICAgIHRoaXMubGlua0Jhc2VkSW5zZXJ0VGV4dChcImltYWdlXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiY29kZVwiOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcImBgYFwiLCB0cnVlLCArMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJpbmxpbmUtY29kZVwiOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcImBcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJ1bmRvXCI6XHJcbiAgICAgICAgdGhpcy5iYXNlRWRpdG9yLnRyaWdnZXIoXCJcIiwgXCJ1bmRvXCIsIFwiXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwicmVkb1wiOlxyXG4gICAgICAgIHRoaXMuYmFzZUVkaXRvci50cmlnZ2VyKFwiXCIsIFwicmVkb1wiLCBcIlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImxpc3RcIjpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoXCJsaW5rXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwidG9kby14XCI6XHJcbiAgICAgICAgdGhpcy5saXN0QmFzZWRJbnNlcnRUZXh0KFwidG9kb1wiLCB0cnVlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInRvZG8tb1wiOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dChcInRvZG9cIiwgZmFsc2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25SZXNpemVkKGV2ZW50OiBSZXNpemVkRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5sYXlvdXQoKTtcclxuICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgfVxyXG4gIHJlc2l6ZUxheW91dCgpIHtcclxuICAgIHZhciB3aXRkaCA9IHRoaXMucmVzaXplQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gd2l0ZGggLyAyICsgXCJweFwiO1xyXG4gICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aXRkaCAvIDIgKyBcInB4XCI7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlc2l6ZUxheW91dCgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBPdXRwdXQsIFJlbmRlcmVyMiwgU2VjdXJpdHlDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgbWFya2VkIGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgaGxqcyBmcm9tIFwiaGlnaGxpZ2h0LmpzXCI7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCBlbW9qaSBmcm9tICdub2RlLWVtb2ppJ1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXJrZG93bl0nXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBzZXQgbWFya2Rvd250ZXh0KHYpIHtcbiAgICBpZiAodiAhPSBudWxsICYmIHYgIT0gdGhpcy5fY29udGVudCkge1xuICAgICAgdGhpcy5fY29udGVudCA9IHY7XG4gICAgICB0aGlzLnJlbmRlck1hcmtkb3duKHRoaXMuX2NvbnRlbnQpO1xuICAgIH1cbiAgfVxuICBAT3V0cHV0KCkgZ2V0IGh0bWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2VkQ29udGVudDtcbiAgfVxuICBfY29udGVudDtcbiAgbWFya2VkQ29udGVudDogc3RyaW5nO1xuICByZW5kZXJlciA9IG5ldyBtYXJrZWQuUmVuZGVyZXIoKTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgc2FuaXRpemU6IERvbVNhbml0aXplciwgcHJpdmF0ZSByZW5kZXIyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLm1hcmtlZFJlbmRlcmVyKCk7XG4gICAgdGhpcy5yZW5kZXJNYXJrZG93bihcIlwiKTtcbiAgfVxuXG5cbiAgcmVuZGVyTWFya2Rvd24odGV4dCkge1xuICAgIGNvbnN0IHJlcGxhY2VyID0gKG1hdGNoKSA9PiBlbW9qaS5lbW9qaWZ5KG1hdGNoKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oOi4qOikvZywgcmVwbGFjZXIpO1xuXG4gICAgdGhpcy5tYXJrZWRDb250ZW50ID0gbWFya2VkKHRleHQpO1xuXG4gICAgdGhpcy5tYXJrZWRDb250ZW50ID0gdGhpcy5zYW5pdGl6ZS5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLm1hcmtlZENvbnRlbnQpIGFzIHN0cmluZ1xuXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuc2FuaXRpemUuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LkhUTUwsIHRoaXMubWFya2VkQ29udGVudCk7XG5cbiAgfVxuXG4gIG1hcmtlZFJlbmRlcmVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0gPSAodGV4dDogYW55KSA9PiB7XG4gICAgICBpZiAoL15cXHMqXFxbW3ggXVxcXVxccyovLnRlc3QodGV4dCkpIHtcbiAgICAgICAgdGV4dCA9IHRleHRcbiAgICAgICAgICAucmVwbGFjZSgvXlxccypcXFsgXFxdXFxzKi8sICc8aSBjbGFzcz1cImZhIGZhLXNxdWFyZS1vXCIgc3R5bGU9XCJtYXJnaW46IDAgMC4yZW0gMC4yNWVtIC0xLjZlbTtcIj48L2k+ICcpXG4gICAgICAgICAgLnJlcGxhY2UoL15cXHMqXFxbeFxcXVxccyovLCAnPGkgY2xhc3M9XCJmYSBmYS1jaGVjay1zcXVhcmVcIiBzdHlsZT1cIm1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtO1wiPjwvaT4gJyk7XG4gICAgICAgIHJldHVybiBgPGxpIHN0eWxlPVwibGlzdC1zdHlsZTogbm9uZTtcIj4ke3RleHR9PC9saT5gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGA8bGk+JHt0ZXh0fTwvbGk+YDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMucmVuZGVyZXIudGFibGUgPSAoaGVhZGVyOiBzdHJpbmcsIGJvZHk6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZFwiPlxcbjx0aGVhZD5cXG4ke2hlYWRlcn08L3RoZWFkPlxcbjx0Ym9keT5cXG4ke2JvZHl9PC90Ym9keT5cXG48L3RhYmxlPlxcbmA7XG4gICAgfTtcblxuICAgIG1hcmtlZC5zZXRPcHRpb25zKHtcbiAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGhsanMuaGlnaGxpZ2h0QXV0byhjb2RlKS52YWx1ZTtcbiAgICAgIH0sXG4gICAgICByZW5kZXJlcjogdGhpcy5yZW5kZXJlcixcbiAgICAgIHRhYmxlczogdHJ1ZSxcbiAgICAgIHNhbml0aXplOiBmYWxzZSxcbiAgICAgIHNtYXJ0TGlzdHM6IHRydWUsXG5cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFlLRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi95a2VkaXRvci95a2VkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFya2Rvd25EaXJlY3RpdmUgfSBmcm9tICcuL21hcmtkb3duLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBBbmd1bGFyUmVzaXplZEV2ZW50TW9kdWxlIH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBBbmd1bGFyUmVzaXplZEV2ZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWyBZS0VkaXRvckNvbXBvbmVudCwgTWFya2Rvd25EaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbWUtFZGl0b3JDb21wb25lbnQsTWFya2Rvd25EaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIFlrRWRpdG9yTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsImVkaXRvciIsImxhbmd1YWdlcyIsIlNlbGVjdGlvbiIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIlNlY3VyaXR5Q29udGV4dCIsIkRpcmVjdGl2ZSIsIkRvbVNhbml0aXplciIsIlJlbmRlcmVyMiIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQW5ndWxhclJlc2l6ZWRFdmVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtRQTZGRSwyQkFBcUIsRUFBZTtZQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7aUNBdEVWLElBQUlBLGlCQUFZLEVBQUU7NEJBRWpDLEVBQUU7K0JBU1MsT0FBTztnQ0FFZCxLQUFLO3lCQUVILElBQUk7MEJBMERQO2dCQUNaLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO2dCQUMzQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLFNBQVM7Z0JBQ3BDLG9CQUFvQixFQUFFLEtBQUs7Z0JBQzNCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFdBQVcsRUFBRSxLQUFLO2FBQ25CO1NBWHVDO1FBaEZ4QyxzQkFDSSxzQ0FBTzs7O2dCQURYO2dCQUVFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN0Qjs7OztnQkFFRCxVQUFZ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