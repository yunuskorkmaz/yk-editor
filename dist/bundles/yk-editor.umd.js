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
        function YKEditorComponent() {
            this.contentChange = new core.EventEmitter();
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
                            this.resizeLayout();
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
                this.baseEditor.setModel(monacoEditor.editor.createModel(this.content, 'markdown'));
                this.baseEditor.onDidChangeModelContent(function (e) {
                    _this.content = _this.baseEditor.getValue();
                });
                /** @type {?} */
                var emojilist = [];
                for (var k in emoji.emoji) {
                    emojilist.push({ label: k + " " + emoji.emoji[k], kind: monacoEditor.languages.CompletionItemKind.Function, insertText: k + ":" });
                }
                monacoEditor.languages.registerCompletionItemProvider('markdown', {
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
                monacoEditor.languages.setLanguageConfiguration('markdown', {
                    onEnterRules: [
                        {
                            beforeText: /^[-]\s(.*)/,
                            action: { appendText: '- ', indentAction: monacoEditor.languages.IndentAction.None }
                        }
                    ]
                });
                monacoEditor.languages.registerCompletionItemProvider('markdown', {
                    provideCompletionItems: function () {
                        return [
                            {
                                label: 'h1',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '# ${1:text}'
                                }
                            },
                            {
                                label: 'h2',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '## ${1:text}'
                                }
                            },
                            {
                                label: 'h3',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '### ${1:text}'
                                }
                            },
                            {
                                label: 'h4',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '#### ${1:text}'
                                }
                            },
                            {
                                label: 'h5',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '##### ${1:text}'
                                }
                            },
                            {
                                label: 'h6',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '###### ${1:text}'
                                }
                            },
                            {
                                label: 'code',
                                kind: monacoEditor.languages.CompletionItemKind.Snippet,
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
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '[${1:linkText}](${2:url})'
                                }
                            },
                            {
                                label: 'image',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '![${1:altText}](${2:url})'
                                }
                            },
                            {
                                label: 'linkreferance',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '[${1:name}]: ${2:link}'
                                }
                            },
                            {
                                label: 'list',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '\n - ${1:text}'
                                }
                            },
                            {
                                label: 'todo un check',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
                                insertText: {
                                    value: '\n - [ ] ${2:text}'
                                }
                            },
                            {
                                label: 'todo check',
                                kind: monacoEditor.languages.CompletionItemKind.Keyword,
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
                    this.baseEditor.executeEdits('', [{ range: afterselection, text: '' }]);
                    this.baseEditor.executeEdits('', [{ range: beforeselection, text: '' }]);
                }
                else {
                    text = "" + (aftercharnewLine == true ? '\n' : '') + char + (aftercharnewLine == true ? '\n' : '') + text + (aftercharnewLine == true ? '\n' : '') + char;
                    this.baseEditor.executeEdits('', [{ range: selection, text: text }]);
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
                this.baseEditor.executeEdits('', [{ range: selection, text: newText }]);
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
                var extra = type == 'todo' ? fill == true ? '[x]' : '[ ]' : '';
                /** @type {?} */
                var selection = this.baseEditor.getSelection();
                /** @type {?} */
                var text = this.baseEditor.getModel().getValueInRange(selection);
                /** @type {?} */
                var newText = "\n - " + extra + " " + text + " ";
                this.baseEditor.executeEdits('', [{ range: selection, text: newText }]);
                this.baseEditor.setPosition({
                    lineNumber: selection.endLineNumber + 1,
                    column: type == 'todo' ? 8 : 4
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
                this.editorContainer.nativeElement.style.width = (witdh / 2) + "px";
                this.previewContainer.nativeElement.style.width = (witdh / 2) + "px";
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
                        selector: 'yk-editor',
                        template: "<div (resized)=\"onResized($event)\" class=\"main-container\" #mainContainer>\n  <div class=\"toolbar\">\n    <div>\n      <button (click)=\"insertContent('undo')\">\n        <i class=\"yi undo\"></i>\n      </button>\n      <button (click)=\"insertContent('redo')\">\n        <i class=\"yi repeat\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('bold')\">\n        <i class=\"yi bold\"></i>\n      </button>\n      <button (click)=\"insertContent('italic')\">\n        <i class=\"yi italic\"></i>\n      </button>\n\n      <button (click)=\"insertContent('strikethrough')\">\n        <i class=\"yi strikethrough\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('link')\">\n        <i class=\"yi link\"></i>\n      </button>\n      <button (click)=\"insertContent('image')\">\n        <i class=\"yi picture-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('code')\">\n        <i class=\"yi code\"></i>\n      </button>\n      <button (click)=\"insertContent('inline-code')\">\n        <i class=\"yi terminal\"></i>\n      </button>\n      <button (click)=\"insertContent('list')\">\n        <i class=\"yi list-ul\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-x')\">\n        <i class=\"yi check-square-o\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-o')\">\n        <i class=\"yi square-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"changeTheme()\">\n        <i class=\"yi\" [ngClass]=\"{'moon-o': theme, 'sun-o': !theme}\"></i>\n      </button>\n      <button (click)=\"changeLayout('fullscreen')\">\n        <i class=\"yi arrows-alt\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button (click)=\"changeLayout('edit')\" [ngClass]=\"{'active': displayMode == 'edit'}\">\n        <i class=\"yi pencil-square-o\"></i>\n      </button>\n      <button (click)=\"changeLayout('split')\" [ngClass]=\" {'active': displayMode=='split' }\">\n        <i class=\"yi columns\"></i>\n      </button>\n      <button (click)=\"changeLayout('preview')\" [ngClass]=\"{'active': displayMode == 'preview'}\">\n        <i class=\"yi eye\"></i>\n      </button>\n    </div>\n\n  </div>\n  <div (resized)=\"onResized($event)\" #resizeContainer class=\"editor-container\">\n    <div (resized)=\"onResized($event)\" class=\"editor\" #editorContainer>\n      <div class=\"monaco-editor\" #editorhost></div>\n    </div>\n    <div (resized)=\"onResized($event)\" class=\"preview\" #previewContainer [ngClass]=\"{'light': theme, 'dark':!theme}\">\n      <div markdown [markdowntext]=\"content\" class=\"rendered-markdown\"></div>\n    </div>\n  </div>\n</div>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        YKEditorComponent.ctorParameters = function () { return []; };
        YKEditorComponent.propDecorators = {
            content: [{ type: core.Input }],
            contentChange: [{ type: core.Output }],
            host: [{ type: core.ViewChild, args: ["editorhost",] }],
            editorContainer: [{ type: core.ViewChild, args: ["editorContainer",] }],
            previewContainer: [{ type: core.ViewChild, args: ["previewContainer",] }],
            mainContainer: [{ type: core.ViewChild, args: ['mainContainer',] }],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWstZWRpdG9yLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8veWstZWRpdG9yL2xpYi95a2VkaXRvci95a2VkaXRvci5jb21wb25lbnQudHMiLCJuZzovL3lrLWVkaXRvci9saWIvbWFya2Rvd24uZGlyZWN0aXZlLnRzIiwibmc6Ly95ay1lZGl0b3IvbGliL3lrLWVkaXRvci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVkaXRvciwgU2VsZWN0aW9uLCBsYW5ndWFnZXN9IGZyb20gJ21vbmFjby1lZGl0b3InO1xyXG5pbXBvcnQgZW1vamkgZnJvbSAnbm9kZS1lbW9qaSdcclxuaW1wb3J0IHsgUmVzaXplZEV2ZW50IH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQvcmVzaXplZC1ldmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3lrLWVkaXRvcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3lrZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi95a2VkaXRvci5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFlLRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodikge1xyXG4gICAgdGhpcy5fY29udGVudCA9IHY7XHJcbiAgICB0aGlzLmNvbnRlbnRDaGFuZ2UuZW1pdCh2KTtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBjb250ZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBfY29udGVudCA9IFwiXCI7XHJcbiAgQFZpZXdDaGlsZChcImVkaXRvcmhvc3RcIikgaG9zdDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZWRpdG9yQ29udGFpbmVyXCIpIGVkaXRvckNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicHJldmlld0NvbnRhaW5lclwiKSBwcmV2aWV3Q29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ21haW5Db250YWluZXInKSBtYWluQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJyZXNpemVDb250YWluZXJcIikgcmVzaXplQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIGJhc2VFZGl0b3I6IGFueTtcclxuXHJcbiAgZGlzcGxheU1vZGU6IHN0cmluZyA9IFwic3BsaXRcIjtcclxuXHJcbiAgaXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcblxyXG4gIHRoZW1lOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY2hhbmdlVGhlbWUoKSB7XHJcbiAgICB0aGlzLnRoZW1lID0gIXRoaXMudGhlbWU7XHJcbiAgICB0aGlzLnRoZW1lID09IHRydWUgPyBlZGl0b3Iuc2V0VGhlbWUoXCJ2c1wiKSA6IGVkaXRvci5zZXRUaGVtZShcInZzLWRhcmtcIik7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VMYXlvdXQodHlwZSkge1xyXG4gICAgaWYgKHRoaXMuZGlzcGxheU1vZGUgIT0gdHlwZSB8fCB0eXBlID09IFwiZnVsbHNjcmVlblwiKSB7XHJcbiAgICAgIHRoaXMuZGlzcGxheU1vZGUgPSB0eXBlO1xyXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICBjYXNlICdlZGl0JzpcclxuICAgICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheSA6IG5vbmVcIik7XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWluLXdpZHRoIDogMTAwJTttYXgtd2lkdGggOiAxMDAlXCIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncHJldmlldyc6XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheSA6IG5vbmVcIik7XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1pbi13aWR0aCA6IDEwMCU7bWF4LXdpZHRoIDogMTAwJVwiKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3NwbGl0JzpcclxuICAgICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIlwiKTtcclxuICAgICAgICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdmdWxsc2NyZWVuJzpcclxuXHJcbiAgICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbiA9ICF0aGlzLmlzRnVsbFNjcmVlbjtcclxuICAgICAgICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbiA9PSB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJwb3NpdGlvbjogZml4ZWQ7dG9wOiAwcHg7bGVmdDogMDtib3R0b206IDA7cmlnaHQ6IDA7d2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO1wiKTtcclxuICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiXCIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmxheW91dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgY29uZmlnOiBhbnkgPSB7XHJcblxyXG4gICAgbGFuZ3VhZ2U6IFwibWFya2Rvd25cIixcclxuICAgIG1pbmltYXA6IHsgZW5hYmxlZDogZmFsc2UgfSxcclxuICAgIGxpbmVOdW1iZXJzOiBcIm9mZlwiLFxyXG4gICAgdGhlbWU6IHRoaXMudGhlbWUgPyAndnMnIDogJ3ZzLWRhcmsnLFxyXG4gICAgc2Nyb2xsQmV5b25kTGFzdExpbmU6IGZhbHNlLFxyXG4gICAgd29yZFdyYXA6ICdvbicsXHJcbiAgICBnbHlwaE1hcmdpbjogZmFsc2VcclxuICB9XHJcblxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYmFzZUVkaXRvciA9IGVkaXRvci5jcmVhdGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuY29uZmlnKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRNb2RlbChlZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5jb250ZW50LCAnbWFya2Rvd24nKSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKGUpID0+IHtcclxuICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5iYXNlRWRpdG9yLmdldFZhbHVlKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBlbW9qaWxpc3QgPSBbXTtcclxuICAgIGZvciAodmFyIGsgaW4gZW1vamkuZW1vamkpIHsgZW1vamlsaXN0LnB1c2goeyBsYWJlbDogayArIFwiIFwiICsgZW1vamkuZW1vamlba10sIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuRnVuY3Rpb24sIGluc2VydFRleHQ6IGsgKyBcIjpcIiB9KSB9XHJcblxyXG4gICAgbGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcignbWFya2Rvd24nLCB7XHJcbiAgICAgIHByb3ZpZGVDb21wbGV0aW9uSXRlbXM6IGZ1bmN0aW9uIChtb2RlbCwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdGV4dFVudGlsUG9zaXRpb24gPSBtb2RlbC5nZXRWYWx1ZUluUmFuZ2UoeyBzdGFydExpbmVOdW1iZXI6IHBvc2l0aW9uLmxpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uOiBwb3NpdGlvbi5jb2x1bW4gLSAxLCBlbmRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLCBlbmRDb2x1bW46IHBvc2l0aW9uLmNvbHVtbiB9KTtcclxuICAgICAgICBpZiAodGV4dFVudGlsUG9zaXRpb24gPT09ICc6JykgeyByZXR1cm4gZW1vamlsaXN0OyB9IHJldHVybiBbXTtcclxuICAgICAgfSxcclxuICAgICAgdHJpZ2dlckNoYXJhY3RlcnM6IFsnOiddXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW5ndWFnZXMuc2V0TGFuZ3VhZ2VDb25maWd1cmF0aW9uKCdtYXJrZG93bicsIHtcclxuICAgICAgb25FbnRlclJ1bGVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYmVmb3JlVGV4dDogL15bLV1cXHMoLiopLyxcclxuICAgICAgICAgIGFjdGlvbjogeyBhcHBlbmRUZXh0OiAnLSAnLCBpbmRlbnRBY3Rpb246IGxhbmd1YWdlcy5JbmRlbnRBY3Rpb24uTm9uZSB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBsYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKCdtYXJrZG93bicsIHtcclxuICAgICAgcHJvdmlkZUNvbXBsZXRpb25JdGVtczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDEnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2gyJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDMnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDQnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2g1JyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyMjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDYnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjIyMjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnY29kZScsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuU25pcHBldCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBbXHJcbiAgICAgICAgICAgICAgICAnYGBgJyxcclxuICAgICAgICAgICAgICAgICckezE6Y29kZX0nLFxyXG4gICAgICAgICAgICAgICAgJ2BgYCcsXHJcblxyXG4gICAgICAgICAgICAgIF0uam9pbignXFxuJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJ0lmLUVsc2UgU3RhdGVtZW50J1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdsaW5rJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdbJHsxOmxpbmtUZXh0fV0oJHsyOnVybH0pJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2ltYWdlJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICchWyR7MTphbHRUZXh0fV0oJHsyOnVybH0pJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2xpbmtyZWZlcmFuY2UnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1skezE6bmFtZX1dOiAkezI6bGlua30nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnbGlzdCcsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnXFxuIC0gJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ3RvZG8gdW4gY2hlY2snLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1xcbiAtIFsgXSAkezI6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ3RvZG8gY2hlY2snLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1xcbiAtIFt4XSAkezI6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYmFzZUVkaXRvci51cGRhdGVPcHRpb25zKHtcclxuICAgICAgZ2x5cGhNYXJnaW4gOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIGNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoY2hhciwgYWZ0ZXJjaGFybmV3TGluZSA9IGZhbHNlLCBsaW5lID0gMCkge1xyXG4gICAgdmFyIGNvdW50ID0gY2hhci50cmltKCkubGVuZ3RoO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHRleHQudHJpbSgpO1xyXG4gICAgdmFyIGJlZm9yZXNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0Q29sdW1uIC0gY291bnQsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkxpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbiAtIHRleHQubGVuZ3RoKTtcclxuXHJcbiAgICB2YXIgYWZ0ZXJzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uTGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uICsgY291bnQpO1xyXG5cclxuICAgIHZhciBzdGFydGNoYXIgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2UoYmVmb3Jlc2VsZWN0aW9uKTtcclxuICAgIHZhciBlbmRjaGFyID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKGFmdGVyc2VsZWN0aW9uKTtcclxuXHJcblxyXG5cclxuICAgIGlmIChzdGFydGNoYXIgPT0gY2hhciAmJiBlbmRjaGFyID09IGNoYXIpIHtcclxuXHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBhZnRlcnNlbGVjdGlvbiwgdGV4dDogJycgfV0pO1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKCcnLCBbeyByYW5nZTogYmVmb3Jlc2VsZWN0aW9uLCB0ZXh0OiAnJyB9XSk7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRleHQgPSBgJHthZnRlcmNoYXJuZXdMaW5lID09IHRydWUgPyAnXFxuJyA6ICcnfSR7Y2hhcn0ke2FmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/ICdcXG4nIDogJyd9JHt0ZXh0fSR7YWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gJ1xcbicgOiAnJ30ke2NoYXJ9YDtcclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cygnJywgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogdGV4dCB9XSk7XHJcblxyXG4gICAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0U2VsZWN0aW9uKHtcclxuICAgICAgICBzdGFydENvbHVtbjogc2VsZWN0aW9uLnN0YXJ0Q29sdW1uICsgKGxpbmUgPT0gMCA/IGNvdW50IDogMCksXHJcbiAgICAgICAgZW5kQ29sdW1uOiBzZWxlY3Rpb24uZW5kQ29sdW1uICsgKGxpbmUgPT0gMCA/IGNvdW50IDogMCksXHJcbiAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiBzZWxlY3Rpb24uc3RhcnRMaW5lTnVtYmVyICsgbGluZSxcclxuICAgICAgICBlbmRMaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlciArIGxpbmVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcbiAgbGlua0Jhc2VkSW5zZXJ0VGV4dCh0eXBlKSB7XHJcbiAgICB2YXIgY291bnQgPSB0eXBlID09IFwiaW1hZ2VcIiA/IDQgOiAzO1xyXG4gICAgdmFyIGV4dHJhY2hhciA9IHR5cGUgPT0gXCJpbWFnZVwiID8gXCIhXCIgOiBcIlwiO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHZhciBuZXdUZXh0ID0gYCR7ZXh0cmFjaGFyfVske3RleHR9XSgpYDtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IG5ld1RleHQgfV0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldFBvc2l0aW9uKHtcclxuICAgICAgbGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIsXHJcbiAgICAgIGNvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIGNvdW50XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuICBsaXN0QmFzZWRJbnNlcnRUZXh0KHR5cGUsIGZpbGwgPSBmYWxzZSkge1xyXG4gICAgdmFyIGV4dHJhID0gdHlwZSA9PSAndG9kbycgPyBmaWxsID09IHRydWUgPyAnW3hdJyA6ICdbIF0nIDogJyc7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmJhc2VFZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICB2YXIgdGV4dCA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShzZWxlY3Rpb24pO1xyXG4gICAgdmFyIG5ld1RleHQgPSBgXFxuIC0gJHtleHRyYX0gJHt0ZXh0fSBgO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cygnJywgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogbmV3VGV4dCB9XSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0UG9zaXRpb24oe1xyXG4gICAgICBsaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlciArIDEsXHJcbiAgICAgIGNvbHVtbjogdHlwZSA9PSAndG9kbycgPyA4IDogNFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGluc2VydENvbnRlbnQodHlwZSkge1xyXG5cclxuXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnYm9sZCc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiKipcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2l0YWxpYyc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiKlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc3RyaWtldGhyb3VnaCc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwifn5cIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xpbmsnOlxyXG4gICAgICAgIHRoaXMubGlua0Jhc2VkSW5zZXJ0VGV4dChcImxpbmtcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2ltYWdlJzpcclxuICAgICAgICB0aGlzLmxpbmtCYXNlZEluc2VydFRleHQoXCJpbWFnZVwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY29kZSc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KCdgYGAnLCB0cnVlLCArMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2lubGluZS1jb2RlJzpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoJ2AnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndW5kbyc6XHJcbiAgICAgICAgdGhpcy5iYXNlRWRpdG9yLnRyaWdnZXIoXCJcIiwgXCJ1bmRvXCIsIFwiXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyZWRvJzpcclxuICAgICAgICB0aGlzLmJhc2VFZGl0b3IudHJpZ2dlcignJywgJ3JlZG8nLCAnJyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xpc3QnOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dCgnbGluaycpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b2RvLXgnOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dCgndG9kbycsIHRydWUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b2RvLW8nOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dCgndG9kbycsIGZhbHNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUmVzaXplZChldmVudDogUmVzaXplZEV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IubGF5b3V0KCk7XHJcbiAgICB0aGlzLnJlc2l6ZUxheW91dCgpO1xyXG4gICB9XHJcbiAgcmVzaXplTGF5b3V0KCl7XHJcbiAgICB2YXIgd2l0ZGggPSB0aGlzLnJlc2l6ZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSAod2l0ZGgvMikrXCJweFwiO1xyXG4gICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gKHdpdGRoIC8gMikgKyBcInB4XCJcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBPdXRwdXQsIFJlbmRlcmVyMiwgU2VjdXJpdHlDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgbWFya2VkIGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgaGxqcyBmcm9tIFwiaGlnaGxpZ2h0LmpzXCI7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCBlbW9qaSBmcm9tICdub2RlLWVtb2ppJ1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXJrZG93bl0nXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBzZXQgbWFya2Rvd250ZXh0KHYpIHtcbiAgICBpZiAodiAhPSBudWxsICYmIHYgIT0gdGhpcy5fY29udGVudCkge1xuICAgICAgdGhpcy5fY29udGVudCA9IHY7XG4gICAgICB0aGlzLnJlbmRlck1hcmtkb3duKHRoaXMuX2NvbnRlbnQpO1xuICAgIH1cbiAgfVxuICBAT3V0cHV0KCkgZ2V0IGh0bWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2VkQ29udGVudDtcbiAgfVxuICBfY29udGVudDtcbiAgbWFya2VkQ29udGVudDogc3RyaW5nO1xuICByZW5kZXJlciA9IG5ldyBtYXJrZWQuUmVuZGVyZXIoKTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgc2FuaXRpemU6IERvbVNhbml0aXplciwgcHJpdmF0ZSByZW5kZXIyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLm1hcmtlZFJlbmRlcmVyKCk7XG4gICAgdGhpcy5yZW5kZXJNYXJrZG93bihcIlwiKTtcbiAgfVxuXG5cbiAgcmVuZGVyTWFya2Rvd24odGV4dCkge1xuICAgIGNvbnN0IHJlcGxhY2VyID0gKG1hdGNoKSA9PiBlbW9qaS5lbW9qaWZ5KG1hdGNoKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oOi4qOikvZywgcmVwbGFjZXIpO1xuXG4gICAgdGhpcy5tYXJrZWRDb250ZW50ID0gbWFya2VkKHRleHQpO1xuXG4gICAgdGhpcy5tYXJrZWRDb250ZW50ID0gdGhpcy5zYW5pdGl6ZS5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLm1hcmtlZENvbnRlbnQpIGFzIHN0cmluZ1xuXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuc2FuaXRpemUuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LkhUTUwsIHRoaXMubWFya2VkQ29udGVudCk7XG5cbiAgfVxuXG4gIG1hcmtlZFJlbmRlcmVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0gPSAodGV4dDogYW55KSA9PiB7XG4gICAgICBpZiAoL15cXHMqXFxbW3ggXVxcXVxccyovLnRlc3QodGV4dCkpIHtcbiAgICAgICAgdGV4dCA9IHRleHRcbiAgICAgICAgICAucmVwbGFjZSgvXlxccypcXFsgXFxdXFxzKi8sICc8aSBjbGFzcz1cImZhIGZhLXNxdWFyZS1vXCIgc3R5bGU9XCJtYXJnaW46IDAgMC4yZW0gMC4yNWVtIC0xLjZlbTtcIj48L2k+ICcpXG4gICAgICAgICAgLnJlcGxhY2UoL15cXHMqXFxbeFxcXVxccyovLCAnPGkgY2xhc3M9XCJmYSBmYS1jaGVjay1zcXVhcmVcIiBzdHlsZT1cIm1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtO1wiPjwvaT4gJyk7XG4gICAgICAgIHJldHVybiBgPGxpIHN0eWxlPVwibGlzdC1zdHlsZTogbm9uZTtcIj4ke3RleHR9PC9saT5gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGA8bGk+JHt0ZXh0fTwvbGk+YDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMucmVuZGVyZXIudGFibGUgPSAoaGVhZGVyOiBzdHJpbmcsIGJvZHk6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZFwiPlxcbjx0aGVhZD5cXG4ke2hlYWRlcn08L3RoZWFkPlxcbjx0Ym9keT5cXG4ke2JvZHl9PC90Ym9keT5cXG48L3RhYmxlPlxcbmA7XG4gICAgfTtcblxuICAgIG1hcmtlZC5zZXRPcHRpb25zKHtcbiAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGhsanMuaGlnaGxpZ2h0QXV0byhjb2RlKS52YWx1ZTtcbiAgICAgIH0sXG4gICAgICByZW5kZXJlcjogdGhpcy5yZW5kZXJlcixcbiAgICAgIHRhYmxlczogdHJ1ZSxcbiAgICAgIHNhbml0aXplOiBmYWxzZSxcbiAgICAgIHNtYXJ0TGlzdHM6IHRydWUsXG5cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFlLRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi95a2VkaXRvci95a2VkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFya2Rvd25EaXJlY3RpdmUgfSBmcm9tICcuL21hcmtkb3duLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBBbmd1bGFyUmVzaXplZEV2ZW50TW9kdWxlIH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBBbmd1bGFyUmVzaXplZEV2ZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWyBZS0VkaXRvckNvbXBvbmVudCwgTWFya2Rvd25EaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbWUtFZGl0b3JDb21wb25lbnQsTWFya2Rvd25EaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIFlrRWRpdG9yTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsImVkaXRvciIsImxhbmd1YWdlcyIsIlNlbGVjdGlvbiIsIkNvbXBvbmVudCIsIklucHV0IiwiT3V0cHV0IiwiVmlld0NoaWxkIiwiU2VjdXJpdHlDb250ZXh0IiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIkRvbVNhbml0aXplciIsIlJlbmRlcmVyMiIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQW5ndWxhclJlc2l6ZWRFdmVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtRQXdFRTtpQ0FwRDBCLElBQUlBLGlCQUFZLEVBQUU7NEJBRWpDLEVBQUU7K0JBUVMsT0FBTztnQ0FFZCxLQUFLO3lCQUVILElBQUk7MEJBeUNQO2dCQUVaLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO2dCQUMzQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLFNBQVM7Z0JBQ3BDLG9CQUFvQixFQUFFLEtBQUs7Z0JBQzNCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFdBQVcsRUFBRSxLQUFLO2FBQ25CO1NBWEE7UUE5REQsc0JBQWEsc0NBQU87OztnQkFBcEI7Z0JBQ0Us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