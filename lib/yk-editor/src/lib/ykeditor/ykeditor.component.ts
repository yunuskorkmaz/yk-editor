import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges, KeyValueDiffers, DoCheck } from '@angular/core';
import { editor, Selection, languages} from 'monaco-editor';
import emoji from 'node-emoji'

@Component({
  selector: 'yk-editor',
  templateUrl: './ykeditor.component.html',
  styleUrls: ['./ykeditor.component.css']
})
export class YKEditorComponent implements OnInit {


  @Input() get content() {
    return this._content;
  }

  set content(v) {
    this._content = v;
    this.contentChange.emit(v);
  }

  @Output() contentChange = new EventEmitter();

  _content = "";
  @ViewChild("editorhost") host: ElementRef;
  @ViewChild("editorContainer") editorContainer: ElementRef;
  @ViewChild("previewContainer") previewContainer: ElementRef;
  @ViewChild('mainContainer') mainContainer: ElementRef;
  baseEditor: any;

  displayMode: string = "split";

  isFullScreen = false;

  theme: boolean = true;

  changeTheme() {
    this.theme = !this.theme;
    this.theme == true ? editor.setTheme("vs") : editor.setTheme("vs-dark");
  }

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
          console.log(this.isFullScreen);

          if (this.isFullScreen == true)
            this.mainContainer.nativeElement.setAttribute('style', "position: fixed;top: 0px;left: 0;bottom: 0;right: 0;width: 100%;height: 100%;");
          else
            this.mainContainer.nativeElement.setAttribute('style', "");
          break;
      }
      this.baseEditor.layout();
    }
  }


  constructor() {


  }

  config: any = {

    language: "markdown",
    minimap: { enabled: false },
    lineNumbers: "off",
    theme: this.theme ? 'vs' : 'vs-dark',
    scrollBeyondLastLine: false,
    wordWrap: 'on',
  }


  ngOnInit() {
    this.baseEditor = editor.create(this.host.nativeElement, this.config);
    this.baseEditor.setModel(editor.createModel(this.content, 'markdown'));
    this.baseEditor.onDidChangeModelContent((e) => {
      this.content = this.baseEditor.getValue();
    });
    var emojilist = [];
    for (var k in emoji.emoji) { emojilist.push({ label: k + " " + emoji.emoji[k], kind: languages.CompletionItemKind.Function, insertText: k + ":" }) }

    languages.registerCompletionItemProvider('markdown', {
      provideCompletionItems: function (model, position) {
        var textUntilPosition = model.getValueInRange({ startLineNumber: position.lineNumber, startColumn: position.column - 1, endLineNumber: position.lineNumber, endColumn: position.column });
        if (textUntilPosition === ':') { return emojilist; } return [];
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
        ]
      }
    });


  }

  charRepeatBasedInsertText(char, aftercharnewLine = false, line = 0) {
    var count = char.trim().length;
    const selection = this.baseEditor.getSelection();
    var text = this.baseEditor.getModel().getValueInRange(selection);
    text.trim();
    var beforeselection = new Selection(selection.selectionStartLineNumber,
      selection.selectionStartColumn - count,
      selection.positionLineNumber,
      selection.positionColumn - text.length);

    var afterselection = new Selection(selection.selectionStartLineNumber,
      selection.positionColumn,
      selection.positionLineNumber,
      selection.positionColumn + count);

    var startchar = this.baseEditor.getModel().getValueInRange(beforeselection);
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
  linkBasedInsertText(type) {
    var count = type == "image" ? 4 : 3;
    var extrachar = type == "image" ? "!" : "";
    const selection = this.baseEditor.getSelection();
    var text = this.baseEditor.getModel().getValueInRange(selection);
    var newText = `${extrachar}[${text}]()`;
    this.baseEditor.executeEdits('', [{ range: selection, text: newText }]);
    this.baseEditor.setPosition({
      lineNumber: selection.endLineNumber,
      column: selection.endColumn + count
    });
    this.baseEditor.focus();
  }
  listBasedInsertText(type, fill = false) {
    var extra = type == 'todo' ? fill == true ? '[x]' : '[ ]' : '';
    const selection = this.baseEditor.getSelection();
    var text = this.baseEditor.getModel().getValueInRange(selection);
    var newText = `\n - ${extra} ${text} `;
    this.baseEditor.executeEdits('', [{ range: selection, text: newText }]);
    this.baseEditor.setPosition({
      lineNumber: selection.endLineNumber + 1,
      column: type == 'todo' ? 8 : 4
    });
    this.baseEditor.focus();
  }

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


}
