import { Directive, Input, ElementRef, Output, Renderer2, SecurityContext } from '@angular/core';
import marked from 'marked';
import hljs from "highlight.js";
import { DomSanitizer } from '@angular/platform-browser';
import emoji from 'node-emoji'


@Directive({
  selector: '[markdown]'
})
export class MarkdownDirective {

  @Input() set markdowntext(v) {
    if (v != null && v != this._content) {
      this._content = v;
      this.renderMarkdown(this._content);
    }
  }
  @Output() get html() {
    return this.markedContent;
  }
  _content;
  markedContent: string;
  renderer = new marked.Renderer();


  constructor(private el: ElementRef, private sanitize: DomSanitizer, private render2: Renderer2) {
    this.markedRenderer();
    this.renderMarkdown("# yunus");
  }


  renderMarkdown(text) {
    const replacer = (match) => emoji.emojify(match);
    text = text.replace(/(:.*:)/g, replacer);

    this.markedContent = marked(text);

    this.markedContent = this.sanitize.bypassSecurityTrustHtml(this.markedContent) as string

    this.el.nativeElement.innerHTML = this.sanitize.sanitize(SecurityContext.HTML, this.markedContent);

  }

  markedRenderer() {
    this.renderer.listitem = (text: any) => {
      if (/^\s*\[[x ]\]\s*/.test(text)) {
        text = text
          .replace(/^\s*\[ \]\s*/, '<i class="fa fa-square-o" style="margin: 0 0.2em 0.25em -1.6em;"></i> ')
          .replace(/^\s*\[x\]\s*/, '<i class="fa fa-check-square" style="margin: 0 0.2em 0.25em -1.6em;"></i> ');
        return `<li style="list-style: none;">${text}</li>`;
      } else {
        return `<li>${text}</li>`;
      }
    };
    this.renderer.table = (header: string, body: string) => {
      return `<table class="table table-bordered">\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>\n`;
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
  }
}
