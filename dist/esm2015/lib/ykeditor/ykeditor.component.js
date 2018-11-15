/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { editor, Selection, languages } from 'monaco-editor';
import emoji from 'node-emoji';
export class YKEditorComponent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWtlZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8veWstZWRpdG9yLyIsInNvdXJjZXMiOlsibGliL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEtBQUssTUFBTSxZQUFZLENBQUE7QUFROUIsTUFBTTtJQThESjs2QkFsRDBCLElBQUksWUFBWSxFQUFFO3dCQUVqQyxFQUFFOzJCQU9TLE9BQU87NEJBRWQsS0FBSztxQkFFSCxJQUFJO3NCQTBDUDtZQUVaLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFDM0IsV0FBVyxFQUFFLEtBQUs7WUFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNwQyxvQkFBb0IsRUFBRSxLQUFLO1lBQzNCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUFFLEtBQUs7U0FDbkI7S0FYQTs7OztJQTlERCxJQUFhLE9BQU87UUFDbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7OztJQUVELElBQUksT0FBTyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1Qjs7OztJQWlCRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIs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QUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDeEMsTUFBTTtTQUNUO0tBQ0Y7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQW1CO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDekI7OztZQTNVSCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLG16RkFBd0M7O2FBRXpDOzs7OztzQkFJRSxLQUFLOzRCQVNMLE1BQU07bUJBR04sU0FBUyxTQUFDLFlBQVk7OEJBQ3RCLFNBQVMsU0FBQyxpQkFBaUI7K0JBQzNCLFNBQVMsU0FBQyxrQkFBa0I7NEJBQzVCLFNBQVMsU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVkaXRvciwgU2VsZWN0aW9uLCBsYW5ndWFnZXN9IGZyb20gJ21vbmFjby1lZGl0b3InO1xyXG5pbXBvcnQgZW1vamkgZnJvbSAnbm9kZS1lbW9qaSdcclxuaW1wb3J0IHsgUmVzaXplZEV2ZW50IH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQvcmVzaXplZC1ldmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3lrLWVkaXRvcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3lrZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi95a2VkaXRvci5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFlLRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcblxyXG4gIEBJbnB1dCgpIGdldCBjb250ZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBzZXQgY29udGVudCh2KSB7XHJcbiAgICB0aGlzLl9jb250ZW50ID0gdjtcclxuICAgIHRoaXMuY29udGVudENoYW5nZS5lbWl0KHYpO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIGNvbnRlbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIF9jb250ZW50ID0gXCJcIjtcclxuICBAVmlld0NoaWxkKFwiZWRpdG9yaG9zdFwiKSBob3N0OiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJlZGl0b3JDb250YWluZXJcIikgZWRpdG9yQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwcmV2aWV3Q29udGFpbmVyXCIpIHByZXZpZXdDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbWFpbkNvbnRhaW5lcicpIG1haW5Db250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgYmFzZUVkaXRvcjogYW55O1xyXG5cclxuICBkaXNwbGF5TW9kZTogc3RyaW5nID0gXCJzcGxpdFwiO1xyXG5cclxuICBpc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgdGhlbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjaGFuZ2VUaGVtZSgpIHtcclxuICAgIHRoaXMudGhlbWUgPSAhdGhpcy50aGVtZTtcclxuICAgIHRoaXMudGhlbWUgPT0gdHJ1ZSA/IGVkaXRvci5zZXRUaGVtZShcInZzXCIpIDogZWRpdG9yLnNldFRoZW1lKFwidnMtZGFya1wiKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUxheW91dCh0eXBlKSB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5TW9kZSAhPSB0eXBlIHx8IHR5cGUgPT0gXCJmdWxsc2NyZWVuXCIpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5TW9kZSA9IHR5cGU7XHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2VkaXQnOlxyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5IDogbm9uZVwiKTtcclxuICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJtaW4td2lkdGggOiAxMDAlO21heC13aWR0aCA6IDEwMCVcIik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdwcmV2aWV3JzpcclxuICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5IDogbm9uZVwiKTtcclxuICAgICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwibWluLXdpZHRoIDogMTAwJTttYXgtd2lkdGggOiAxMDAlXCIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc3BsaXQnOlxyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZnVsbHNjcmVlbic6XHJcblxyXG4gICAgICAgICAgdGhpcy5pc0Z1bGxTY3JlZW4gPSAhdGhpcy5pc0Z1bGxTY3JlZW47XHJcbiAgICAgICAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4gPT0gdHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwicG9zaXRpb246IGZpeGVkO3RvcDogMHB4O2xlZnQ6IDA7Ym90dG9tOiAwO3JpZ2h0OiAwO3dpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtcIik7XHJcbiAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcIlwiKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5sYXlvdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIFxyXG5cclxuICB9XHJcblxyXG4gIGNvbmZpZzogYW55ID0ge1xyXG5cclxuICAgIGxhbmd1YWdlOiBcIm1hcmtkb3duXCIsXHJcbiAgICBtaW5pbWFwOiB7IGVuYWJsZWQ6IGZhbHNlIH0sXHJcbiAgICBsaW5lTnVtYmVyczogXCJvZmZcIixcclxuICAgIHRoZW1lOiB0aGlzLnRoZW1lID8gJ3ZzJyA6ICd2cy1kYXJrJyxcclxuICAgIHNjcm9sbEJleW9uZExhc3RMaW5lOiBmYWxzZSxcclxuICAgIHdvcmRXcmFwOiAnb24nLFxyXG4gICAgZ2x5cGhNYXJnaW46IGZhbHNlXHJcbiAgfVxyXG5cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IgPSBlZGl0b3IuY3JlYXRlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCB0aGlzLmNvbmZpZyk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0TW9kZWwoZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMuY29udGVudCwgJ21hcmtkb3duJykpO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLm9uRGlkQ2hhbmdlTW9kZWxDb250ZW50KChlKSA9PiB7XHJcbiAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuYmFzZUVkaXRvci5nZXRWYWx1ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgZW1vamlsaXN0ID0gW107XHJcbiAgICBmb3IgKHZhciBrIGluIGVtb2ppLmVtb2ppKSB7IGVtb2ppbGlzdC5wdXNoKHsgbGFiZWw6IGsgKyBcIiBcIiArIGVtb2ppLmVtb2ppW2tdLCBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uLCBpbnNlcnRUZXh0OiBrICsgXCI6XCIgfSkgfVxyXG5cclxuICAgIGxhbmd1YWdlcy5yZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIoJ21hcmtkb3duJywge1xyXG4gICAgICBwcm92aWRlQ29tcGxldGlvbkl0ZW1zOiBmdW5jdGlvbiAobW9kZWwsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRleHRVbnRpbFBvc2l0aW9uID0gbW9kZWwuZ2V0VmFsdWVJblJhbmdlKHsgc3RhcnRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLCBzdGFydENvbHVtbjogcG9zaXRpb24uY29sdW1uIC0gMSwgZW5kTGluZU51bWJlcjogcG9zaXRpb24ubGluZU51bWJlciwgZW5kQ29sdW1uOiBwb3NpdGlvbi5jb2x1bW4gfSk7XHJcbiAgICAgICAgaWYgKHRleHRVbnRpbFBvc2l0aW9uID09PSAnOicpIHsgcmV0dXJuIGVtb2ppbGlzdDsgfSByZXR1cm4gW107XHJcbiAgICAgIH0sXHJcbiAgICAgIHRyaWdnZXJDaGFyYWN0ZXJzOiBbJzonXVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGFuZ3VhZ2VzLnNldExhbmd1YWdlQ29uZmlndXJhdGlvbignbWFya2Rvd24nLCB7XHJcbiAgICAgIG9uRW50ZXJSdWxlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJlZm9yZVRleHQ6IC9eWy1dXFxzKC4qKS8sXHJcbiAgICAgICAgICBhY3Rpb246IHsgYXBwZW5kVGV4dDogJy0gJywgaW5kZW50QWN0aW9uOiBsYW5ndWFnZXMuSW5kZW50QWN0aW9uLk5vbmUgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgbGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcignbWFya2Rvd24nLCB7XHJcbiAgICAgIHByb3ZpZGVDb21wbGV0aW9uSXRlbXM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2gxJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjICR7MTp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdoMicsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2gzJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2g0JyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyMjICR7MTp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdoNScsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnIyMjIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2g2JyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICcjIyMjIyMgJHsxOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2NvZGUnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLlNuaXBwZXQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogW1xyXG4gICAgICAgICAgICAgICAgJ2BgYCcsXHJcbiAgICAgICAgICAgICAgICAnJHsxOmNvZGV9JyxcclxuICAgICAgICAgICAgICAgICdgYGAnLFxyXG5cclxuICAgICAgICAgICAgICBdLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRvY3VtZW50YXRpb246ICdJZi1FbHNlIFN0YXRlbWVudCdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnbGluaycsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnWyR7MTpsaW5rVGV4dH1dKCR7Mjp1cmx9KSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdpbWFnZScsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiAnIVskezE6YWx0VGV4dH1dKCR7Mjp1cmx9KSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdsaW5rcmVmZXJhbmNlJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdbJHsxOm5hbWV9XTogJHsyOmxpbmt9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ2xpc3QnLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogJ1xcbiAtICR7MTp0ZXh0fSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICd0b2RvIHVuIGNoZWNrJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdcXG4gLSBbIF0gJHsyOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6ICd0b2RvIGNoZWNrJyxcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6ICdcXG4gLSBbeF0gJHsyOnRleHR9J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmJhc2VFZGl0b3IudXBkYXRlT3B0aW9ucyh7XHJcbiAgICAgIGdseXBoTWFyZ2luIDogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBjaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KGNoYXIsIGFmdGVyY2hhcm5ld0xpbmUgPSBmYWxzZSwgbGluZSA9IDApIHtcclxuICAgIHZhciBjb3VudCA9IGNoYXIudHJpbSgpLmxlbmd0aDtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB0ZXh0LnRyaW0oKTtcclxuICAgIHZhciBiZWZvcmVzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydENvbHVtbiAtIGNvdW50LFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25MaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25Db2x1bW4gLSB0ZXh0Lmxlbmd0aCk7XHJcblxyXG4gICAgdmFyIGFmdGVyc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25Db2x1bW4sXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkxpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbiArIGNvdW50KTtcclxuXHJcbiAgICB2YXIgc3RhcnRjaGFyID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKGJlZm9yZXNlbGVjdGlvbik7XHJcbiAgICB2YXIgZW5kY2hhciA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShhZnRlcnNlbGVjdGlvbik7XHJcblxyXG5cclxuXHJcbiAgICBpZiAoc3RhcnRjaGFyID09IGNoYXIgJiYgZW5kY2hhciA9PSBjaGFyKSB7XHJcblxyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKCcnLCBbeyByYW5nZTogYWZ0ZXJzZWxlY3Rpb24sIHRleHQ6ICcnIH1dKTtcclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cygnJywgW3sgcmFuZ2U6IGJlZm9yZXNlbGVjdGlvbiwgdGV4dDogJycgfV0pO1xyXG5cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0ZXh0ID0gYCR7YWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gJ1xcbicgOiAnJ30ke2NoYXJ9JHthZnRlcmNoYXJuZXdMaW5lID09IHRydWUgPyAnXFxuJyA6ICcnfSR7dGV4dH0ke2FmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/ICdcXG4nIDogJyd9JHtjaGFyfWA7XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IHRleHQgfV0pO1xyXG5cclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLnNldFNlbGVjdGlvbih7XHJcbiAgICAgICAgc3RhcnRDb2x1bW46IHNlbGVjdGlvbi5zdGFydENvbHVtbiArIChsaW5lID09IDAgPyBjb3VudCA6IDApLFxyXG4gICAgICAgIGVuZENvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIChsaW5lID09IDAgPyBjb3VudCA6IDApLFxyXG4gICAgICAgIHN0YXJ0TGluZU51bWJlcjogc2VsZWN0aW9uLnN0YXJ0TGluZU51bWJlciArIGxpbmUsXHJcbiAgICAgICAgZW5kTGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIgKyBsaW5lXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmZvY3VzKCk7XHJcbiAgfVxyXG4gIGxpbmtCYXNlZEluc2VydFRleHQodHlwZSkge1xyXG4gICAgdmFyIGNvdW50ID0gdHlwZSA9PSBcImltYWdlXCIgPyA0IDogMztcclxuICAgIHZhciBleHRyYWNoYXIgPSB0eXBlID09IFwiaW1hZ2VcIiA/IFwiIVwiIDogXCJcIjtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB2YXIgbmV3VGV4dCA9IGAke2V4dHJhY2hhcn1bJHt0ZXh0fV0oKWA7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKCcnLCBbeyByYW5nZTogc2VsZWN0aW9uLCB0ZXh0OiBuZXdUZXh0IH1dKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRQb3NpdGlvbih7XHJcbiAgICAgIGxpbmVOdW1iZXI6IHNlbGVjdGlvbi5lbmRMaW5lTnVtYmVyLFxyXG4gICAgICBjb2x1bW46IHNlbGVjdGlvbi5lbmRDb2x1bW4gKyBjb3VudFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcbiAgbGlzdEJhc2VkSW5zZXJ0VGV4dCh0eXBlLCBmaWxsID0gZmFsc2UpIHtcclxuICAgIHZhciBleHRyYSA9IHR5cGUgPT0gJ3RvZG8nID8gZmlsbCA9PSB0cnVlID8gJ1t4XScgOiAnWyBdJyA6ICcnO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHZhciBuZXdUZXh0ID0gYFxcbiAtICR7ZXh0cmF9ICR7dGV4dH0gYDtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoJycsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IG5ld1RleHQgfV0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldFBvc2l0aW9uKHtcclxuICAgICAgbGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIgKyAxLFxyXG4gICAgICBjb2x1bW46IHR5cGUgPT0gJ3RvZG8nID8gOCA6IDRcclxuICAgIH0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBpbnNlcnRDb250ZW50KHR5cGUpIHtcclxuXHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2JvbGQnOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIioqXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdpdGFsaWMnOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIipcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3N0cmlrZXRocm91Z2gnOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIn5+XCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsaW5rJzpcclxuICAgICAgICB0aGlzLmxpbmtCYXNlZEluc2VydFRleHQoXCJsaW5rXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdpbWFnZSc6XHJcbiAgICAgICAgdGhpcy5saW5rQmFzZWRJbnNlcnRUZXh0KFwiaW1hZ2VcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NvZGUnOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dCgnYGBgJywgdHJ1ZSwgKzEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdpbmxpbmUtY29kZSc6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KCdgJyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3VuZG8nOlxyXG4gICAgICAgIHRoaXMuYmFzZUVkaXRvci50cmlnZ2VyKFwiXCIsIFwidW5kb1wiLCBcIlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncmVkbyc6XHJcbiAgICAgICAgdGhpcy5iYXNlRWRpdG9yLnRyaWdnZXIoJycsICdyZWRvJywgJycpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsaXN0JzpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoJ2xpbmsnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndG9kby14JzpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoJ3RvZG8nLCB0cnVlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndG9kby1vJzpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoJ3RvZG8nLCBmYWxzZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJlc2l6ZWQoZXZlbnQ6IFJlc2l6ZWRFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmxheW91dCgpO1xyXG4gICB9XHJcbn1cclxuIl19