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
            };
        YKEditorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'yk-editor',
                        template: "<div (resized)=\"onResized($event)\" class=\"main-container\" #mainContainer>\n  <div class=\"toolbar\">\n    <div>\n      <button (click)=\"insertContent('undo')\">\n        <i class=\"fa fa-undo\"></i>\n      </button>\n      <button (click)=\"insertContent('redo')\">\n        <i class=\"fa fa-repeat\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('bold')\">\n        <i class=\"fa fa-bold\"></i>\n      </button>\n      <button (click)=\"insertContent('italic')\">\n        <i class=\"fa fa-italic\"></i>\n      </button>\n\n      <button (click)=\"insertContent('strikethrough')\">\n        <i class=\"fa fa-strikethrough\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('link')\">\n        <i class=\"fa fa-link\"></i>\n      </button>\n      <button (click)=\"insertContent('image')\">\n        <i class=\"fa fa-picture-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('code')\">\n        <i class=\"fa fa-code\"></i>\n      </button>\n      <button (click)=\"insertContent('inline-code')\">\n        <i class=\"fa fa-terminal\"></i>\n      </button>\n      <button (click)=\"insertContent('list')\">\n        <i class=\"fa fa-list-ul\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-x')\">\n        <i class=\"fa fa-check-square-o\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-o')\">\n        <i class=\"fa fa-square-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"changeTheme()\">\n        <i class=\"fa\" [ngClass]=\"{'fa-moon-o': theme, 'fa-sun-o': !theme}\"></i>\n      </button>\n      <button (click)=\"changeLayout('fullscreen')\">\n        <i class=\"fa fa-arrows-alt\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button (click)=\"changeLayout('edit')\" [ngClass]=\"{'active': displayMode == 'edit'}\">\n        <i class=\"fa fa-pencil-square-o\"></i>\n      </button>\n      <button (click)=\"changeLayout('split')\" [ngClass]=\" {'active': displayMode=='split' }\">\n        <i class=\"fa fa-columns\"></i>\n      </button>\n      <button (click)=\"changeLayout('preview')\" [ngClass]=\"{'active': displayMode == 'preview'}\">\n        <i class=\"fa fa-eye\"></i>\n      </button>\n    </div>\n\n  </div>\n  <div (resized)=\"onResized($event)\" class=\"editor-container\">\n    <div (resized)=\"onResized($event)\" class=\"editor\" #editorContainer>\n      <div class=\"monaco-editor\" #editorhost></div>\n    </div>\n    <div (resized)=\"onResized($event)\" class=\"preview\" #previewContainer [ngClass]=\"{'light': theme, 'dark':!theme}\">\n      <div markdown [markdowntext]=\"content\" class=\"rendered-markdown\"></div>\n    </div>\n  </div>\n</div>\n",
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
            mainContainer: [{ type: core.ViewChild, args: ['mainContainer',] }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWstZWRpdG9yLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8veWstZWRpdG9yL2xpYi95a2VkaXRvci95a2VkaXRvci5jb21wb25lbnQudHMiLCJuZzovL3lrLWVkaXRvci9saWIvbWFya2Rvd24uZGlyZWN0aXZlLnRzIiwibmc6Ly95ay1lZGl0b3IvbGliL3lrLWVkaXRvci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVkaXRvciwgU2VsZWN0aW9uLCBsYW5ndWFnZXN9IGZyb20gJ21vbmFjby1lZGl0b3InO1xyXG5pbXBvcnQgZW1vamkgZnJvbSAnbm9kZS1lbW9qaSdcclxuaW1wb3J0IHsgUmVzaXplZEV2ZW50IH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQvcmVzaXplZC1ldmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3lrLWVkaXRvcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3lrZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi95a2VkaXRvci5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFlLRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcblxyXG4gIEBJbnB1dCgpIGdldCBjb250ZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBzZXQgY29udGVudCh2KSB7XHJcbiAgICB0aGlzLl9jb250ZW50ID0gdjtcclxuICAgIHRoaXMuY29udGVudENoYW5nZS5lbWl0KHYpO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIGNvbnRlbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIF9jb250ZW50ID0gXCJcIjtcclxuICBAVmlld0NoaWxkKFwiZWRpdG9yaG9zdFwiKSBob3N0OiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJlZGl0b3JDb250YWluZXJcIikgZWRpdG9yQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwcmV2aWV3Q29udGFpbmVyXCIpIHByZXZpZXdDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbWFpbkNvbnRhaW5lcicpIG1haW5Db250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgYmFzZUVkaXRvcjogYW55O1xyXG5cclxuICBkaXNwbGF5TW9kZTogc3RyaW5nID0gXCJzcGxpdFwiO1xyXG5cclxuICBpc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgdGhlbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjaGFuZ2VUaGVtZSgpIHtcclxuICAgIHRoaXMudGhlbWUgPSAhdGhpcy50aGVtZTtcclxuICAgIHRoaXMudGhlbWUgPT0gdHJ1ZSA/IGVkaXRvci5zZXRUaGVtZShcInZzXCIpIDogZWRpdG9yLnNldFRoZW1lKFwidnMtZGFya1wiKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUxheW91dCh0eXBlKSB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5TW9kZSAhPSB0eXBlIHx8IHR5cGUgPT0gXCJmdWxsc2NyZWVuXCIpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5TW9kZSA9IHR5cGU7XHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2VkaXQnOlxyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5IDogbm9uZVwiKTtcclxuICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJtaW4td2lkdGggOiAxMDAlO21heC13aWR0aCA6IDEwMCVcIik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdwcmV2aWV3JzpcclxuICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5IDogbm9uZVwiKTtcclxuICAgICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWluLXdpZHRoIDogMTAwJTttYXgtd2lkdGggOiAxMDAlXCIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc3BsaXQnOlxyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZnVsbHNjcmVlbic6XHJcblxyXG4gICAgICAgICAgdGhpcy5pc0Z1bGxTY3JlZW4gPSAhdGhpcy5pc0Z1bGxTY3JlZW47XHJcbiAgICAgICAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4gPT0gdHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwicG9zaXRpb246IGZpeGVkO3RvcDogMHB4O2xlZnQ6IDA7Ym90dG9tOiAwO3JpZ2h0OiAwO3dpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtcIik7XHJcbiAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcIlwiKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5sYXlvdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIFxyXG5cclxuICB9XHJcblxyXG4gIGNvbmZpZzogYW55ID0ge1xyXG5cclxuICAgIGxhbmd1YWdlOiBcIm1hcmtkb3duXCIsXHJcbiAgICBtaW5pbWFwOiB7IGVuYWJsZWQ6IGZhbHNlIH0sXHJcbiAgICBsaW5lTnVtYmVyczogXCJvZmZcIixcclxuICAgIHRoZW1lOiB0aGlzLnRoZW1lID8gJ3ZzJyA6ICd2cy1kYXJrJyxcclxuICAgIHNjcm9sbEJleW9uZExhc3RMaW5lOiBmYWxzZSxcclxuICAgIHdvcmRXcmFwOiAnb24nLFxyXG4gICAgZ2x5cGhNYXJnaW46IGZhbHNlXHJcbiAgfVxyXG5cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IgPSBlZGl0b3IuY3JlYXRlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCB0aGlzLmNvbmZpZyk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0TW9kZWwoZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMuY29udGVudCwgJ21hcmtkb3duJykpO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLm9uRGlkQ2hhbmdlTW9kZWxDb250ZW50KChlKSA9PiB7XHJcbiAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuYmFzZUVkaXRvci5nZXRWYWx1ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgZW1vamlsaXN0ID0gW107XHJcbiAgICBmb3IgKHZhciBrIGluIGVtb2ppLmVtb2ppKSB7IGVtb2ppbGlzdC5wdXNoKHsgbGFiZWw6IGsgKyBcIiBcIiArIGVtb2ppLmVtb2ppW2tdLCBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uLCBpbnNlcnRUZXh0OiBrICsgXCI6XCIgfSkgfVxyXG5cclxuICAgIGxhbmd1YWdlcy5yZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIoJ21hcmtkb3duJywge1xyXG4gICAgICBwcm92aWRlQ29tcGxldGlvbkl0ZW1zOiBmdW5jdGlvbiAobW9kZWwsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRleHRVbnRpbFBvc2l0aW9uID0gbW9kZWwuZ2V0VmFsdWVJblJhbmdlKHsgc3RhcnRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLCBzdGFydENvbHVtbjogcG9zaXRpb24uY29sdW1uIC0gMSwgZW5kTGluZU51bWJlcjogcG9zaXRpb24ubGluZU51bWJlciwgZW5kQ29sdW1uOiBwb3NpdGlvbi5jb2x1bW4gfSk7XHJcbiAgICAgICAgaWYgKHRleHRVbnRpbFBvc2l0aW9uID09PSAnOicpIHsgcmV0dXJuIGVtb2ppbGlzdDsgfSByZXR1cm4gW107XHJcbiAgICAgIH0sXHJcbiAgICAgIHRyaWdnZXJDaGFyYWN0ZXJzOiBbJzonXVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGFuZ3VhZ2VzLnNldExhbmd1YWdlQ29uZmlndXJhdGlvbignbWFya2Rvd24nLCB7XHJcbiAgICAgIG9uRW50ZXJSdWxlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJlZm9yZVRleHQ6IC9eWy1dXFxzKC4qKS8sXHJcbiAgICAgICAgICBhY3Rpb246IHsgYXBwZW5kVGV4dDogJy0gJywgaW5kZW50QWN0aW9uOiBsYW5ndWFnZXMuSW5kZW50QWN0aW9uLk5vbmUgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgbGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcignbWFya2Rvd24nLCB7XHJcbiAgICAgIHByb3ZpZGVDb21wbGV0aW9uSXRlbXM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2gxJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjICR7MTp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdoMicsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2gzJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2g0JyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyMjICR7MTp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdoNScsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnIyMjIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2g2JyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyMjIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2NvZGUnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLlNuaXBwZXQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogW1xyXG4gICAgICAgICAgICAgICAgJ2BgYCcsXHJcbiAgICAgICAgICAgICAgICAnJHsxOmNvZGV9JyxcclxuICAgICAgICAgICAgICAgICdgYGAnLFxyXG5cclxuICAgICAgICAgICAgICBdLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRvY3VtZW50YXRpb246ICdJZi1FbHNlIFN0YXRlbWVudCdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnbGluaycsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnWyR7MTpsaW5rVGV4dH1dKCR7Mjp1cmx9KSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdpbWFnZScsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnIVskezE6YWx0VGV4dH1dKCR7Mjp1cmx9KSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdsaW5rcmVmZXJhbmNlJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdbJHsxOm5hbWV9XTogJHsyOmxpbmt9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2xpc3QnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1xcbiAtICR7MTp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICd0b2RvIHVuIGNoZWNrJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdcXG4gLSBbIF0gJHsyOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICd0b2RvIGNoZWNrJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdcXG4gLSBbeF0gJHsyOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmJhc2VFZGl0b3IudXBkYXRlT3B0aW9ucyh7XHJcbiAgICAgIGdseXBoTWFyZ2luIDogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBjaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KGNoYXIsIGFmdGVyY2hhcm5ld0xpbmUgPSBmYWxzZSwgbGluZSA9IDApIHtcclxuICAgIHZhciBjb3VudCA9IGNoYXIudHJpbSgpLmxlbmd0aDtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB0ZXh0LnRyaW0oKTtcclxuICAgIHZhciBiZWZvcmVzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydENvbHVtbiAtIGNvdW50LFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25MaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25Db2x1bW4gLSB0ZXh0Lmxlbmd0aCk7XHJcblxyXG4gICAgdmFyIGFmdGVyc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25Db2x1bW4sXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkxpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbiArIGNvdW50KTtcclxuXHJcbiAgICB2YXIgc3RhcnRjaGFyID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKGJlZm9yZXNlbGVjdGlvbik7XHJcbiAgICB2YXIgZW5kY2hhciA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShhZnRlcnNlbGVjdGlvbik7XHJcblxyXG5cclxuXHJcbiAgICBpZiAoc3RhcnRjaGFyID09IGNoYXIgJiYgZW5kY2hhciA9PSBjaGFyKSB7XHJcblxyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKCcnLCBbeyByYW5nZTogYWZ0ZXJzZWxlY3Rpb24sIHRleHQ6ICcnIH1dKTtcclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cygnJywgW3sgcmFuZ2U6IGJlZm9yZXNlbGVjdGlvbiwgdGV4dDogJycgfV0pO1xyXG5cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0ZXh0ID0gYCR7YWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gJ1xcbicgOiAnJ30ke2NoYXJ9JHthZnRlcmNoYXJuZXdMaW5lID09IHRydWUgPyAnXFxuJyA6ICcnfSR7dGV4dH0ke2FmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/ICdcXG4nIDogJyd9JHtjaGFyfWA7XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IHRleHQgfV0pO1xyXG5cclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLnNldFNlbGVjdGlvbih7XHJcbiAgICAgICAgc3RhcnRDb2x1bW46IHNlbGVjdGlvbi5zdGFydENvbHVtbiArIChsaW5lID09IDAgPyBjb3VudCA6IDApLFxyXG4gICAgICAgIGVuZENvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIChsaW5lID09IDAgPyBjb3VudCA6IDApLFxyXG4gICAgICAgIHN0YXJ0TGluZU51bWJlcjogc2VsZWN0aW9uLnN0YXJ0TGluZU51bWJlciArIGxpbmUsXHJcbiAgICAgICAgZW5kTGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIgKyBsaW5lXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmZvY3VzKCk7XHJcbiAgfVxyXG4gIGxpbmtCYXNlZEluc2VydFRleHQodHlwZSkge1xyXG4gICAgdmFyIGNvdW50ID0gdHlwZSA9PSBcImltYWdlXCIgPyA0IDogMztcclxuICAgIHZhciBleHRyYWNoYXIgPSB0eXBlID09IFwiaW1hZ2VcIiA/IFwiIVwiIDogXCJcIjtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB2YXIgbmV3VGV4dCA9IGAke2V4dHJhY2hhcn1bJHt0ZXh0fV0oKWA7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKCcnLCBbeyByYW5nZTogc2VsZWN0aW9uLCB0ZXh0OiBuZXdUZXh0IH1dKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRQb3NpdGlvbih7XHJcbiAgICAgIGxpbmVOdW1iZXI6IHNlbGVjdGlvbi5lbmRMaW5lTnVtYmVyLFxyXG4gICAgICBjb2x1bW46IHNlbGVjdGlvbi5lbmRDb2x1bW4gKyBjb3VudFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcbiAgbGlzdEJhc2VkSW5zZXJ0VGV4dCh0eXBlLCBmaWxsID0gZmFsc2UpIHtcclxuICAgIHZhciBleHRyYSA9IHR5cGUgPT0gJ3RvZG8nID8gZmlsbCA9PSB0cnVlID8gJ1t4XScgOiAnWyBdJyA6ICcnO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHZhciBuZXdUZXh0ID0gYFxcbiAtICR7ZXh0cmF9ICR7dGV4dH0gYDtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IG5ld1RleHQgfV0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldFBvc2l0aW9uKHtcclxuICAgICAgbGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIgKyAxLFxyXG4gICAgICBjb2x1bW46IHR5cGUgPT0gJ3RvZG8nID8gOCA6IDRcclxuICAgIH0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBpbnNlcnRDb250ZW50KHR5cGUpIHtcclxuXHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2JvbGQnOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIioqXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdpdGFsaWMnOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIipcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3N0cmlrZXRocm91Z2gnOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIn5+XCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsaW5rJzpcclxuICAgICAgICB0aGlzLmxpbmtCYXNlZEluc2VydFRleHQoXCJsaW5rXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdpbWFnZSc6XHJcbiAgICAgICAgdGhpcy5saW5rQmFzZWRJbnNlcnRUZXh0KFwiaW1hZ2VcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NvZGUnOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dCgnYGBgJywgdHJ1ZSwgKzEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdpbmxpbmUtY29kZSc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KCdgJyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3VuZG8nOlxyXG4gICAgICAgIHRoaXMuYmFzZUVkaXRvci50cmlnZ2VyKFwiXCIsIFwidW5kb1wiLCBcIlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncmVkbyc6XHJcbiAgICAgICAgdGhpcy5iYXNlRWRpdG9yLnRyaWdnZXIoJycsICdyZWRvJywgJycpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsaXN0JzpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoJ2xpbmsnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndG9kby14JzpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoJ3RvZG8nLCB0cnVlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndG9kby1vJzpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoJ3RvZG8nLCBmYWxzZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJlc2l6ZWQoZXZlbnQ6IFJlc2l6ZWRFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmxheW91dCgpO1xyXG4gICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgT3V0cHV0LCBSZW5kZXJlcjIsIFNlY3VyaXR5Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IG1hcmtlZCBmcm9tICdtYXJrZWQnO1xuaW1wb3J0IGhsanMgZnJvbSBcImhpZ2hsaWdodC5qc1wiO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgZW1vamkgZnJvbSAnbm9kZS1lbW9qaSdcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWFya2Rvd25dJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXJrZG93bkRpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgc2V0IG1hcmtkb3dudGV4dCh2KSB7XG4gICAgaWYgKHYgIT0gbnVsbCAmJiB2ICE9IHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgIHRoaXMuX2NvbnRlbnQgPSB2O1xuICAgICAgdGhpcy5yZW5kZXJNYXJrZG93bih0aGlzLl9jb250ZW50KTtcbiAgICB9XG4gIH1cbiAgQE91dHB1dCgpIGdldCBodG1sKCkge1xuICAgIHJldHVybiB0aGlzLm1hcmtlZENvbnRlbnQ7XG4gIH1cbiAgX2NvbnRlbnQ7XG4gIG1hcmtlZENvbnRlbnQ6IHN0cmluZztcbiAgcmVuZGVyZXIgPSBuZXcgbWFya2VkLlJlbmRlcmVyKCk7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHNhbml0aXplOiBEb21TYW5pdGl6ZXIsIHByaXZhdGUgcmVuZGVyMjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5tYXJrZWRSZW5kZXJlcigpO1xuICAgIHRoaXMucmVuZGVyTWFya2Rvd24oXCJcIik7XG4gIH1cblxuXG4gIHJlbmRlck1hcmtkb3duKHRleHQpIHtcbiAgICBjb25zdCByZXBsYWNlciA9IChtYXRjaCkgPT4gZW1vamkuZW1vamlmeShtYXRjaCk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvKDouKjopL2csIHJlcGxhY2VyKTtcblxuICAgIHRoaXMubWFya2VkQ29udGVudCA9IG1hcmtlZCh0ZXh0KTtcblxuICAgIHRoaXMubWFya2VkQ29udGVudCA9IHRoaXMuc2FuaXRpemUuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGhpcy5tYXJrZWRDb250ZW50KSBhcyBzdHJpbmdcblxuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLnNhbml0aXplLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5IVE1MLCB0aGlzLm1hcmtlZENvbnRlbnQpO1xuXG4gIH1cblxuICBtYXJrZWRSZW5kZXJlcigpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtID0gKHRleHQ6IGFueSkgPT4ge1xuICAgICAgaWYgKC9eXFxzKlxcW1t4IF1cXF1cXHMqLy50ZXN0KHRleHQpKSB7XG4gICAgICAgIHRleHQgPSB0ZXh0XG4gICAgICAgICAgLnJlcGxhY2UoL15cXHMqXFxbIFxcXVxccyovLCAnPGkgY2xhc3M9XCJmYSBmYS1zcXVhcmUtb1wiIHN0eWxlPVwibWFyZ2luOiAwIDAuMmVtIDAuMjVlbSAtMS42ZW07XCI+PC9pPiAnKVxuICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKlxcW3hcXF1cXHMqLywgJzxpIGNsYXNzPVwiZmEgZmEtY2hlY2stc3F1YXJlXCIgc3R5bGU9XCJtYXJnaW46IDAgMC4yZW0gMC4yNWVtIC0xLjZlbTtcIj48L2k+ICcpO1xuICAgICAgICByZXR1cm4gYDxsaSBzdHlsZT1cImxpc3Qtc3R5bGU6IG5vbmU7XCI+JHt0ZXh0fTwvbGk+YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgPGxpPiR7dGV4dH08L2xpPmA7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnJlbmRlcmVyLnRhYmxlID0gKGhlYWRlcjogc3RyaW5nLCBib2R5OiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWRcIj5cXG48dGhlYWQ+XFxuJHtoZWFkZXJ9PC90aGVhZD5cXG48dGJvZHk+XFxuJHtib2R5fTwvdGJvZHk+XFxuPC90YWJsZT5cXG5gO1xuICAgIH07XG5cbiAgICBtYXJrZWQuc2V0T3B0aW9ucyh7XG4gICAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICAgIHJldHVybiBobGpzLmhpZ2hsaWdodEF1dG8oY29kZSkudmFsdWU7XG4gICAgICB9LFxuICAgICAgcmVuZGVyZXI6IHRoaXMucmVuZGVyZXIsXG4gICAgICB0YWJsZXM6IHRydWUsXG4gICAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgICBzbWFydExpc3RzOiB0cnVlLFxuXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBZS0VkaXRvckNvbXBvbmVudCB9IGZyb20gJy4veWtlZGl0b3IveWtlZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtkb3duRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXJrZG93bi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgQW5ndWxhclJlc2l6ZWRFdmVudE1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItcmVzaXplLWV2ZW50JztcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQW5ndWxhclJlc2l6ZWRFdmVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsgWUtFZGl0b3JDb21wb25lbnQsIE1hcmtkb3duRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1lLRWRpdG9yQ29tcG9uZW50LE1hcmtkb3duRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBZa0VkaXRvck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJlZGl0b3IiLCJsYW5ndWFnZXMiLCJTZWxlY3Rpb24iLCJDb21wb25lbnQiLCJJbnB1dCIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIlNlY3VyaXR5Q29udGV4dCIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJEb21TYW5pdGl6ZXIiLCJSZW5kZXJlcjIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkFuZ3VsYXJSZXNpemVkRXZlbnRNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7UUF3RUU7aUNBbEQwQixJQUFJQSxpQkFBWSxFQUFFOzRCQUVqQyxFQUFFOytCQU9TLE9BQU87Z0NBRWQsS0FBSzt5QkFFSCxJQUFJOzBCQTBDUDtnQkFFWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtnQkFDM0IsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxTQUFTO2dCQUNwQyxvQkFBb0IsRUFBRSxLQUFLO2dCQUMzQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxXQUFXLEVBQUUsS0FBSzthQUNuQjtTQVhBO1FBOURELHNCQUFhLHNDQUFPOzs7Z0JBQXBCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN0Qjs7OztnQkFFRCxVQUFZLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVCOzs7V0FMQTs7OztRQXNCRCx1Q0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHQyxtQkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBR0EsbUJBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDekU7Ozs7O1FBRUQsd0NBQVk7Ozs7WUFBWixVQUFhLElBQUk7Z0JBQ2YsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksWUFBWSxFQUFFO29CQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFH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