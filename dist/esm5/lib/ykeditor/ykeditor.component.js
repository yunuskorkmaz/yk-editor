/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { editor, Selection, languages } from 'monaco-editor';
import emoji from 'node-emoji';
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
    /** @type {?} */
    YKEditorComponent.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWtlZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8veWstZWRpdG9yLyIsInNvdXJjZXMiOlsibGliL3lrZWRpdG9yL3lrZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUErQixNQUFNLGVBQWUsQ0FBQztBQUNuSSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxLQUFLLE1BQU0sWUFBWSxDQUFBOztJQTJGNUIsMkJBQXFCLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhOzZCQXRFVixJQUFJLFlBQVksRUFBRTt3QkFFakMsRUFBRTsyQkFTUyxPQUFPOzRCQUVkLEtBQUs7cUJBRUgsSUFBSTtzQkEwRFA7WUFDWixRQUFRLEVBQUUsVUFBVTtZQUNwQixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQzNCLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDcEMsb0JBQW9CLEVBQUUsS0FBSztZQUMzQixRQUFRLEVBQUUsSUFBSTtZQUNkLFdBQVcsRUFBRSxLQUFLO1NBQ25CO0tBWHVDO0lBaEZ4QyxzQkFDSSxzQ0FBTzs7OztRQURYO1lBRUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3RCOzs7OztRQUVELFVBQVksQ0FBQztZQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCOzs7T0FMQTs7OztJQXdCRCx1Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMs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QUFDO0tBQ3JCOztnQkE3V0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQiw4d0ZBQXdDOztpQkFFekM7Ozs7Z0JBWHNDLFVBQVU7OzswQkFhOUMsS0FBSztnQ0FVTCxNQUFNO3VCQUdOLFNBQVMsU0FBQyxZQUFZO2tDQUN0QixTQUFTLFNBQUMsaUJBQWlCO21DQUMzQixTQUFTLFNBQUMsa0JBQWtCO2dDQUM1QixTQUFTLFNBQUMsZUFBZTtrQ0FDekIsU0FBUyxTQUFDLGlCQUFpQjs7NEJBOUI5Qjs7U0FZYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBlZGl0b3IsIFNlbGVjdGlvbiwgbGFuZ3VhZ2VzfSBmcm9tICdtb25hY28tZWRpdG9yJztcclxuaW1wb3J0IGVtb2ppIGZyb20gJ25vZGUtZW1vamknXHJcbmltcG9ydCB7IFJlc2l6ZWRFdmVudCB9IGZyb20gJ2FuZ3VsYXItcmVzaXplLWV2ZW50L3Jlc2l6ZWQtZXZlbnQnO1xyXG5pbXBvcnQgeyBSZXNpemVkRGlyZWN0aXZlIH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQvcmVzaXplZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBBbmd1bGFyUmVzaXplZEV2ZW50TW9kdWxlIH0gZnJvbSAnYW5ndWxhci1yZXNpemUtZXZlbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwieWstZWRpdG9yXCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi95a2VkaXRvci5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi95a2VkaXRvci5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBZS0VkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgY29udGVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xyXG4gIH1cclxuXHJcbiAgc2V0IGNvbnRlbnQodikge1xyXG4gICAgdGhpcy5fY29udGVudCA9IHY7XHJcbiAgICB0aGlzLmNvbnRlbnRDaGFuZ2UuZW1pdCh2KTtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBjb250ZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBfY29udGVudCA9IFwiXCI7XHJcbiAgQFZpZXdDaGlsZChcImVkaXRvcmhvc3RcIikgaG9zdDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiZWRpdG9yQ29udGFpbmVyXCIpIGVkaXRvckNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwicHJldmlld0NvbnRhaW5lclwiKSBwcmV2aWV3Q29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJtYWluQ29udGFpbmVyXCIpIG1haW5Db250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcInJlc2l6ZUNvbnRhaW5lclwiKSByZXNpemVDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgXHJcbiAgYmFzZUVkaXRvcjogYW55O1xyXG5cclxuICBkaXNwbGF5TW9kZTogc3RyaW5nID0gXCJzcGxpdFwiO1xyXG5cclxuICBpc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgdGhlbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjaGFuZ2VUaGVtZSgpIHtcclxuICAgIHRoaXMudGhlbWUgPSAhdGhpcy50aGVtZTtcclxuICAgIHRoaXMudGhlbWUgPT0gdHJ1ZSA/IGVkaXRvci5zZXRUaGVtZShcInZzXCIpIDogZWRpdG9yLnNldFRoZW1lKFwidnMtZGFya1wiKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUxheW91dCh0eXBlKSB7XHJcbiAgICBpZiAodGhpcy5kaXNwbGF5TW9kZSAhPSB0eXBlIHx8IHR5cGUgPT0gXCJmdWxsc2NyZWVuXCIpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5TW9kZSA9IHR5cGU7XHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJlZGl0XCI6XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgXCJkaXNwbGF5IDogbm9uZVwiXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgXCJtaW4td2lkdGggOiAxMDAlO21heC13aWR0aCA6IDEwMCVcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJwcmV2aWV3XCI6XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcclxuICAgICAgICAgICAgXCJzdHlsZVwiLFxyXG4gICAgICAgICAgICBcImRpc3BsYXkgOiBub25lXCJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgXCJtaW4td2lkdGggOiAxMDAlO21heC13aWR0aCA6IDEwMCVcIlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJzcGxpdFwiOlxyXG4gICAgICAgICAgdGhpcy5wcmV2aWV3Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XHJcbiAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmdWxsc2NyZWVuXCI6XHJcbiAgICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbiA9ICF0aGlzLmlzRnVsbFNjcmVlbjtcclxuICAgICAgICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbiA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgICAgICAgIFwic3R5bGVcIixcclxuICAgICAgICAgICAgICBcInBvc2l0aW9uOiBmaXhlZDt0b3A6IDBweDtsZWZ0OiAwO2JvdHRvbTogMDtyaWdodDogMDt3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxheW91dCgpO1xyXG4gICAgICAgIH1icmVhaztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IubGF5b3V0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBlbCA6IEVsZW1lbnRSZWYpIHt9XHJcbiAgXHJcblxyXG4gIGNvbmZpZzogYW55ID0ge1xyXG4gICAgbGFuZ3VhZ2U6IFwibWFya2Rvd25cIixcclxuICAgIG1pbmltYXA6IHsgZW5hYmxlZDogZmFsc2UgfSxcclxuICAgIGxpbmVOdW1iZXJzOiBcIm9mZlwiLFxyXG4gICAgdGhlbWU6IHRoaXMudGhlbWUgPyBcInZzXCIgOiBcInZzLWRhcmtcIixcclxuICAgIHNjcm9sbEJleW9uZExhc3RMaW5lOiBmYWxzZSxcclxuICAgIHdvcmRXcmFwOiBcIm9uXCIsXHJcbiAgICBnbHlwaE1hcmdpbjogZmFsc2VcclxuICB9O1xyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYmFzZUVkaXRvciA9IGVkaXRvci5jcmVhdGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuY29uZmlnKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5zZXRNb2RlbChlZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5jb250ZW50LCBcIm1hcmtkb3duXCIpKTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5vbkRpZENoYW5nZU1vZGVsQ29udGVudChlID0+IHtcclxuICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5iYXNlRWRpdG9yLmdldFZhbHVlKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBlbW9qaWxpc3QgPSBbXTtcclxuICAgIGZvciAodmFyIGsgaW4gZW1vamkuZW1vamkpIHtcclxuICAgICAgZW1vamlsaXN0LnB1c2goe1xyXG4gICAgICAgIGxhYmVsOiBrICsgXCIgXCIgKyBlbW9qaS5lbW9qaVtrXSxcclxuICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uLFxyXG4gICAgICAgIGluc2VydFRleHQ6IGsgKyBcIjpcIlxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKFwibWFya2Rvd25cIiwge1xyXG4gICAgICBwcm92aWRlQ29tcGxldGlvbkl0ZW1zOiBmdW5jdGlvbihtb2RlbCwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdGV4dFVudGlsUG9zaXRpb24gPSBtb2RlbC5nZXRWYWx1ZUluUmFuZ2Uoe1xyXG4gICAgICAgICAgc3RhcnRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLFxyXG4gICAgICAgICAgc3RhcnRDb2x1bW46IHBvc2l0aW9uLmNvbHVtbiAtIDEsXHJcbiAgICAgICAgICBlbmRMaW5lTnVtYmVyOiBwb3NpdGlvbi5saW5lTnVtYmVyLFxyXG4gICAgICAgICAgZW5kQ29sdW1uOiBwb3NpdGlvbi5jb2x1bW5cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGV4dFVudGlsUG9zaXRpb24gPT09IFwiOlwiKSB7XHJcbiAgICAgICAgICByZXR1cm4gZW1vamlsaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIH0sXHJcbiAgICAgIHRyaWdnZXJDaGFyYWN0ZXJzOiBbXCI6XCJdXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW5ndWFnZXMuc2V0TGFuZ3VhZ2VDb25maWd1cmF0aW9uKFwibWFya2Rvd25cIiwge1xyXG4gICAgICBvbkVudGVyUnVsZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBiZWZvcmVUZXh0OiAvXlstXVxccyguKikvLFxyXG4gICAgICAgICAgYWN0aW9uOiB7XHJcbiAgICAgICAgICAgIGFwcGVuZFRleHQ6IFwiLSBcIixcclxuICAgICAgICAgICAgaW5kZW50QWN0aW9uOiBsYW5ndWFnZXMuSW5kZW50QWN0aW9uLk5vbmVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgbGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcihcIm1hcmtkb3duXCIsIHtcclxuICAgICAgcHJvdmlkZUNvbXBsZXRpb25JdGVtczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImgxXCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDJcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDNcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMjICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImg0XCIsXHJcbiAgICAgICAgICAgIGtpbmQ6IGxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgaW5zZXJ0VGV4dDoge1xyXG4gICAgICAgICAgICAgIHZhbHVlOiBcIiMjIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDVcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMjIyMgJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaDZcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIyMjIyMjICR7MTp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImNvZGVcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5TbmlwcGV0LFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFtcImBgYFwiLCBcIiR7MTpjb2RlfVwiLCBcImBgYFwiXS5qb2luKFwiXFxuXCIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRvY3VtZW50YXRpb246IFwiSWYtRWxzZSBTdGF0ZW1lbnRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwibGlua1wiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJbJHsxOmxpbmtUZXh0fV0oJHsyOnVybH0pXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwiaW1hZ2VcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiIVskezE6YWx0VGV4dH1dKCR7Mjp1cmx9KVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImxpbmtyZWZlcmFuY2VcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiWyR7MTpuYW1lfV06ICR7MjpsaW5rfVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcImxpc3RcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiXFxuIC0gJHsxOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwidG9kbyB1biBjaGVja1wiLFxyXG4gICAgICAgICAgICBraW5kOiBsYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLktleXdvcmQsXHJcbiAgICAgICAgICAgIGluc2VydFRleHQ6IHtcclxuICAgICAgICAgICAgICB2YWx1ZTogXCJcXG4gLSBbIF0gJHsyOnRleHR9XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBcInRvZG8gY2hlY2tcIixcclxuICAgICAgICAgICAga2luZDogbGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5LZXl3b3JkLFxyXG4gICAgICAgICAgICBpbnNlcnRUZXh0OiB7XHJcbiAgICAgICAgICAgICAgdmFsdWU6IFwiXFxuIC0gW3hdICR7Mjp0ZXh0fVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmJhc2VFZGl0b3IudXBkYXRlT3B0aW9ucyh7XHJcbiAgICAgIGdseXBoTWFyZ2luOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KGNoYXIsIGFmdGVyY2hhcm5ld0xpbmUgPSBmYWxzZSwgbGluZSA9IDApIHtcclxuICAgIHZhciBjb3VudCA9IGNoYXIudHJpbSgpLmxlbmd0aDtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB0ZXh0LnRyaW0oKTtcclxuICAgIHZhciBiZWZvcmVzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKFxyXG4gICAgICBzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnRDb2x1bW4gLSBjb3VudCxcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uTGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uIC0gdGV4dC5sZW5ndGhcclxuICAgICk7XHJcblxyXG4gICAgdmFyIGFmdGVyc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihcclxuICAgICAgc2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlcixcclxuICAgICAgc2VsZWN0aW9uLnBvc2l0aW9uQ29sdW1uLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25MaW5lTnVtYmVyLFxyXG4gICAgICBzZWxlY3Rpb24ucG9zaXRpb25Db2x1bW4gKyBjb3VudFxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgc3RhcnRjaGFyID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKGJlZm9yZXNlbGVjdGlvbik7XHJcbiAgICB2YXIgZW5kY2hhciA9IHRoaXMuYmFzZUVkaXRvci5nZXRNb2RlbCgpLmdldFZhbHVlSW5SYW5nZShhZnRlcnNlbGVjdGlvbik7XHJcblxyXG4gICAgaWYgKHN0YXJ0Y2hhciA9PSBjaGFyICYmIGVuZGNoYXIgPT0gY2hhcikge1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBhZnRlcnNlbGVjdGlvbiwgdGV4dDogXCJcIiB9XSk7XHJcbiAgICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoXCJcIiwgW3sgcmFuZ2U6IGJlZm9yZXNlbGVjdGlvbiwgdGV4dDogXCJcIiB9XSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZXh0ID0gYCR7YWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gXCJcXG5cIiA6IFwiXCJ9JHtjaGFyfSR7XHJcbiAgICAgICAgYWZ0ZXJjaGFybmV3TGluZSA9PSB0cnVlID8gXCJcXG5cIiA6IFwiXCJcclxuICAgICAgfSR7dGV4dH0ke2FmdGVyY2hhcm5ld0xpbmUgPT0gdHJ1ZSA/IFwiXFxuXCIgOiBcIlwifSR7Y2hhcn1gO1xyXG4gICAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IHRleHQgfV0pO1xyXG5cclxuICAgICAgdGhpcy5iYXNlRWRpdG9yLnNldFNlbGVjdGlvbih7XHJcbiAgICAgICAgc3RhcnRDb2x1bW46IHNlbGVjdGlvbi5zdGFydENvbHVtbiArIChsaW5lID09IDAgPyBjb3VudCA6IDApLFxyXG4gICAgICAgIGVuZENvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIChsaW5lID09IDAgPyBjb3VudCA6IDApLFxyXG4gICAgICAgIHN0YXJ0TGluZU51bWJlcjogc2VsZWN0aW9uLnN0YXJ0TGluZU51bWJlciArIGxpbmUsXHJcbiAgICAgICAgZW5kTGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIgKyBsaW5lXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmZvY3VzKCk7XHJcbiAgfVxyXG4gIGxpbmtCYXNlZEluc2VydFRleHQodHlwZSkge1xyXG4gICAgdmFyIGNvdW50ID0gdHlwZSA9PSBcImltYWdlXCIgPyA0IDogMztcclxuICAgIHZhciBleHRyYWNoYXIgPSB0eXBlID09IFwiaW1hZ2VcIiA/IFwiIVwiIDogXCJcIjtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuYmFzZUVkaXRvci5nZXRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5iYXNlRWRpdG9yLmdldE1vZGVsKCkuZ2V0VmFsdWVJblJhbmdlKHNlbGVjdGlvbik7XHJcbiAgICB2YXIgbmV3VGV4dCA9IGAke2V4dHJhY2hhcn1bJHt0ZXh0fV0oKWA7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3IuZXhlY3V0ZUVkaXRzKFwiXCIsIFt7IHJhbmdlOiBzZWxlY3Rpb24sIHRleHQ6IG5ld1RleHQgfV0pO1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLnNldFBvc2l0aW9uKHtcclxuICAgICAgbGluZU51bWJlcjogc2VsZWN0aW9uLmVuZExpbmVOdW1iZXIsXHJcbiAgICAgIGNvbHVtbjogc2VsZWN0aW9uLmVuZENvbHVtbiArIGNvdW50XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuICBsaXN0QmFzZWRJbnNlcnRUZXh0KHR5cGUsIGZpbGwgPSBmYWxzZSkge1xyXG4gICAgdmFyIGV4dHJhID0gdHlwZSA9PSBcInRvZG9cIiA/IChmaWxsID09IHRydWUgPyBcIlt4XVwiIDogXCJbIF1cIikgOiBcIlwiO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5iYXNlRWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmJhc2VFZGl0b3IuZ2V0TW9kZWwoKS5nZXRWYWx1ZUluUmFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIHZhciBuZXdUZXh0ID0gYFxcbiAtICR7ZXh0cmF9ICR7dGV4dH0gYDtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5leGVjdXRlRWRpdHMoXCJcIiwgW3sgcmFuZ2U6IHNlbGVjdGlvbiwgdGV4dDogbmV3VGV4dCB9XSk7XHJcbiAgICB0aGlzLmJhc2VFZGl0b3Iuc2V0UG9zaXRpb24oe1xyXG4gICAgICBsaW5lTnVtYmVyOiBzZWxlY3Rpb24uZW5kTGluZU51bWJlciArIDEsXHJcbiAgICAgIGNvbHVtbjogdHlwZSA9PSBcInRvZG9cIiA/IDggOiA0XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYmFzZUVkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgaW5zZXJ0Q29udGVudCh0eXBlKSB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSBcImJvbGRcIjpcclxuICAgICAgICB0aGlzLmNoYXJSZXBlYXRCYXNlZEluc2VydFRleHQoXCIqKlwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIml0YWxpY1wiOlxyXG4gICAgICAgIHRoaXMuY2hhclJlcGVhdEJhc2VkSW5zZXJ0VGV4dChcIipcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzdHJpa2V0aHJvdWdoXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwifn5cIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJsaW5rXCI6XHJcbiAgICAgICAgdGhpcy5saW5rQmFzZWRJbnNlcnRUZXh0KFwibGlua1wiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImltYWdlXCI6XHJcbiAgICAgICAgdGhpcy5saW5rQmFzZWRJbnNlcnRUZXh0KFwiaW1hZ2VcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjb2RlXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiYGBgXCIsIHRydWUsICsxKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImlubGluZS1jb2RlXCI6XHJcbiAgICAgICAgdGhpcy5jaGFyUmVwZWF0QmFzZWRJbnNlcnRUZXh0KFwiYFwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInVuZG9cIjpcclxuICAgICAgICB0aGlzLmJhc2VFZGl0b3IudHJpZ2dlcihcIlwiLCBcInVuZG9cIiwgXCJcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJyZWRvXCI6XHJcbiAgICAgICAgdGhpcy5iYXNlRWRpdG9yLnRyaWdnZXIoXCJcIiwgXCJyZWRvXCIsIFwiXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwibGlzdFwiOlxyXG4gICAgICAgIHRoaXMubGlzdEJhc2VkSW5zZXJ0VGV4dChcImxpbmtcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJ0b2RvLXhcIjpcclxuICAgICAgICB0aGlzLmxpc3RCYXNlZEluc2VydFRleHQoXCJ0b2RvXCIsIHRydWUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwidG9kby1vXCI6XHJcbiAgICAgICAgdGhpcy5saXN0QmFzZWRJbnNlcnRUZXh0KFwidG9kb1wiLCBmYWxzZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJlc2l6ZWQoZXZlbnQ6IFJlc2l6ZWRFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5iYXNlRWRpdG9yLmxheW91dCgpO1xyXG4gICAgdGhpcy5yZXNpemVMYXlvdXQoKTtcclxuICB9XHJcbiAgcmVzaXplTGF5b3V0KCkge1xyXG4gICAgdmFyIHdpdGRoID0gdGhpcy5yZXNpemVDb250YWluZXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aXRkaCAvIDIgKyBcInB4XCI7XHJcbiAgICB0aGlzLnByZXZpZXdDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpdGRoIC8gMiArIFwicHhcIjtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzaXplTGF5b3V0KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==