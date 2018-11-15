(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./lib/yk-editor/src/index.ts":
/*!************************************!*\
  !*** ./lib/yk-editor/src/index.ts ***!
  \************************************/
/*! exports provided: YkEditorModule, YKEditorComponent, MarkdownDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_yk_editor_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/yk-editor.module */ "./lib/yk-editor/src/lib/yk-editor.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "YkEditorModule", function() { return _lib_yk_editor_module__WEBPACK_IMPORTED_MODULE_0__["YkEditorModule"]; });

/* harmony import */ var _lib_ykeditor_ykeditor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/ykeditor/ykeditor.component */ "./lib/yk-editor/src/lib/ykeditor/ykeditor.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "YKEditorComponent", function() { return _lib_ykeditor_ykeditor_component__WEBPACK_IMPORTED_MODULE_1__["YKEditorComponent"]; });

/* harmony import */ var _lib_markdown_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/markdown.directive */ "./lib/yk-editor/src/lib/markdown.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MarkdownDirective", function() { return _lib_markdown_directive__WEBPACK_IMPORTED_MODULE_2__["MarkdownDirective"]; });

/*
 * Public API Surface of yk-md-editor
 */





/***/ }),

/***/ "./lib/yk-editor/src/lib/markdown.directive.ts":
/*!*****************************************************!*\
  !*** ./lib/yk-editor/src/lib/markdown.directive.ts ***!
  \*****************************************************/
/*! exports provided: MarkdownDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownDirective", function() { return MarkdownDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marked */ "./lib/yk-editor/node_modules/marked/lib/marked.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(marked__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highlight.js */ "./lib/yk-editor/node_modules/highlight.js/lib/index.js");
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(highlight_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var node_emoji__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node-emoji */ "./lib/yk-editor/node_modules/node-emoji/index.js");
/* harmony import */ var node_emoji__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_emoji__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MarkdownDirective = /** @class */ (function () {
    function MarkdownDirective(el, sanitize, render2) {
        this.el = el;
        this.sanitize = sanitize;
        this.render2 = render2;
        this.renderer = new marked__WEBPACK_IMPORTED_MODULE_1___default.a.Renderer();
        this.markedRenderer();
        this.renderMarkdown("");
    }
    Object.defineProperty(MarkdownDirective.prototype, "markdowntext", {
        set: function (v) {
            if (v != null && v != this._content) {
                this._content = v;
                this.renderMarkdown(this._content);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownDirective.prototype, "html", {
        get: function () {
            return this.markedContent;
        },
        enumerable: true,
        configurable: true
    });
    MarkdownDirective.prototype.renderMarkdown = function (text) {
        var replacer = function (match) { return node_emoji__WEBPACK_IMPORTED_MODULE_4___default.a.emojify(match); };
        text = text.replace(/(:.*:)/g, replacer);
        this.markedContent = marked__WEBPACK_IMPORTED_MODULE_1___default()(text);
        this.markedContent = this.sanitize.bypassSecurityTrustHtml(this.markedContent);
        this.el.nativeElement.innerHTML = this.sanitize.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SecurityContext"].HTML, this.markedContent);
    };
    MarkdownDirective.prototype.markedRenderer = function () {
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
        marked__WEBPACK_IMPORTED_MODULE_1___default.a.setOptions({
            highlight: function (code) {
                return highlight_js__WEBPACK_IMPORTED_MODULE_2___default.a.highlightAuto(code).value;
            },
            renderer: this.renderer,
            tables: true,
            sanitize: false,
            smartLists: true,
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MarkdownDirective.prototype, "markdowntext", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], MarkdownDirective.prototype, "html", null);
    MarkdownDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[markdown]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], MarkdownDirective);
    return MarkdownDirective;
}());



/***/ }),

/***/ "./lib/yk-editor/src/lib/yk-editor.module.ts":
/*!***************************************************!*\
  !*** ./lib/yk-editor/src/lib/yk-editor.module.ts ***!
  \***************************************************/
