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
    function YKEditorComponent() {
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
        this.baseEditor = editor.create(this.host.nativeElement, this.config);
        this.baseEditor.setModel(editor.createModel(this.content, 'markdown'));
        this.baseEditor.onDidChangeModelContent(function (e) {
            _this.content = _this.baseEditor.getValue();
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
            provideCompletionItems: function () {
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
        if (fill === void 0) { fill = false; }
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
        { type: Component, args: [{
                    selector: 'yk-editor',
                    template: "<div (resized)=\"onResized($event)\" class=\"main-container\" #mainContainer>\n  <div class=\"toolbar\">\n    <div>\n      <button (click)=\"insertContent('undo')\">\n        <i class=\"yi undo\"></i>\n      </button>\n      <button (click)=\"insertContent('redo')\">\n        <i class=\"yi repeat\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('bold')\">\n        <i class=\"yi bold\"></i>\n      </button>\n      <button (click)=\"insertContent('italic')\">\n        <i class=\"yi italic\"></i>\n      </button>\n\n      <button (click)=\"insertContent('strikethrough')\">\n        <i class=\"yi strikethrough\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('link')\">\n        <i class=\"yi link\"></i>\n      </button>\n      <button (click)=\"insertContent('image')\">\n        <i class=\"yi picture-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('code')\">\n        <i class=\"yi code\"></i>\n      </button>\n      <button (click)=\"insertContent('inline-code')\">\n        <i class=\"yi terminal\"></i>\n      </button>\n      <button (click)=\"insertContent('list')\">\n        <i class=\"yi list-ul\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-x')\">\n        <i class=\"yi check-square-o\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-o')\">\n        <i class=\"yi square-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"changeTheme()\">\n        <i class=\"yi\" [ngClass]=\"{'moon-o': theme, 'sun-o': !theme}\"></i>\n      </button>\n      <button (click)=\"changeLayout('fullscreen')\">\n        <i class=\"yi arrows-alt\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button (click)=\"changeLayout('edit')\" [ngClass]=\"{'active': displayMode == 'edit'}\">\n        <i class=\"yi pencil-square-o\"></i>\n      </button>\n      <button (click)=\"changeLayout('split')\" [ngClass]=\" {'active': displayMode=='split' }\">\n        <i class=\"yi columns\"></i>\n      </button>\n      <button (click)=\"changeLayout('preview')\" [ngClass]=\"{'active': displayMode == 'preview'}\">\n        <i class=\"yi eye\"></i>\n      </button>\n    </div>\n\n  </div>\n  <div (resized)=\"onResized($event)\" #resizeContainer class=\"editor-container\">\n    <div (resized)=\"onResized($event)\" class=\"editor\" #editorContainer>\n      <div class=\"monaco-editor\" #editorhost></div>\n    </div>\n    <div (resized)=\"onResized($event)\" class=\"preview\" #previewContainer [ngClass]=\"{'light': theme, 'dark':!theme}\">\n      <div markdown [markdowntext]=\"content\" class=\"rendered-markdown\"></div>\n    </div>\n  </div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    YKEditorComponent.ctorParameters = function () { return []; };
    YKEditorComponent.propDecorators = {
        content: [{ type: Input }],
        contentChange: [{ type: Output }],
        host: [{ type: ViewChild, args: ["editorhost",] }],
        editorContainer: [{ type: ViewChild, args: ["editorContainer",] }],
        previewContainer: [{ type: ViewChild, args: ["previewContainer",] }],
        mainContainer: [{ type: ViewChild, args: ['mainContainer',] }],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWstZWRpdG9yLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly95ay1lZGl0b3IvbGliL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudC50cyIsIm5nOi8veWstZWRpdG9yL2xpYi9tYXJrZG93bi5kaXJlY3RpdmUudHMiLCJuZzovL3lrLWVkaXRvci9saWIveWstZWRpdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZWRpdG9yLCBTZWxlY3Rpb24sIGxhbmd1YWdlc30gZnJvbSAnbW9uYWNvLWVkaXRvcic7XHJcbmltcG9ydCBlbW9qaSBmcm9tICdub2RlLWVtb2ppJ1xyXG5pbXBvcnQgeyBSZXNpemVkRXZlbnQgfSBmcm9tICdhbmd1bGFyLXJlc2l6ZS1ldmVudC9yZXNpemVkLWV2ZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAneWstZWRpdG9yJyxcclxuICB0ZW1wbGF0ZVVybDogJy4veWtlZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3lrZWRpdG9yLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgWUtFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIGdldCBjb250ZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBzZXQgY29udGVudCh2KSB7XHJcbiAgICB0aGlzLl9jb250ZW50ID0gdjtcclxuICAgIHRoaXMuY29udGVudENoYW5nZS5lbWl0KHYpO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIGNvbnRlbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIF9jb250ZW50ID0gXCJcIjtcclxuICBAVmlld0NoaWxkKFwiZWRpdG9yaG9zdFwiKSBob3N0OiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJlZGl0b3JDb250YWluZXJcIikgZWRpdG9yQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwcmV2aWV3Q29udGFpbmVyXCIpIHByZXZpZXdDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbWFpbkNvbnRhaW5lcicpIG1haW5Db250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInJlc2l6ZUNvbnRhaW5lclwiKSByZXNpemVDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgYmFzZUVkaXRvcjogYW55O1xyXG5cclxuICBkaXNwbGF5TW9kZTogc3RyaW5nID0gXCJzcGxpdFwiO1xyXG5cclxuICBpc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgdGhlbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjaGFuZ2VUaGVtZSgpIHtcclxuICAgIHRoaXMudGhlbWUgPSAhdGhpcy50aGVtZTtcclxuICAgIHRoaXMudGhlbWUgPT0gdHJ1ZSA/IGVkaXRvci5zZXRUaGVtZShcInZzXCIpIDogZWRpdG9yLnNldFRoZW1lKFwidnMtZGFya1wiKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUxheW91dCh0eXBlKSB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5TW9kZSAhPSB0eXBlIHx8IHR5cGUgPT0gXCJmdWxsc2NyZWVuXCIpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5TW9kZSA9IHR5cGU7XHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2VkaXQnOlxyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5IDogbm9uZVwiKTtcclxuICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJtaW4td2lkdGggOiAxMDAlO21heC13aWR0aCA6IDEwMCVcIik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdwcmV2aWV3JzpcclxuICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5IDogbm9uZVwiKTtcclxuICAgICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWluLXdpZHRoIDogMTAwJTttYXgtd2lkdGggOiAxMDAlXCIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc3BsaXQnOlxyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2Z1bGxzY3JlZW4nOlxyXG5cclxuICAgICAgICAgIHRoaXMuaXNGdWxsU2NyZWVuID0gIXRoaXMuaXNGdWxsU2NyZWVuO1xyXG4gICAgICAgICAgaWYgKHRoaXMuaXNGdWxsU2NyZWVuID09IHRydWUpXHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcInBvc2l0aW9uOiBmaXhlZDt0b3A6IDBweDtsZWZ0OiAwO2JvdHRvbTogMDtyaWdodDogMDt3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCIpO1xyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJcIik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IubGF5b3V0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICBjb25maWc6IGFueSA9IHtcclxuXHJcbiAgICBsYW5ndWFnZTogXCJtYXJrZG93blwiLFxyXG4gICAgbWluaW1hcDogeyBlbmFibGVkOiBmYWxzZSB9LFxyXG4gICAgbGluZU51bWJlcnM6IFwib2ZmXCIsXHJcbiAgICB0aGVtZTogdGhpcy50aGVtZSA/ICd2cycgOiAndnMtZGFyaycsXHJcbiAgICBzY3JvbGxCZXlvbmRMYXN0TGluZTogZmFsc2UsXHJcbiAgICB3b3JkV3JhcDogJ29uJyxcclxuICAgIGdseXBoTWFyZ2luOiBmYWxzZVxyXG4gIH1cclxuXHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yID0gZWRpdG9yLmNyZWF0ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgdGhpcy5jb25maWcpO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldE1vZGVsKGVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLmNvbnRlbnQsICdtYXJrZG93bicpKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5vbkRpZENoYW5nZU1vZGVsQ29udGVudCgoZSkgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0VmFsdWUoKTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGVtb2ppbGlzdCA9IFtdO1xyXG4gICAgZm9yICh2YXIgayBpbiBlbW9qaS5lbW9qaSkgeyBlbW9qaWxpc3QucHVzaCh7IGxhYmVsOiBrICsgXCIgXCIgKyBlbW9qaS5lbW9qaVtrXSwga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5GdW5jdGlvbiwgaW5zZXJ0VGV4dDogayArIFwiOlwiIH0pIH1cclxuXHJcbiAgICBsYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKCdtYXJrZG93bicsIHtcclxuICAgICAgcHJvdmlkZUNvbXBsZXRpb25JdGVtczogZnVuY3Rpb24gKG1vZGVsLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHZhciB0ZXh0VW50aWxQb3NpdGlvbiA9IG1vZGVsLmdldFZhbHVlSW5SYW5nZSh7IHN0YXJ0TGluZU51bWJlcjogcG9zaXRpb24ubGluZU51bWJlciwgc3RhcnRDb2x1bW46IHBvc2l0aW9uLmNvbHVtbiAtIDEsIGVuZExpbmVOdW1iZXI6IHBvc2l0aW9uLmxpbmVOdW1iZXIsIGVuZENvbHVtbjogcG9zaXRpb24uY29sdW1uIH0pO1xyXG4gICAgICAgIGlmICh0ZXh0VW50aWxQb3NpdGlvbiA9PT0gJzonKSB7IHJldHVybiBlbW9qaWxpc3Q7IH0gcmV0dXJuIFtdO1xyXG4gICAgICB9LFxyXG4gICAgICB0cmlnZ2VyQ2hhcmFjdGVyczogWyc6J11cclxuICAgIH0pO1xyXG5cclxuICAgIGxhbmd1YWdlcy5zZXRMYW5ndWFnZUNvbmZpZ3VyYXRpb24oJ21hcmtkb3duJywge1xyXG4gICAgICBvbkVudGVyUnVsZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBiZWZvcmVUZXh0OiAvXlstXVxccyguKikvLFxyXG4gICAgICAgICAgYWN0aW9uOiB7IGFwcGVuZFRleHQ6ICctICcsIGluZGVudEFjdGlvbjogbGFuZ3VhZ2VzLkluZGVudEFjdGlvbi5Ob25lIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICAgIGxhbmd1YWdlcy5yZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIoJ21hcmtkb3duJywge1xyXG4gICAgICBwcm92aWRlQ29tcGxldGlvbkl0ZW1zOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdoMScsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDInLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjICR7MTp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdoMycsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnIyMjICR7MTp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdoNCcsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnIyMjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDUnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjIyMjICR7MTp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdoNicsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnIyMjIyMjICR7MTp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdjb2RlJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5TbmlwcGV0LFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFtcclxuICAgICAgICAgICAgICAgICdgYGAnLFxyXG4gICAgICAgICAgICAgICAgJyR7MTpjb2RlfScsXHJcbiAgICAgICAgICAgICAgICAnYGBgJyxcclxuXHJcbiAgICAgICAgICAgICAgXS5qb2luKCdcXG4nKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkb2N1bWVudGF0aW9uOiAnSWYtRWxzZSBTdGF0ZW1lbnQnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2xpbmsnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1skezE6bGlua1RleHR9XSgkezI6dXJsfSknXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaW1hZ2UnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyFbJHsxOmFsdFRleHR9XSgkezI6dXJsfSknXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnbGlua3JlZmVyYW5jZScsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnWyR7MTpuYW1lfV06ICR7MjpsaW5rfSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdsaXN0JyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdcXG4gLSAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAndG9kbyB1biBjaGVjaycsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnXFxuIC0gWyBdICR7Mjp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAndG9kbyBjaGVjaycsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnXFxuIC0gW3hdICR7Mjp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnVwZGF0ZU9wdGlvbnMoe1xyXG4gICAgICBnbHlwaE1hcmdpbiA6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChjaGFyLCBhZnRlcmNoYXJuZXdMaW5lID0gZmFsc2UsIGxpbmUgPSAwKSB7XHJcbiAgICB2YXIgY291bnQgPSBjaGFyLnRyaW0oKS5sZW5ndGg7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmJhc2VFZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICB2YXIgdGV4dCA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShzZWxlY3Rpb24pO1xyXG4gICAgdGV4dC50cmltKCk7XHJcbiAgICB2YXIgYmVmb3Jlc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRDb2x1bW4gLSBjb3VudCxcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uTGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uIC0gdGV4dC5sZW5ndGgpO1xyXG5cclxuICAgIHZhciBhZnRlcnNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25MaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25Db2x1bW4gKyBjb3VudCk7XHJcblxyXG4gICAgdmFyIHN0YXJ0Y2hhciA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShiZWZvcmVzZWxlY3Rpb24pO1xyXG4gICAgdmFyIGVuZGNoYXIgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2UoYWZ0ZXJzZWxlY3Rpb24pO1xyXG5cclxuXHJcblxyXG4gICAgaWYgKHN0YXJ0Y2hhciA9PSBjaGFyICYmIGVuZGNoYXIgPT0gY2hhcikge1xyXG5cclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cygnJywgW3sgcmFuZ2U6IGFmdGVyc2VsZWN0aW9uLCB0ZXh0OiAnJyB9XSk7XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBiZWZvcmVzZWxlY3Rpb24sIHRleHQ6ICcnIH1dKTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGV4dCA9IGAke2FmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/ICdcXG4nIDogJyd9JHtjaGFyfSR7YWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gJ1xcbicgOiAnJ30ke3RleHR9JHthZnRlcmNoYXJuZXdMaW5lID09IHRydWUgPyAnXFxuJyA6ICcnfSR7Y2hhcn1gO1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKCcnLCBbeyByYW5nZTogc2VsZWN0aW9uLCB0ZXh0OiB0ZXh0IH1dKTtcclxuXHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5zZXRTZWxlY3Rpb24oe1xyXG4gICAgICAgIHN0YXJ0Q29sdW1uOiBzZWxlY3Rpb24uc3RhcnRDb2x1bW4gKyAobGluZSA9PSAwID8gY291bnQgOiAwKSxcclxuICAgICAgICBlbmRDb2x1bW46IHNlbGVjdGlvbi5lbmRDb2x1bW4gKyAobGluZSA9PSAwID8gY291bnQgOiAwKSxcclxuICAgICAgICBzdGFydExpbmVOdW1iZXI6IHNlbGVjdGlvbi5zdGFydExpbmVOdW1iZXIgKyBsaW5lLFxyXG4gICAgICAgIGVuZExpbmVOdW1iZXI6IHNlbGVjdGlvbi5lbmRMaW5lTnVtYmVyICsgbGluZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuICBsaW5rQmFzZWRJbnNlcnRUZXh0KHR5cGUpIHtcclxuICAgIHZhciBjb3VudCA9IHR5cGUgPT0gXCJpbWFnZVwiID8gNCA6IDM7XHJcbiAgICB2YXIgZXh0cmFjaGFyID0gdHlwZSA9PSBcImltYWdlXCIgPyBcIiFcIiA6IFwiXCI7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmJhc2VFZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICB2YXIgdGV4dCA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShzZWxlY3Rpb24pO1xyXG4gICAgdmFyIG5ld1RleHQgPSBgJHtleHRyYWNoYXJ9WyR7dGV4dH1dKClgO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cygnJywgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogbmV3VGV4dCB9XSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0UG9zaXRpb24oe1xyXG4gICAgICBsaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlcixcclxuICAgICAgY29sdW1uOiBzZWxlY3Rpb24uZW5kQ29sdW1uICsgY291bnRcclxuICAgIH0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmZvY3VzKCk7XHJcbiAgfVxyXG4gIGxpc3RCYXNlZEluc2VydFRleHQodHlwZSwgZmlsbCA9IGZhbHNlKSB7XHJcbiAgICB2YXIgZXh0cmEgPSB0eXBlID09ICd0b2RvJyA/IGZpbGwgPT0gdHJ1ZSA/ICdbeF0nIDogJ1sgXScgOiAnJztcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB2YXIgbmV3VGV4dCA9IGBcXG4gLSAke2V4dHJhfSAke3RleHR9IGA7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKCcnLCBbeyByYW5nZTogc2VsZWN0aW9uLCB0ZXh0OiBuZXdUZXh0IH1dKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRQb3NpdGlvbih7XHJcbiAgICAgIGxpbmVOdW1iZXI6IHNlbGVjdGlvbi5lbmRMaW5lTnVtYmVyICsgMSxcclxuICAgICAgY29sdW1uOiB0eXBlID09ICd0b2RvJyA/IDggOiA0XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgaW5zZXJ0Q29udGVudCh0eXBlKSB7XHJcblxyXG5cclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdib2xkJzpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoXCIqKlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnaXRhbGljJzpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoXCIqXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzdHJpa2V0aHJvdWdoJzpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoXCJ+flwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGluayc6XHJcbiAgICAgICAgdGhpcy5saW5rQmFzZWRJbnNlcnRUZXh0KFwibGlua1wiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnaW1hZ2UnOlxyXG4gICAgICAgIHRoaXMubGlua0Jhc2VkSW5zZXJ0VGV4dChcImltYWdlXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjb2RlJzpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoJ2BgYCcsIHRydWUsICsxKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnaW5saW5lLWNvZGUnOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dCgnYCcpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd1bmRvJzpcclxuICAgICAgICB0aGlzLmJhc2VFZGl0b3IudHJpZ2dlcihcIlwiLCBcInVuZG9cIiwgXCJcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3JlZG8nOlxyXG4gICAgICAgIHRoaXMuYmFzZUVkaXRvci50cmlnZ2VyKCcnLCAncmVkbycsICcnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGlzdCc6XHJcbiAgICAgICAgdGhpcy5saXN0QmFzZWRJbnNlcnRUZXh0KCdsaW5rJyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RvZG8teCc6XHJcbiAgICAgICAgdGhpcy5saXN0QmFzZWRJbnNlcnRUZXh0KCd0b2RvJywgdHJ1ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RvZG8tbyc6XHJcbiAgICAgICAgdGhpcy5saXN0QmFzZWRJbnNlcnRUZXh0KCd0b2RvJywgZmFsc2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25SZXNpemVkKGV2ZW50OiBSZXNpemVkRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5sYXlvdXQoKTtcclxuICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgIH1cclxuICByZXNpemVMYXlvdXQoKXtcclxuICAgIHZhciB3aXRkaCA9IHRoaXMucmVzaXplQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9ICh3aXRkaC8yKStcInB4XCI7XHJcbiAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSAod2l0ZGggLyAyKSArIFwicHhcIlxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIE91dHB1dCwgUmVuZGVyZXIyLCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBtYXJrZWQgZnJvbSAnbWFya2VkJztcbmltcG9ydCBobGpzIGZyb20gXCJoaWdobGlnaHQuanNcIjtcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IGVtb2ppIGZyb20gJ25vZGUtZW1vamknXG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hcmtkb3duXSdcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25EaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIHNldCBtYXJrZG93bnRleHQodikge1xuICAgIGlmICh2ICE9IG51bGwgJiYgdiAhPSB0aGlzLl9jb250ZW50KSB7XG4gICAgICB0aGlzLl9jb250ZW50ID0gdjtcbiAgICAgIHRoaXMucmVuZGVyTWFya2Rvd24odGhpcy5fY29udGVudCk7XG4gICAgfVxuICB9XG4gIEBPdXRwdXQoKSBnZXQgaHRtbCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZWRDb250ZW50O1xuICB9XG4gIF9jb250ZW50O1xuICBtYXJrZWRDb250ZW50OiBzdHJpbmc7XG4gIHJlbmRlcmVyID0gbmV3IG1hcmtlZC5SZW5kZXJlcigpO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBzYW5pdGl6ZTogRG9tU2FuaXRpemVyLCBwcml2YXRlIHJlbmRlcjI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMubWFya2VkUmVuZGVyZXIoKTtcbiAgICB0aGlzLnJlbmRlck1hcmtkb3duKFwiXCIpO1xuICB9XG5cblxuICByZW5kZXJNYXJrZG93bih0ZXh0KSB7XG4gICAgY29uc3QgcmVwbGFjZXIgPSAobWF0Y2gpID0+IGVtb2ppLmVtb2ppZnkobWF0Y2gpO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoLyg6Lio6KS9nLCByZXBsYWNlcik7XG5cbiAgICB0aGlzLm1hcmtlZENvbnRlbnQgPSBtYXJrZWQodGV4dCk7XG5cbiAgICB0aGlzLm1hcmtlZENvbnRlbnQgPSB0aGlzLnNhbml0aXplLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHRoaXMubWFya2VkQ29udGVudCkgYXMgc3RyaW5nXG5cbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5zYW5pdGl6ZS5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgdGhpcy5tYXJrZWRDb250ZW50KTtcblxuICB9XG5cbiAgbWFya2VkUmVuZGVyZXIoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0aXRlbSA9ICh0ZXh0OiBhbnkpID0+IHtcbiAgICAgIGlmICgvXlxccypcXFtbeCBdXFxdXFxzKi8udGVzdCh0ZXh0KSkge1xuICAgICAgICB0ZXh0ID0gdGV4dFxuICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKlxcWyBcXF1cXHMqLywgJzxpIGNsYXNzPVwiZmEgZmEtc3F1YXJlLW9cIiBzdHlsZT1cIm1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtO1wiPjwvaT4gJylcbiAgICAgICAgICAucmVwbGFjZSgvXlxccypcXFt4XFxdXFxzKi8sICc8aSBjbGFzcz1cImZhIGZhLWNoZWNrLXNxdWFyZVwiIHN0eWxlPVwibWFyZ2luOiAwIDAuMmVtIDAuMjVlbSAtMS42ZW07XCI+PC9pPiAnKTtcbiAgICAgICAgcmV0dXJuIGA8bGkgc3R5bGU9XCJsaXN0LXN0eWxlOiBub25lO1wiPiR7dGV4dH08L2xpPmA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYDxsaT4ke3RleHR9PC9saT5gO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5yZW5kZXJlci50YWJsZSA9IChoZWFkZXI6IHN0cmluZywgYm9keTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkXCI+XFxuPHRoZWFkPlxcbiR7aGVhZGVyfTwvdGhlYWQ+XFxuPHRib2R5PlxcbiR7Ym9keX08L3Rib2R5PlxcbjwvdGFibGU+XFxuYDtcbiAgICB9O1xuXG4gICAgbWFya2VkLnNldE9wdGlvbnMoe1xuICAgICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICByZXR1cm4gaGxqcy5oaWdobGlnaHRBdXRvKGNvZGUpLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHJlbmRlcmVyOiB0aGlzLnJlbmRlcmVyLFxuICAgICAgdGFibGVzOiB0cnVlLFxuICAgICAgc2FuaXRpemU6IGZhbHNlLFxuICAgICAgc21hcnRMaXN0czogdHJ1ZSxcblxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWUtFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZG93bkRpcmVjdGl2ZSB9IGZyb20gJy4vbWFya2Rvd24uZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEFuZ3VsYXJSZXNpemVkRXZlbnRNb2R1bGUgfSBmcm9tICdhbmd1bGFyLXJlc2l6ZS1ldmVudCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEFuZ3VsYXJSZXNpemVkRXZlbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFlLRWRpdG9yQ29tcG9uZW50LCBNYXJrZG93bkRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtZS0VkaXRvckNvbXBvbmVudCxNYXJrZG93bkRpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgWWtFZGl0b3JNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0lBd0VFOzZCQXBEMEIsSUFBSSxZQUFZLEVBQUU7d0JBRWpDLEVBQUU7MkJBUVMsT0FBTzs0QkFFZCxLQUFLO3FCQUVILElBQUk7c0JBeUNQO1lBRVosUUFBUSxFQUFFLFVBQVU7WUFDcEIsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUMzQixXQUFXLEVBQUUsS0FBSztZQUNsQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsU0FBUztZQUNwQyxvQkFBb0IsRUFBRSxLQUFLO1lBQzNCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUFFLEtBQUs7U0FDbkI7S0FYQTtJQTlERCxzQkFBYSxzQ0FBTzs7OztRQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0Qjs7Ozs7UUFFRCxVQUFZLENBQUM7WUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1Qjs7O09BTEE7Ozs7SUF1QkQsdUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3pFOzs7OztJQUVELHdDQUFZOzs7O0lBQVosVUFBYSxJQUFJO1FBQ2YsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksWUFBWSxFQUFFO1lBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLFFBQVEsSUFBSTtnQkFDVixLQUFLLE1BQU07b0JBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7b0JBQzVFLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztvQkFDOUYsTUFBTTtnQkFDUixLQUFLLFNBQVM7b0JBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO29CQUMzRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztvQkFDL0YsTUFBTTtnQkFDUixLQUFLLE9BQU87b0JBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM5RCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM3RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLE1BQU07Z0JBQ1IsS0FBSyxZQUFZO29CQUVmLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUN2QyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSTt3QkFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSwrRUFBK0UsQ0FBQyxDQUFDOzt3QkFFeEksSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDN0QsTUFBTTthQUNUO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMxQjtLQUNGOzs7O0lBa0JELG9DQUFROzs7SUFBUjtRQUFBLGlCQXVJQztRQXRJQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsVUFBQyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMzQyxDQUFDLENBQUM7O1FBQ0gsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQTtTQUFFO1FBRXBKLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLEVBQUU7WUFDbkQsc0JBQXNCLEVBQUUsVUFBVSxLQUFLLEVBQUUsUUFBUTs7Z0JBQy9DLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQzFMLElBQUksaUJBQWlCLEtBQUssR0FBRyxFQUFFO29CQUFFLE9BQU8sU0FBUyxDQUFDO2lCQUFFO2dCQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hFO1lBQ0QsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDekIsQ0FBQyxDQUFDO1FBRUgsU0FBUyxDQUFDLHdCQUF3QixDQUFDLFVBQVUsRUFBRTtZQUM3QyxZQUFZLEVBQUU7Z0JBQ1o7b0JBQ0UsVUFBVSxFQUFFLFlBQVk7b0JBQ3hCLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO2lCQUV4RTthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsU0FBUyxDQUFDLDhCQUE4QixDQUFDLFVBQVUsRUFBRTtZQUNuRCxzQkFBc0IsRUFBRTtnQkFDdEIsT0FBTztvQkFDTDt3QkFDRSxLQUFLLEVBQUUsSUFBSTt3QkFDWCxJQUFJLEVBQUUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU87d0JBQzFDLFVBQVUsRUFBRTs0QkFDVixLQUFLLEVBQUUsYUFBYTt5QkFDckI7cUJBQ0Y7b0JBQ0Q7d0JBQ0UsS0FBSyxFQUFFLElBQUk7d0JBQ1gsSUFBSSxFQUFFLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPO3dCQUMxQyxVQUFVLEVBQUU7NEJBQ1YsS0FBSyxFQUFFLGNBQWM7eUJBQ3RCO3FCQUNGO29CQUNEO3dCQUNFLEtBQUssRUFBRSxJQUFJO3dCQUNYLElBQUksRUFBRSxTQUFTLENBQUMsa0JBQWtCLENBQUMsT0FBTzt3QkFDMUMsVUFBVSxFQUFFOzRCQUNWLEtBQUssRUFBRSxlQUFlO3lCQUN2QjtxQkFDRjtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsSUFBSTt3QkFDWCxJQUFJLEVBQUUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU87d0JBQzFDLFVBQVUsRUFBRTs0QkFDVixLQUFLLEVBQUUsZ0JBQWdCO3lCQUN4QjtxQkFDRjtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsSUFBSTt3QkFDWCxJQUFJLEVBQUUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU87d0JBQzFDLFVBQVUsRUFBRTs0QkFDVixLQUFLLEVBQUUsaUJBQWlCO3lCQUN6QjtxQkFDRjtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsSUFBSTt3QkFDWCxJQUFJLEVBQUUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU87d0JBQzFDLFVBQVUsRUFBRTs0QkFDVixLQUFLLEVBQUUsa0JBQWtCO3lCQUMxQjtxQkFDRjtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsTUFBTTt3QkFDYixJQUFJLEVBQUUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU87d0JBQzFDLFVBQVUsRUFBRTs0QkFDVixLQUFLLEVBQUU7Z0NBQ0wsS0FBSztnQ0FDTCxXQUFXO2dDQUNYLEtBQUs7NkJBRU4sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNiO3dCQUNELGFBQWEsRUFBRSxtQkFBbUI7cUJBQ25DO29CQUNEO3dCQUNFLEtBQUssRUFBRSxNQUFNO3dCQUNiLElBQUksRUFBRSxTQUFTLENBQUMsa0JBQWtCLENBQUMsT0FBTzt3QkFDMUMsVUFBVSxFQUFFOzRCQUNWLEtBQUssRUFBRSwyQkFBMkI7eUJBQ25DO3FCQUNGO29CQUNEO3dCQUNFLEtBQUssRUFBRSxPQUFPO3dCQUNkLElBQUksRUFBRSxTQUFTLENBQUMsa0JBQWtCLENBQUMsT0FBTzt3QkFDMUMsVUFBVSxFQUFFOzRCQUNWLEtBQUssRUFBRSwyQkFBMkI7eUJBQ25DO3FCQUNGO29CQUNEO3dCQUNFLEtBQUssRUFBRSxlQUFlO3dCQUN0QixJQUFJLEVBQUUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU87d0JBQzFDLFVBQVUsRUFBRTs0QkFDVixLQUFLLEVBQUUsd0JBQXdCO3lCQUNoQztxQkFDRjtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsTUFBTTt3QkFDYixJQUFJLEVBQUUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU87d0JBQzFDLFVBQVUsRUFBRTs0QkFDVixLQUFLLEVBQUUsZ0JBQWdCO3lCQUN4QjtxQkFDRjtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsZUFBZTt3QkFDdEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPO3dCQUMxQyxVQUFVLEVBQUU7NEJBQ1YsS0FBSyxFQUFFLG9CQUFvQjt5QkFDNUI7cUJBQ0Y7b0JBRUQ7d0JBQ0UsS0FBSyxFQUFFLFlBQVk7d0JBQ25CLElBQUksRUFBRSxTQUFTLENBQUMsa0JBQWtCLENBQUMsT0FBTzt3QkFDMUMsVUFBVSxFQUFFOzRCQUNWLEtBQUssRUFBRSxvQkFBb0I7eUJBQzVCO3FCQUNGO2lCQUNGLENBQUE7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQzVCLFdBQVcsRUFBRyxLQUFLO1NBQ3BCLENBQUMsQ0FBQztLQUVKOzs7Ozs7O0lBRUQscURBQXlCOzs7Ozs7SUFBekIsVUFBMEIsSUFBSSxFQUFFLGdCQUF3QixFQUFFLElBQVE7UUFBbEMsaUNBQUEsRUFBQSx3QkFBd0I7UUFBRSxxQkFBQSxFQUFBLFFBQVE7O1FBQ2hFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7O1FBQy9CLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7O1FBQ2pELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7UUFDWixJQUFJLGVBQWUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQ3BFLFNBQVMsQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLEVBQ3RDLFNBQVMsQ0FBQyxrQkFBa0IsRUFDNUIsU0FBUyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBRTFDLElBQUksY0FBYyxHQUFHLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFDbkUsU0FBUyxDQUFDLGNBQWMsRUFDeEIsU0FBUyxDQUFDLGtCQUFrQixFQUM1QixTQUFTLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDOztRQUVwQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7UUFDNUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7UUFJekUsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFFeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FFMUU7YUFDSTtZQUNILElBQUksR0FBRyxNQUFHLGdCQUFnQixJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxJQUFHLElBQUksSUFBRyxnQkFBZ0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsSUFBRyxJQUFJLElBQUcsZ0JBQWdCLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLElBQUcsSUFBTSxDQUFDO1lBQ3BKLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXJFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO2dCQUMzQixXQUFXLEVBQUUsU0FBUyxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQzVELFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDeEQsZUFBZSxFQUFFLFNBQVMsQ0FBQyxlQUFlLEdBQUcsSUFBSTtnQkFDakQsYUFBYSxFQUFFLFNBQVMsQ0FBQyxhQUFhLEdBQUcsSUFBSTthQUM5QyxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDekI7Ozs7O0lBQ0QsK0NBQW1COzs7O0lBQW5CLFVBQW9CLElBQUk7O1FBQ3RCLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFDcEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLE9BQU8sR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDOztRQUMzQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDOztRQUNqRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7UUFDakUsSUFBSSxPQUFPLEdBQU0sU0FBUyxTQUFJLElBQUksUUFBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1lBQzFCLFVBQVUsRUFBRSxTQUFTLENBQUMsYUFBYTtZQUNuQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBQVMsR0FBRyxLQUFLO1NBQ3BDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDekI7Ozs7OztJQUNELCtDQUFtQjs7Ozs7SUFBbkIsVUFBb0IsSUFBSSxFQUFFLElBQVk7UUFBWixxQkFBQSxFQUFBLFlBQVk7O1FBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQzs7UUFDL0QsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7UUFDakQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBQ2pFLElBQUksT0FBTyxHQUFHLFVBQVEsS0FBSyxTQUFJLElBQUksTUFBRyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1lBQzFCLFVBQVUsRUFBRSxTQUFTLENBQUMsYUFBYSxHQUFHLENBQUM7WUFDdkMsTUFBTSxFQUFFLElBQUksSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDL0IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFFRCx5Q0FBYTs7OztJQUFiLFVBQWMsSUFBSTtRQUdoQixRQUFRLElBQUk7WUFDVixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEMsTUFBTTtZQUNSLEtBQUssZUFBZTtnQkFDbEIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3hDLE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDeEMsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdkMsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN4QyxNQUFNO1NBQ1Q7S0FDRjs7Ozs7SUFFRCxxQ0FBUzs7OztJQUFULFVBQVUsS0FBbUI7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDcEI7Ozs7SUFDRix3Q0FBWTs7O0lBQVo7O1FBQ0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBQzFELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQztRQUNoRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQTtLQUN0RTs7OztJQUVELDJDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyQjs7Z0JBblZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsOHdGQUF3Qzs7aUJBRXpDOzs7OzswQkFFRSxLQUFLO2dDQVNMLE1BQU07dUJBR04sU0FBUyxTQUFDLFlBQVk7a0NBQ3RCLFNBQVMsU0FBQyxpQkFBaUI7bUNBQzNCLFNBQVMsU0FBQyxrQkFBa0I7Z0NBQzVCLFNBQVMsU0FBQyxlQUFlO2tDQUN6QixTQUFTLFNBQUMsaUJBQWlCOzs0QkEzQjlCOzs7Ozs7O0FDQUE7SUEwQkUsMkJBQW9CLEVBQWMsRUFBVSxRQUFzQixFQUFVLE9BQWtCO1FBQTFFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFjO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBVzt3QkFIbkYsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1FBSTlCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3pCO0lBakJELHNCQUFhLDJDQUFZOzs7OztRQUF6QixVQUEwQixDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7OztPQUFBO0lBQ0Qsc0JBQWMsbUNBQUk7Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDM0I7OztPQUFBOzs7OztJQVlELDBDQUFjOzs7O0lBQWQsVUFBZSxJQUFJOztRQUNqQixJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUEsQ0FBQztRQUNqRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLGFBQWEscUJBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFXLENBQUEsQ0FBQTtRQUV4RixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FFcEc7Ozs7SUFFRCwwQ0FBYzs7O0lBQWQ7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxVQUFDLElBQVM7WUFDakMsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksR0FBRyxJQUFJO3FCQUNSLE9BQU8sQ0FBQyxjQUFjLEVBQUUsd0VBQXdFLENBQUM7cUJBQ2pHLE9BQU8sQ0FBQyxjQUFjLEVBQUUsNEVBQTRFLENBQUMsQ0FBQztnQkFDekcsT0FBTyxxQ0FBaUMsSUFBSSxVQUFPLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0wsT0FBTyxTQUFPLElBQUksVUFBTyxDQUFDO2FBQzNCO1NBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFVBQUMsTUFBYyxFQUFFLElBQVk7WUFDakQsT0FBTyxzREFBa0QsTUFBTSwyQkFBc0IsSUFBSSx5QkFBc0IsQ0FBQztTQUNqSCxDQUFDO1FBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNoQixTQUFTLEVBQUUsVUFBVSxJQUFJO2dCQUN2QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ3ZDO1lBQ0QsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFLEtBQUs7WUFDZixVQUFVLEVBQUUsSUFBSTtTQUVqQixDQUFDLENBQUM7S0FDSjs7Z0JBOURGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7Ozs7Z0JBVDBCLFVBQVU7Z0JBRzVCLFlBQVk7Z0JBSDBCLFNBQVM7OzsrQkFZckQsS0FBSzt1QkFNTCxNQUFNOzs0QkFsQlQ7Ozs7Ozs7QUNBQTs7OztnQkFLQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1oseUJBQXlCO3FCQUMxQjtvQkFDRCxZQUFZLEVBQUUsQ0FBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztvQkFDckQsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUMsaUJBQWlCLENBQUM7aUJBQy9DOzt5QkFaRDs7Ozs7Ozs7Ozs7Ozs7OyJ9