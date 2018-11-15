/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { editor, Selection, languages } from 'monaco-editor';
import emoji from 'node-emoji';
export class YKEditorComponent {
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
    /** @type {?} */
    YKEditorComponent.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWtlZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8veWstZWRpdG9yLyIsInNvdXJjZXMiOlsibGliL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUErQixNQUFNLGVBQWUsQ0FBQztBQUNuSSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxLQUFLLE1BQU0sWUFBWSxDQUFBO0FBVTlCLE1BQU07Ozs7SUFpRkosWUFBcUIsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7NkJBdEVWLElBQUksWUFBWSxFQUFFO3dCQUVqQyxFQUFFOzJCQVNTLE9BQU87NEJBRWQsS0FBSztxQkFFSCxJQUFJO3NCQTBEUDtZQUNaLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFDM0IsV0FBVyxFQUFFLEtBQUs7WUFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNwQyxvQkFBb0IsRUFBRSxLQUFLO1lBQzNCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUFFLEtBQUs7U0FDbkI7S0FYdUM7Ozs7SUFoRnhDLElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7Ozs7SUFFRCxJQUFJLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUI7Ozs7SUFtQkQsV0FBVztRQUNULElBQUksQ0FBQyxL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O21CQUdOLFNBQVMsU0FBQyxZQUFZOzhCQUN0QixTQUFTLFNBQUMsaUJBQWlCOytCQUMzQixTQUFTLFNBQUMsa0JBQWtCOzRCQUM1QixTQUFTLFNBQUMsZUFBZTs4QkFDekIsU0FBUyxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJWaWV3SW5pdCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVkaXRvciwgU2VsZWN0aW9uLCBsYW5ndWFnZXN9IGZyb20gJ21vbmFjby1lZGl0b3InO1xyXG5pbXBvcnQgZW1vamkgZnJvbSAnbm9kZS1lbW9qaSdcclxuaW1wb3J0IHsgUmVzaXplZEV2ZW50IH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQvcmVzaXplZC1ldmVudCc7XHJcbmltcG9ydCB7IFJlc2l6ZWREaXJlY3RpdmUgfSBmcm9tICdhbmd1bGFyLXJlc2l6ZS1ldmVudC9yZXNpemVkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEFuZ3VsYXJSZXNpemVkRXZlbnRNb2R1bGUgfSBmcm9tICdhbmd1bGFyLXJlc2l6ZS1ldmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJ5ay1lZGl0b3JcIixcclxuICB0ZW1wbGF0ZVVybDogXCIuL3lrZWRpdG9yLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCIuL3lrZWRpdG9yLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFlLRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBjb250ZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBzZXQgY29udGVudCh2KSB7XHJcbiAgICB0aGlzLl9jb250ZW50ID0gdjtcclxuICAgIHRoaXMuY29udGVudENoYW5nZS5lbWl0KHYpO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIGNvbnRlbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIF9jb250ZW50ID0gXCJcIjtcclxuICBAVmlld0NoaWxkKFwiZWRpdG9yaG9zdFwiKSBob3N0OiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJlZGl0b3JDb250YWluZXJcIikgZWRpdG9yQ29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJwcmV2aWV3Q29udGFpbmVyXCIpIHByZXZpZXdDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcIm1haW5Db250YWluZXJcIikgbWFpbkNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicmVzaXplQ29udGFpbmVyXCIpIHJlc2l6ZUNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBcclxuICBiYXNlRWRpdG9yOiBhbnk7XHJcblxyXG4gIGRpc3BsYXlNb2RlOiBzdHJpbmcgPSBcInNwbGl0XCI7XHJcblxyXG4gIGlzRnVsbFNjcmVlbiA9IGZhbHNlO1xyXG5cclxuICB0aGVtZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNoYW5nZVRoZW1lKCkge1xyXG4gICAgdGhpcy50aGVtZSA9ICF0aGlzLnRoZW1lO1xyXG4gICAgdGhpcy50aGVtZSA9PSB0cnVlID8gZWRpdG9yLnNldFRoZW1lKFwidnNcIikgOiBlZGl0b3Iuc2V0VGhlbWUoXCJ2cy1kYXJrXCIpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTGF5b3V0KHR5cGUpIHtcclxuICAgIGlmICh0aGlzLmRpc3BsYXlNb2RlICE9IHR5cGUgfHwgdHlwZSA9PSBcImZ1bGxzY3JlZW5cIikge1xyXG4gICAgICB0aGlzLmRpc3BsYXlNb2RlID0gdHlwZTtcclxuICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImVkaXRcIjpcclxuICAgICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcclxuICAgICAgICAgICAgXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBcImRpc3BsYXkgOiBub25lXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcclxuICAgICAgICAgICAgXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBcIm1pbi13aWR0aCA6IDEwMCU7bWF4LXdpZHRoIDogMTAwJVwiXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInByZXZpZXdcIjpcclxuICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgICAgICBcInN0eWxlXCIsXHJcbiAgICAgICAgICAgIFwiZGlzcGxheSA6IG5vbmVcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcclxuICAgICAgICAgICAgXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBcIm1pbi13aWR0aCA6IDEwMCU7bWF4LXdpZHRoIDogMTAwJVwiXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcInNwbGl0XCI6XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIlwiKTtcclxuICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XHJcbiAgICAgICAgICB0aGlzLnJlc2l6ZUxheW91dCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImZ1bGxzY3JlZW5cIjpcclxuICAgICAgICAgIHRoaXMuaXNGdWxsU2NyZWVuID0gIXRoaXMuaXNGdWxsU2NyZWVuO1xyXG4gICAgICAgICAgaWYgKHRoaXMuaXNGdWxsU2NyZWVuID09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgICAgXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICAgIFwicG9zaXRpb246IGZpeGVkO3RvcDogMHB4O2xlZnQ6IDA7Ym90dG9tOiAwO3JpZ2h0OiAwO3dpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtcIlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxheW91dCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgICAgICAgfWJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5sYXlvdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIGVsIDogRWxlbWVudFJlZikge31cclxuICBcclxuXHJcbiAgY29uZmlnOiBhbnkgPSB7XHJcbiAgICBsYW5ndWFnZTogXCJtYXJrZG93blwiLFxyXG4gICAgbWluaW1hcDogeyBlbmFibGVkOiBmYWxzZSB9LFxyXG4gICAgbGluZU51bWJlcnM6IFwib2ZmXCIsXHJcbiAgICB0aGVtZTogdGhpcy50aGVtZSA/IFwidnNcIiA6IFwidnMtZGFya1wiLFxyXG4gICAgc2Nyb2xsQmV5b25kTGFzdExpbmU6IGZhbHNlLFxyXG4gICAgd29yZFdyYXA6IFwib25cIixcclxuICAgIGdseXBoTWFyZ2luOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yID0gZWRpdG9yLmNyZWF0ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgdGhpcy5jb25maWcpO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldE1vZGVsKGVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLmNvbnRlbnQsIFwibWFya2Rvd25cIikpO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLm9uRGlkQ2hhbmdlTW9kZWxDb250ZW50KGUgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0VmFsdWUoKTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGVtb2ppbGlzdCA9IFtdO1xyXG4gICAgZm9yICh2YXIgayBpbiBlbW9qaS5lbW9qaSkge1xyXG4gICAgICBlbW9qaWxpc3QucHVzaCh7XHJcbiAgICAgICAgbGFiZWw6IGsgKyBcIiBcIiArIGVtb2ppLmVtb2ppW2tdLFxyXG4gICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuRnVuY3Rpb24sXHJcbiAgICAgICAgaW5zZXJ0VGV4dDogayArIFwiOlwiXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxhbmd1YWdlcy5yZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIoXCJtYXJrZG93blwiLCB7XHJcbiAgICAgIHByb3ZpZGVDb21wbGV0aW9uSXRlbXM6IGZ1bmN0aW9uKG1vZGVsLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHZhciB0ZXh0VW50aWxQb3NpdGlvbiA9IG1vZGVsLmdldFZhbHVlSW5SYW5nZSh7XHJcbiAgICAgICAgICBzdGFydExpbmVOdW1iZXI6IHBvc2l0aW9uLmxpbmVOdW1iZXIsXHJcbiAgICAgICAgICBzdGFydENvbHVtbjogcG9zaXRpb24uY29sdW1uIC0gMSxcclxuICAgICAgICAgIGVuZExpbmVOdW1iZXI6IHBvc2l0aW9uLmxpbmVOdW1iZXIsXHJcbiAgICAgICAgICBlbmRDb2x1bW46IHBvc2l0aW9uLmNvbHVtblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0ZXh0VW50aWxQb3NpdGlvbiA9PT0gXCI6XCIpIHtcclxuICAgICAgICAgIHJldHVybiBlbW9qaWxpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgICAgfSxcclxuICAgICAgdHJpZ2dlckNoYXJhY3RlcnM6IFtcIjpcIl1cclxuICAgIH0pO1xyXG5cclxuICAgIGxhbmd1YWdlcy5zZXRMYW5ndWFnZUNvbmZpZ3VyYXRpb24oXCJtYXJrZG93blwiLCB7XHJcbiAgICAgIG9uRW50ZXJSdWxlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJlZm9yZVRleHQ6IC9eWy1dXFxzKC4qKS8sXHJcbiAgICAgICAgICBhY3Rpb246IHtcclxuICAgICAgICAgICAgYXBwZW5kVGV4dDogXCItIFwiLFxyXG4gICAgICAgICAgICBpbmRlbnRBY3Rpb246IGxhbmd1YWdlcy5JbmRlbnRBY3Rpb24uTm9uZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBsYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKFwibWFya2Rvd25cIiwge1xyXG4gICAgICBwcm92aWRlQ29tcGxldGlvbkl0ZW1zOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDFcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyAkezE6dGV4dH1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJoMlwiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCIjIyAkezE6dGV4dH1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJoM1wiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCIjIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDRcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMjIyAkezE6dGV4dH1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJoNVwiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCIjIyMjIyAkezE6dGV4dH1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJoNlwiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCIjIyMjIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiY29kZVwiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLlNuaXBwZXQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogW1wiYGBgXCIsIFwiJHsxOmNvZGV9XCIsIFwiYGBgXCJdLmpvaW4oXCJcXG5cIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogXCJJZi1FbHNlIFN0YXRlbWVudFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJsaW5rXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIlskezE6bGlua1RleHR9XSgkezI6dXJsfSlcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJpbWFnZVwiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCIhWyR7MTphbHRUZXh0fV0oJHsyOnVybH0pXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwibGlua3JlZmVyYW5jZVwiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJbJHsxOm5hbWV9XTogJHsyOmxpbmt9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwibGlzdFwiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJcXG4gLSAkezE6dGV4dH1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCJ0b2RvIHVuIGNoZWNrXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIlxcbiAtIFsgXSAkezI6dGV4dH1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwidG9kbyBjaGVja1wiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJcXG4gLSBbeF0gJHsyOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYmFzZUVkaXRvci51cGRhdGVPcHRpb25zKHtcclxuICAgICAgZ2x5cGhNYXJnaW46IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoY2hhciwgYWZ0ZXJjaGFybmV3TGluZSA9IGZhbHNlLCBsaW5lID0gMCkge1xyXG4gICAgdmFyIGNvdW50ID0gY2hhci50cmltKCkubGVuZ3RoO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHRleHQudHJpbSgpO1xyXG4gICAgdmFyIGJlZm9yZXNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oXHJcbiAgICAgIHNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydENvbHVtbiAtIGNvdW50LFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25MaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25Db2x1bW4gLSB0ZXh0Lmxlbmd0aFxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgYWZ0ZXJzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKFxyXG4gICAgICBzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25Db2x1bW4sXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkxpbmVOdW1iZXIsXHJcbiAgICAgIHNlbGVjdGlvbi5wb3NpdGlvbkNvbHVtbiArIGNvdW50XHJcbiAgICApO1xyXG5cclxuICAgIHZhciBzdGFydGNoYXIgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2UoYmVmb3Jlc2VsZWN0aW9uKTtcclxuICAgIHZhciBlbmRjaGFyID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKGFmdGVyc2VsZWN0aW9uKTtcclxuXHJcbiAgICBpZiAoc3RhcnRjaGFyID09IGNoYXIgJiYgZW5kY2hhciA9PSBjaGFyKSB7XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoXCJcIiwgW3sgcmFuZ2U6IGFmdGVyc2VsZWN0aW9uLCB0ZXh0OiBcIlwiIH1dKTtcclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cyhcIlwiLCBbeyByYW5nZTogYmVmb3Jlc2VsZWN0aW9uLCB0ZXh0OiBcIlwiIH1dKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRleHQgPSBgJHthZnRlcmNoYXJuZXdMaW5lID09IHRydWUgPyBcIlxcblwiIDogXCJcIn0ke2NoYXJ9JHtcclxuICAgICAgICBhZnRlcmNoYXJuZXdMaW5lID09IHRydWUgPyBcIlxcblwiIDogXCJcIlxyXG4gICAgICB9JHt0ZXh0fSR7YWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gXCJcXG5cIiA6IFwiXCJ9JHtjaGFyfWA7XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoXCJcIiwgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogdGV4dCB9XSk7XHJcblxyXG4gICAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0U2VsZWN0aW9uKHtcclxuICAgICAgICBzdGFydENvbHVtbjogc2VsZWN0aW9uLnN0YXJ0Q29sdW1uICsgKGxpbmUgPT0gMCA/IGNvdW50IDogMCksXHJcbiAgICAgICAgZW5kQ29sdW1uOiBzZWxlY3Rpb24uZW5kQ29sdW1uICsgKGxpbmUgPT0gMCA/IGNvdW50IDogMCksXHJcbiAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiBzZWxlY3Rpb24uc3RhcnRMaW5lTnVtYmVyICsgbGluZSxcclxuICAgICAgICBlbmRMaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlciArIGxpbmVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcbiAgbGlua0Jhc2VkSW5zZXJ0VGV4dCh0eXBlKSB7XHJcbiAgICB2YXIgY291bnQgPSB0eXBlID09IFwiaW1hZ2VcIiA/IDQgOiAzO1xyXG4gICAgdmFyIGV4dHJhY2hhciA9IHR5cGUgPT0gXCJpbWFnZVwiID8gXCIhXCIgOiBcIlwiO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHZhciBuZXdUZXh0ID0gYCR7ZXh0cmFjaGFyfVske3RleHR9XSgpYDtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoXCJcIiwgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogbmV3VGV4dCB9XSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0UG9zaXRpb24oe1xyXG4gICAgICBsaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlcixcclxuICAgICAgY29sdW1uOiBzZWxlY3Rpb24uZW5kQ29sdW1uICsgY291bnRcclxuICAgIH0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmZvY3VzKCk7XHJcbiAgfVxyXG4gIGxpc3RCYXNlZEluc2VydFRleHQodHlwZSwgZmlsbCA9IGZhbHNlKSB7XHJcbiAgICB2YXIgZXh0cmEgPSB0eXBlID09IFwidG9kb1wiID8gKGZpbGwgPT0gdHJ1ZSA/IFwiW3hdXCIgOiBcIlsgXVwiKSA6IFwiXCI7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmJhc2VFZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICB2YXIgdGV4dCA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShzZWxlY3Rpb24pO1xyXG4gICAgdmFyIG5ld1RleHQgPSBgXFxuIC0gJHtleHRyYX0gJHt0ZXh0fSBgO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmV4ZWN1dGVFZGl0cyhcIlwiLCBbeyByYW5nZTogc2VsZWN0aW9uLCB0ZXh0OiBuZXdUZXh0IH1dKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRQb3NpdGlvbih7XHJcbiAgICAgIGxpbmVOdW1iZXI6IHNlbGVjdGlvbi5lbmRMaW5lTnVtYmVyICsgMSxcclxuICAgICAgY29sdW1uOiB0eXBlID09IFwidG9kb1wiID8gOCA6IDRcclxuICAgIH0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBpbnNlcnRDb250ZW50KHR5cGUpIHtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlIFwiYm9sZFwiOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIioqXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiaXRhbGljXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiKlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInN0cmlrZXRocm91Z2hcIjpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoXCJ+flwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImxpbmtcIjpcclxuICAgICAgICB0aGlzLmxpbmtCYXNlZEluc2VydFRleHQoXCJsaW5rXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiaW1hZ2VcIjpcclxuICAgICAgICB0aGlzLmxpbmtCYXNlZEluc2VydFRleHQoXCJpbWFnZVwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImNvZGVcIjpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoXCJgYGBcIiwgdHJ1ZSwgKzEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiaW5saW5lLWNvZGVcIjpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoXCJgXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwidW5kb1wiOlxyXG4gICAgICAgIHRoaXMuYmFzZUVkaXRvci50cmlnZ2VyKFwiXCIsIFwidW5kb1wiLCBcIlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInJlZG9cIjpcclxuICAgICAgICB0aGlzLmJhc2VFZGl0b3IudHJpZ2dlcihcIlwiLCBcInJlZG9cIiwgXCJcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJsaXN0XCI6XHJcbiAgICAgICAgdGhpcy5saXN0QmFzZWRJbnNlcnRUZXh0KFwibGlua1wiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInRvZG8teFwiOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dChcInRvZG9cIiwgdHJ1ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJ0b2RvLW9cIjpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoXCJ0b2RvXCIsIGZhbHNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUmVzaXplZChldmVudDogUmVzaXplZEV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IubGF5b3V0KCk7XHJcbiAgICB0aGlzLnJlc2l6ZUxheW91dCgpO1xyXG4gIH1cclxuICByZXNpemVMYXlvdXQoKSB7XHJcbiAgICB2YXIgd2l0ZGggPSB0aGlzLnJlc2l6ZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpdGRoIC8gMiArIFwicHhcIjtcclxuICAgIHRoaXMucHJldmlld0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gd2l0ZGggLyAyICsgXCJweFwiO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICB9XHJcbn1cclxuIl19