/*! exports provided: YkEditorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YkEditorModule", function() { return YkEditorModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ykeditor_ykeditor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ykeditor/ykeditor.component */ "./lib/yk-editor/src/lib/ykeditor/ykeditor.component.ts");
/* harmony import */ var _markdown_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./markdown.directive */ "./lib/yk-editor/src/lib/markdown.directive.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var angular_resize_event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-resize-event */ "./node_modules/angular-resize-event/angular-resize-event.umd.js");
/* harmony import */ var angular_resize_event__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular_resize_event__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var YkEditorModule = /** @class */ (function () {
    function YkEditorModule() {
    }
    YkEditorModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                angular_resize_event__WEBPACK_IMPORTED_MODULE_4__["AngularResizedEventModule"]
            ],
            declarations: [_ykeditor_ykeditor_component__WEBPACK_IMPORTED_MODULE_1__["YKEditorComponent"], _markdown_directive__WEBPACK_IMPORTED_MODULE_2__["MarkdownDirective"]],
            exports: [_ykeditor_ykeditor_component__WEBPACK_IMPORTED_MODULE_1__["YKEditorComponent"], _markdown_directive__WEBPACK_IMPORTED_MODULE_2__["MarkdownDirective"]]
        })
    ], YkEditorModule);
    return YkEditorModule;
}());



/***/ }),

/***/ "./lib/yk-editor/src/lib/ykeditor/ykeditor.component.css":
/*!***************************************************************!*\
  !*** ./lib/yk-editor/src/lib/ykeditor/ykeditor.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./lib/yk-editor/src/lib/ykeditor/ykeditor.component.html":
/*!****************************************************************!*\
  !*** ./lib/yk-editor/src/lib/ykeditor/ykeditor.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div (resized)=\"onResized($event)\" class=\"main-container\" #mainContainer>\n  <div class=\"toolbar\">\n    <div>\n      <button (click)=\"insertContent('undo')\">\n        <i class=\"yi undo\"></i>\n      </button>\n      <button (click)=\"insertContent('redo')\">\n        <i class=\"yi repeat\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('bold')\">\n        <i class=\"yi bold\"></i>\n      </button>\n      <button (click)=\"insertContent('italic')\">\n        <i class=\"yi italic\"></i>\n      </button>\n\n      <button (click)=\"insertContent('strikethrough')\">\n        <i class=\"yi strikethrough\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('link')\">\n        <i class=\"yi link\"></i>\n      </button>\n      <button (click)=\"insertContent('image')\">\n        <i class=\"yi picture-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"insertContent('code')\">\n        <i class=\"yi code\"></i>\n      </button>\n      <button (click)=\"insertContent('inline-code')\">\n        <i class=\"yi terminal\"></i>\n      </button>\n      <button (click)=\"insertContent('list')\">\n        <i class=\"yi list-ul\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-x')\">\n        <i class=\"yi check-square-o\"></i>\n      </button>\n      <button (click)=\"insertContent('todo-o')\">\n        <i class=\"yi square-o\"></i>\n      </button>\n      <span class=\"sparator\"></span>\n      <button (click)=\"changeTheme()\">\n        <i class=\"yi\" [ngClass]=\"{'moon-o': theme, 'sun-o': !theme}\"></i>\n      </button>\n      <button (click)=\"changeLayout('fullscreen')\">\n        <i class=\"yi arrows-alt\"></i>\n      </button>\n    </div>\n    <div class=\"btn-group\">\n      <button (click)=\"changeLayout('edit')\" [ngClass]=\"{'active': displayMode == 'edit'}\">\n        <i class=\"yi pencil-square-o\"></i>\n      </button>\n      <button (click)=\"changeLayout('split')\" [ngClass]=\" {'active': displayMode=='split' }\">\n        <i class=\"yi columns\"></i>\n      </button>\n      <button (click)=\"changeLayout('preview')\" [ngClass]=\"{'active': displayMode == 'preview'}\">\n        <i class=\"yi eye\"></i>\n      </button>\n    </div>\n\n  </div>\n  <div (resized)=\"onResized($event)\" #resizeContainer class=\"editor-container\">\n    <div (resized)=\"onResized($event)\" class=\"editor\" #editorContainer>\n      <div class=\"monaco-editor\" #editorhost></div>\n    </div>\n    <div (resized)=\"onResized($event)\" class=\"preview\" #previewContainer [ngClass]=\"{'light': theme, 'dark':!theme}\">\n      <div markdown [markdowntext]=\"content\" class=\"rendered-markdown\"></div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./lib/yk-editor/src/lib/ykeditor/ykeditor.component.ts":
/*!**************************************************************!*\
  !*** ./lib/yk-editor/src/lib/ykeditor/ykeditor.component.ts ***!
  \**************************************************************/
