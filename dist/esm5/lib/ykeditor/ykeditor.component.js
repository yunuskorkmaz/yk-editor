/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { editor, Selection, languages } from 'monaco-editor';
import emoji from 'node-emoji';
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
export { YKEditorComponent };
if (false) {
    /** @type {?} */
    YKEditorComponent.prototype.contentChange;
    /** @type {?} */
    YKEditorComponent.prototype._content;
    /** @type {?} */
    YKEditorComponent.prototype.host;
    /** @type {?} */
    YKEditorComponent.prototype.editorContainer;
    /** @type {?} */
    YKEditorComponent.prototype.previewContainer;
    /** @type {?} */
    YKEditorComponent.prototype.mainContainer;
    /** @type {?} */
    YKEditorComponent.prototype.resizeContainer;
    /** @type {?} */
    YKEditorComponent.prototype.baseEditor;
    /** @type {?} */
    YKEditorComponent.prototype.displayMode;
    /** @type {?} */
    YKEditorComponent.prototype.isFullScreen;
    /** @type {?} */
    YKEditorComponent.prototype.theme;
    /** @type {?} */
    YKEditorComponent.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWtlZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8veWstZWRpdG9yLyIsInNvdXJjZXMiOlsibGliL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNySCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxLQUFLLE1BQU0sWUFBWSxDQUFBOztJQXNFNUI7NkJBcEQwQixJQUFJLFlBQVksRUFBRTt3QkFFakMsRUFBRTsyQkFRUyxPQUFPOzRCQUVkLEtBQUs7cUJBRUgsSUFBSTtzQkF5Q1A7WUFFWixRQUFRLEVBQUUsVUFBVTtZQUNwQixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQzNCLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDcEMsb0JBQW9CLEVBQUUsS0FBSztZQUMzQixRQUFRLEVBQUUsSUFBSTtZQUNkLFdBQVcsRUFBRSxLQUFLO1NBQ25CO0tBWEE7SUE5REQsc0JBQWEsc0NBQU87Ozs7UUFBcEI7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEI7Ozs7O1FBRUQsVUFBWSxDQUFDO1lBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUI7OztPQUxBOzs7O0lBdUJELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FB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QUFpQjttQ0FDM0IsU0FBUyxTQUFDLGtCQUFrQjtnQ0FDNUIsU0FBUyxTQUFDLGVBQWU7a0NBQ3pCLFNBQVMsU0FBQyxpQkFBaUI7OzRCQTNCOUI7O1NBVWEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVkaXRvciwgU2VsZWN0aW9uLCBsYW5ndWFnZXN9IGZyb20gJ21vbmFjby1lZGl0b3InO1xyXG5pbXBvcnQgZW1vamkgZnJvbSAnbm9kZS1lbW9qaSdcclxuaW1wb3J0IHsgUmVzaXplZEV2ZW50IH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQvcmVzaXplZC1ldmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3lrLWVkaXRvcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3lrZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi95a2VkaXRvci5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFlLRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodikge1xyXG4gICAgdGhpcy5fY29udGVudCA9IHY7XHJcbiAgICB0aGlzLmNvbnRlbnRDaGFuZ2UuZW1pdCh2KTtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBjb250ZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBfY29udGVudCA9IFwiXCI7XHJcbiAgQFZpZXdDaGlsZChcImVkaXRvcmhvc3RcIikgaG9zdDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZWRpdG9yQ29udGFpbmVyXCIpIGVkaXRvckNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicHJldmlld0NvbnRhaW5lclwiKSBwcmV2aWV3Q29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ21haW5Db250YWluZXInKSBtYWluQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJyZXNpemVDb250YWluZXJcIikgcmVzaXplQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIGJhc2VFZGl0b3I6IGFueTtcclxuXHJcbiAgZGlzcGxheU1vZGU6IHN0cmluZyA9IFwic3BsaXRcIjtcclxuXHJcbiAgaXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcblxyXG4gIHRoZW1lOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY2hhbmdlVGhlbWUoKSB7XHJcbiAgICB0aGlzLnRoZW1lID0gIXRoaXMudGhlbWU7XHJcbiAgICB0aGlzLnRoZW1lID09IHRydWUgPyBlZGl0b3Iuc2V0VGhlbWUoXCJ2c1wiKSA6IGVkaXRvci5zZXRUaGVtZShcInZzLWRhcmtcIik7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VMYXlvdXQodHlwZSkge1xyXG4gICAgaWYgKHRoaXMuZGlzcGxheU1vZGUgIT0gdHlwZSB8fCB0eXBlID09IFwiZnVsbHNjcmVlblwiKSB7XHJcbiAgICAgIHRoaXMuZGlzcGxheU1vZGUgPSB0eXBlO1xyXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICBjYXNlICdlZGl0JzpcclxuICAgICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheSA6IG5vbmVcIik7XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWluLXdpZHRoIDogMTAwJTttYXgtd2lkdGggOiAxMDAlXCIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncHJldmlldyc6XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheSA6IG5vbmVcIik7XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm1pbi13aWR0aCA6IDEwMCU7bWF4LXdpZHRoIDogMTAwJVwiKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3NwbGl0JzpcclxuICAgICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIlwiKTtcclxuICAgICAgICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdmdWxsc2NyZWVuJzpcclxuXHJcbiAgICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbiA9ICF0aGlzLmlzRnVsbFNjcmVlbjtcclxuICAgICAgICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbiA9PSB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgXCJwb3NpdGlvbjogZml4ZWQ7dG9wOiAwcHg7bGVmdDogMDtib3R0b206IDA7cmlnaHQ6IDA7d2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO1wiKTtcclxuICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiXCIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmxheW91dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgY29uZmlnOiBhbnkgPSB7XHJcblxyXG4gICAgbGFuZ3VhZ2U6IFwibWFya2Rvd25cIixcclxuICAgIG1pbmltYXA6IHsgZW5hYmxlZDogZmFsc2UgfSxcclxuICAgIGxpbmVOdW1iZXJzOiBcIm9mZlwiLFxyXG4gICAgdGhlbWU6IHRoaXMudGhlbWUgPyAndnMnIDogJ3ZzLWRhcmsnLFxyXG4gICAgc2Nyb2xsQmV5b25kTGFzdExpbmU6IGZhbHNlLFxyXG4gICAgd29yZFdyYXA6ICdvbicsXHJcbiAgICBnbHlwaE1hcmdpbjogZmFsc2VcclxuICB9XHJcblxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYmFzZUVkaXRvciA9IGVkaXRvci5jcmVhdGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuY29uZmlnKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRNb2RlbChlZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5jb250ZW50LCAnbWFya2Rvd24nKSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKGUpID0+IHtcclxuICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5iYXNlRWRpdG9yLmdldFZhbHVlKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBlbW9qaWxpc3QgPSBbXTtcclxuICAgIGZvciAodmFyIGsgaW4gZW1vamkuZW1vamkpIHsgZW1vamlsaXN0LnB1c2goeyBsYWJlbDogayArIFwiIFwiICsgZW1vamkuZW1vamlba10sIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuRnVuY3Rpb24sIGluc2VydFRleHQ6IGsgKyBcIjpcIiB9KSB9XHJcblxyXG4gICAgbGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcignbWFya2Rvd24nLCB7XHJcbiAgICAgIHByb3ZpZGVDb21wbGV0aW9uSXRlbXM6IGZ1bmN0aW9uIChtb2RlbCwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdGV4dFVudGlsUG9zaXRpb24gPSBtb2RlbC5nZXRWYWx1ZUluUmFuZ2UoeyBzdGFydExpbmVOdW1iZXI6IHBvc2l0aW9uLmxpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uOiBwb3NpdGlvbi5jb2x1bW4gLSAxLCBlbmRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLCBlbmRDb2x1bW46IHBvc2l0aW9uLmNvbHVtbiB9KTtcclxuICAgICAgICBpZiAodGV4dFVudGlsUG9zaXRpb24gPT09ICc6JykgeyByZXR1cm4gZW1vamlsaXN0OyB9IHJldHVybiBbXTtcclxuICAgICAgfSxcclxuICAgICAgdHJpZ2dlckNoYXJhY3RlcnM6IFsnOiddXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW5ndWFnZXMuc2V0TGFuZ3VhZ2VDb25maWd1cmF0aW9uKCdtYXJrZG93bicsIHtcclxuICAgICAgb25FbnRlclJ1bGVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYmVmb3JlVGV4dDogL15bLV1cXHMoLiopLyxcclxuICAgICAgICAgIGFjdGlvbjogeyBhcHBlbmRUZXh0OiAnLSAnLCBpbmRlbnRBY3Rpb246IGxhbmd1YWdlcy5JbmRlbnRBY3Rpb24uTm9uZSB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBsYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKCdtYXJrZG93bicsIHtcclxuICAgICAgcHJvdmlkZUNvbXBsZXRpb25JdGVtczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDEnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2gyJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDMnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDQnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2g1JyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyMjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnaDYnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJyMjIyMjIyAkezE6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnY29kZScsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuU25pcHBldCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBbXHJcbiAgICAgICAgICAgICAgICAnYGBgJyxcclxuICAgICAgICAgICAgICAgICckezE6Y29kZX0nLFxyXG4gICAgICAgICAgICAgICAgJ2BgYCcsXHJcblxyXG4gICAgICAgICAgICAgIF0uam9pbignXFxuJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogJ0lmLUVsc2UgU3RhdGVtZW50J1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdsaW5rJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdbJHsxOmxpbmtUZXh0fV0oJHsyOnVybH0pJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2ltYWdlJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICchWyR7MTphbHRUZXh0fV0oJHsyOnVybH0pJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2xpbmtyZWZlcmFuY2UnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1skezE6bmFtZX1dOiAkezI6bGlua30nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnbGlzdCcsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnXFxuIC0gJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ3RvZG8gdW4gY2hlY2snLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1xcbiAtIFsgXSAkezI6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ3RvZG8gY2hlY2snLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1xcbiAtIFt4XSAkezI6dGV4dH0nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYmFzZUVkaXRvci51cGRhdGVPcHRpb25zKHtcclxuICAgICAgZ2x5cGhNYXJnaW4gOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIGNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoY2hhciwgYWZ0ZXJjaGFybmV3TGluZSA9IGZhbHNlLCBsaW5lID0gMCkge1xyXG4gICAgdmFyIGNvdW50ID0gY2hhci50cmltKCkubGVuZ3RoO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHRleHQudHJpbSgpO1xyXG4gICAgdmFyIGJlZm9yZXNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0Q29sdW1uIC0gY291bnQsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkxpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbiAtIHRleHQubGVuZ3RoKTtcclxuXHJcbiAgICB2YXIgYWZ0ZXJzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uTGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uICsgY291bnQpO1xyXG5cclxuICAgIHZhciBzdGFydGNoYXIgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2UoYmVmb3Jlc2VsZWN0aW9uKTtcclxuICAgIHZhciBlbmRjaGFyID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKGFmdGVyc2VsZWN0aW9uKTtcclxuXHJcblxyXG5cclxuICAgIGlmIChzdGFydGNoYXIgPT0gY2hhciAmJiBlbmRjaGFyID09IGNoYXIpIHtcclxuXHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBhZnRlcnNlbGVjdGlvbiwgdGV4dDogJycgfV0pO1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKCcnLCBbeyByYW5nZTogYmVmb3Jlc2VsZWN0aW9uLCB0ZXh0OiAnJyB9XSk7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRleHQgPSBgJHthZnRlcmNoYXJuZXdMaW5lID09IHRydWUgPyAnXFxuJyA6ICcnfSR7Y2hhcn0ke2FmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/ICdcXG4nIDogJyd9JHt0ZXh0fSR7YWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gJ1xcbicgOiAnJ30ke2NoYXJ9YDtcclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cygnJywgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogdGV4dCB9XSk7XHJcblxyXG4gICAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0U2VsZWN0aW9uKHtcclxuICAgICAgICBzdGFydENvbHVtbjogc2VsZWN0aW9uLnN0YXJ0Q29sdW1uICsgKGxpbmUgPT0gMCA/IGNvdW50IDogMCksXHJcbiAgICAgICAgZW5kQ29sdW1uOiBzZWxlY3Rpb24uZW5kQ29sdW1uICsgKGxpbmUgPT0gMCA/IGNvdW50IDogMCksXHJcbiAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiBzZWxlY3Rpb24uc3RhcnRMaW5lTnVtYmVyICsgbGluZSxcclxuICAgICAgICBlbmRMaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlciArIGxpbmVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcbiAgbGlua0Jhc2VkSW5zZXJ0VGV4dCh0eXBlKSB7XHJcbiAgICB2YXIgY291bnQgPSB0eXBlID09IFwiaW1hZ2VcIiA/IDQgOiAzO1xyXG4gICAgdmFyIGV4dHJhY2hhciA9IHR5cGUgPT0gXCJpbWFnZVwiID8gXCIhXCIgOiBcIlwiO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHZhciBuZXdUZXh0ID0gYCR7ZXh0cmFjaGFyfVske3RleHR9XSgpYDtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IG5ld1RleHQgfV0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldFBvc2l0aW9uKHtcclxuICAgICAgbGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIsXHJcbiAgICAgIGNvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIGNvdW50XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuICBsaXN0QmFzZWRJbnNlcnRUZXh0KHR5cGUsIGZpbGwgPSBmYWxzZSkge1xyXG4gICAgdmFyIGV4dHJhID0gdHlwZSA9PSAndG9kbycgPyBmaWxsID09IHRydWUgPyAnW3hdJyA6ICdbIF0nIDogJyc7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmJhc2VFZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICB2YXIgdGV4dCA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShzZWxlY3Rpb24pO1xyXG4gICAgdmFyIG5ld1RleHQgPSBgXFxuIC0gJHtleHRyYX0gJHt0ZXh0fSBgO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cygnJywgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogbmV3VGV4dCB9XSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0UG9zaXRpb24oe1xyXG4gICAgICBsaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlciArIDEsXHJcbiAgICAgIGNvbHVtbjogdHlwZSA9PSAndG9kbycgPyA4IDogNFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGluc2VydENvbnRlbnQodHlwZSkge1xyXG5cclxuXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnYm9sZCc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiKipcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2l0YWxpYyc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiKlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc3RyaWtldGhyb3VnaCc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwifn5cIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xpbmsnOlxyXG4gICAgICAgIHRoaXMubGlua0Jhc2VkSW5zZXJ0VGV4dChcImxpbmtcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2ltYWdlJzpcclxuICAgICAgICB0aGlzLmxpbmtCYXNlZEluc2VydFRleHQoXCJpbWFnZVwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY29kZSc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KCdgYGAnLCB0cnVlLCArMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2lubGluZS1jb2RlJzpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoJ2AnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndW5kbyc6XHJcbiAgICAgICAgdGhpcy5iYXNlRWRpdG9yLnRyaWdnZXIoXCJcIiwgXCJ1bmRvXCIsIFwiXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyZWRvJzpcclxuICAgICAgICB0aGlzLmJhc2VFZGl0b3IudHJpZ2dlcignJywgJ3JlZG8nLCAnJyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xpc3QnOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dCgnbGluaycpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b2RvLXgnOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dCgndG9kbycsIHRydWUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0b2RvLW8nOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dCgndG9kbycsIGZhbHNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUmVzaXplZChldmVudDogUmVzaXplZEV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IubGF5b3V0KCk7XHJcbiAgICB0aGlzLnJlc2l6ZUxheW91dCgpO1xyXG4gICB9XHJcbiAgcmVzaXplTGF5b3V0KCl7XHJcbiAgICB2YXIgd2l0ZGggPSB0aGlzLnJlc2l6ZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSAod2l0ZGgvMikrXCJweFwiO1xyXG4gICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gKHdpdGRoIC8gMikgKyBcInB4XCJcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=