/*! exports provided: YKEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YKEditorComponent", function() { return YKEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var monaco_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! monaco-editor */ "./lib/yk-editor/node_modules/monaco-editor/esm/vs/editor/editor.main.js");
/* harmony import */ var node_emoji__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node-emoji */ "./lib/yk-editor/node_modules/node-emoji/index.js");
/* harmony import */ var node_emoji__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_emoji__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var YKEditorComponent = /** @class */ (function () {
    function YKEditorComponent() {
        this.contentChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
        get: function () {
            return this._content;
        },
        set: function (v) {
            this._content = v;
            this.contentChange.emit(v);
        },
        enumerable: true,
        configurable: true
    });
    YKEditorComponent.prototype.changeTheme = function () {
        this.theme = !this.theme;
        this.theme == true ? monaco_editor__WEBPACK_IMPORTED_MODULE_1__["editor"].setTheme("vs") : monaco_editor__WEBPACK_IMPORTED_MODULE_1__["editor"].setTheme("vs-dark");
    };
    YKEditorComponent.prototype.changeLayout = function (type) {
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
    YKEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.baseEditor = monaco_editor__WEBPACK_IMPORTED_MODULE_1__["editor"].create(this.host.nativeElement, this.config);
        this.baseEditor.setModel(monaco_editor__WEBPACK_IMPORTED_MODULE_1__["editor"].createModel(this.content, 'markdown'));
        this.baseEditor.onDidChangeModelContent(function (e) {
            _this.content = _this.baseEditor.getValue();
        });
        var emojilist = [];
        for (var k in node_emoji__WEBPACK_IMPORTED_MODULE_2___default.a.emoji) {
            emojilist.push({ label: k + " " + node_emoji__WEBPACK_IMPORTED_MODULE_2___default.a.emoji[k], kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Function, insertText: k + ":" });
        }
        monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].registerCompletionItemProvider('markdown', {
            provideCompletionItems: function (model, position) {
                var textUntilPosition = model.getValueInRange({ startLineNumber: position.lineNumber, startColumn: position.column - 1, endLineNumber: position.lineNumber, endColumn: position.column });
                if (textUntilPosition === ':') {
                    return emojilist;
                }
                return [];
            },
            triggerCharacters: [':']
        });
        monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].setLanguageConfiguration('markdown', {
            onEnterRules: [
                {
                    beforeText: /^[-]\s(.*)/,
                    action: { appendText: '- ', indentAction: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].IndentAction.None }
                }
            ]
        });
        monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].registerCompletionItemProvider('markdown', {
            provideCompletionItems: function () {
                return [
                    {
                        label: 'h1',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '# ${1:text}'
                        }
                    },
                    {
                        label: 'h2',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '## ${1:text}'
                        }
                    },
                    {
                        label: 'h3',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '### ${1:text}'
                        }
                    },
                    {
                        label: 'h4',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '#### ${1:text}'
                        }
                    },
                    {
                        label: 'h5',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '##### ${1:text}'
                        }
                    },
                    {
                        label: 'h6',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '###### ${1:text}'
                        }
                    },
                    {
                        label: 'code',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Snippet,
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
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '[${1:linkText}](${2:url})'
                        }
                    },
                    {
                        label: 'image',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '![${1:altText}](${2:url})'
                        }
                    },
                    {
                        label: 'linkreferance',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '[${1:name}]: ${2:link}'
                        }
                    },
                    {
                        label: 'list',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '\n - ${1:text}'
                        }
                    },
                    {
                        label: 'todo un check',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
                        insertText: {
                            value: '\n - [ ] ${2:text}'
                        }
                    },
                    {
                        label: 'todo check',
                        kind: monaco_editor__WEBPACK_IMPORTED_MODULE_1__["languages"].CompletionItemKind.Keyword,
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
    YKEditorComponent.prototype.charRepeatBasedInsertText = function (char, aftercharnewLine, line) {
        if (aftercharnewLine === void 0) { aftercharnewLine = false; }
        if (line === void 0) { line = 0; }
        var count = char.trim().length;
        var selection = this.baseEditor.getSelection();
        var text = this.baseEditor.getModel().getValueInRange(selection);
        text.trim();
        var beforeselection = new monaco_editor__WEBPACK_IMPORTED_MODULE_1__["Selection"](selection.selectionStartLineNumber, selection.selectionStartColumn - count, selection.positionLineNumber, selection.positionColumn - text.length);
        var afterselection = new monaco_editor__WEBPACK_IMPORTED_MODULE_1__["Selection"](selection.selectionStartLineNumber, selection.positionColumn, selection.positionLineNumber, selection.positionColumn + count);
        var startchar = this.baseEditor.getModel().getValueInRange(beforeselection);
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
    YKEditorComponent.prototype.linkBasedInsertText = function (type) {
        var count = type == "image" ? 4 : 3;
        var extrachar = type == "image" ? "!" : "";
        var selection = this.baseEditor.getSelection();
        var text = this.baseEditor.getModel().getValueInRange(selection);
        var newText = extrachar + "[" + text + "]()";
        this.baseEditor.executeEdits('', [{ range: selection, text: newText }]);
        this.baseEditor.setPosition({
            lineNumber: selection.endLineNumber,
            column: selection.endColumn + count
        });
        this.baseEditor.focus();
    };
    YKEditorComponent.prototype.listBasedInsertText = function (type, fill) {
        if (fill === void 0) { fill = false; }
        var extra = type == 'todo' ? fill == true ? '[x]' : '[ ]' : '';
        var selection = this.baseEditor.getSelection();
        var text = this.baseEditor.getModel().getValueInRange(selection);
        var newText = "\n - " + extra + " " + text + " ";
        this.baseEditor.executeEdits('', [{ range: selection, text: newText }]);
        this.baseEditor.setPosition({
            lineNumber: selection.endLineNumber + 1,
            column: type == 'todo' ? 8 : 4
        });
        this.baseEditor.focus();
    };
    YKEditorComponent.prototype.insertContent = function (type) {
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
    YKEditorComponent.prototype.onResized = function (event) {
        this.baseEditor.layout();
        this.resizeLayout();
    };
    YKEditorComponent.prototype.resizeLayout = function () {
        var witdh = this.resizeContainer.nativeElement.offsetWidth;
        this.editorContainer.nativeElement.style.width = (witdh / 2) + "px";
        this.previewContainer.nativeElement.style.width = (witdh / 2) + "px";
    };
    YKEditorComponent.prototype.ngAfterViewInit = function () {
        this.resizeLayout();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], YKEditorComponent.prototype, "content", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], YKEditorComponent.prototype, "contentChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("editorhost"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], YKEditorComponent.prototype, "host", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("editorContainer"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], YKEditorComponent.prototype, "editorContainer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("previewContainer"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], YKEditorComponent.prototype, "previewContainer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mainContainer'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], YKEditorComponent.prototype, "mainContainer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("resizeContainer"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], YKEditorComponent.prototype, "resizeContainer", void 0);
    YKEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'yk-editor',
            template: __webpack_require__(/*! ./ykeditor.component.html */ "./lib/yk-editor/src/lib/ykeditor/ykeditor.component.html"),
            styles: [__webpack_require__(/*! ./ykeditor.component.css */ "./lib/yk-editor/src/lib/ykeditor/ykeditor.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], YKEditorComponent);
    return YKEditorComponent;
}());



/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div style=\"width: 80%;height: 500px;margin:0 auto;display: flex\">\n  <yk-editor [(content)]=\"value\"></yk-editor>\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.value = "# An exhibit of Markdown\n\n\n*Note: Feel free to play with this page. Unlike regular notes, this doesn't automatically save itself.*\n\n## Basic formatting\n\nParagraphs can be written like so. A paragraph is the basic block of Markdown. A paragraph is what text will turn into when there is no reason it should become anything else.\n\nParagraphs must be separated by a blank line. Basic formatting of *italics* and **bold** is supported. This *can be **nested** like* so.\n\n## Lists\n\n### Ordered list\n\n1. Item 1\n2. A second item\n3. Number 3\n4. \u2163\n\n*Note: the fourth item uses the Unicode character for [Roman numeral four][2].*\n\n### Unordered list\n\n* An item\n* Another item\n* Yet another item\n* And there's more...\n\n## Paragraph modifiers\n\n### Code block\n\n    Code blocks are very useful for developers and other people who look at code or other things that are written in plain text. As you can see, it uses a fixed-width font.\n\nYou can also make" + "inline code" + "to add code into other things.\n\n### Quote\n\n> Here is a quote. What this is should be self explanatory. Quotes are automatically indented when they are used.\n\n## Headings\n\nThere are six levels of headings. They correspond with the six levels of HTML headings. You've probably noticed them already in the page. Each level down uses one more hash character.\n\n### Headings *can* also contain **formatting**\n";
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _lib_yk_editor_src___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/yk-editor/src/ */ "./lib/yk-editor/src/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _lib_yk_editor_src___WEBPACK_IMPORTED_MODULE_3__["YkEditorModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/e/Yunus/Projects/GitHub/markdown-editor/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map