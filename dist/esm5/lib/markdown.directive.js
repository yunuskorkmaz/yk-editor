/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, Output, Renderer2, SecurityContext } from '@angular/core';
import marked from 'marked';
import hljs from "highlight.js";
import { DomSanitizer } from '@angular/platform-browser';
import emoji from 'node-emoji';
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
export { MarkdownDirective };
if (false) {
    /** @type {?} */
    MarkdownDirective.prototype._content;
    /** @type {?} */
    MarkdownDirective.prototype.markedContent;
    /** @type {?} */
    MarkdownDirective.prototype.renderer;
    /** @type {?} */
    MarkdownDirective.prototype.el;
    /** @type {?} */
    MarkdownDirective.prototype.sanitize;
    /** @type {?} */
    MarkdownDirective.prototype.render2;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8veWstZWRpdG9yLyIsInNvdXJjZXMiOlsibGliL21hcmtkb3duLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLElBQUksTUFBTSxjQUFjLENBQUM7QUFDaEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sS0FBSyxNQUFNLFlBQVksQ0FBQTs7SUFzQjVCLDJCQUFvQixFQUFjLEVBQVUsUUFBc0IsRUFBVSxPQUFrQjtRQUExRSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVc7d0JBSG5GLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUk5QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN6QjtJQWpCRCxzQkFBYSwyQ0FBWTs7Ozs7UUFBekIsVUFBMEIsQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNwQztTQUNGOzs7T0FBQTtJQUNELHNCQUFjLG1DQUFJOzs7O1FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzNCOzs7T0FBQTs7Ozs7SUFZRCwwQ0FBYzs7OztJQUFkLFVBQWUsSUFBSTs7UUFDakIsSUFBTSxRQUFRLEdBQUcsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFwQixDQUFvQixDQUFDO1FBQ2pELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsYUFBYSxxQkFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQVcsQ0FBQSxDQUFBO1FBRXhGLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUVwRzs7OztJQUVELDBDQUFjOzs7SUFBZDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFVBQUMsSUFBUztZQUNqQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxHQUFHLElBQUk7cUJBQ1IsT0FBTyxDQUFDLGNBQWMsRUFBRSx3RUFBd0UsQ0FBQztxQkFDakcsT0FBTyxDQUFDLGNBQWMsRUFBRSw0RUFBNEUsQ0FBQyxDQUFDO2dCQUN6RyxPQUFPLHFDQUFpQyxJQUFJLFVBQU8sQ0FBQzthQUNyRDtpQkFBTTtnQkFDTCxPQUFPLFNBQU8sSUFBSSxVQUFPLENBQUM7YUFDM0I7U0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsVUFBQyxNQUFjLEVBQUUsSUFBWTtZQUNqRCxPQUFPLHNEQUFrRCxNQUFNLDJCQUFzQixJQUFJLHlCQUFzQixDQUFDO1NBQ2pILENBQUM7UUFFRixNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxVQUFVLElBQUk7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDdkM7WUFDRCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsTUFBTSxFQUFFLElBQUk7WUFDWixRQUFRLEVBQUUsS0FBSztZQUNmLFVBQVUsRUFBRSxJQUFJO1NBRWpCLENBQUMsQ0FBQztLQUNKOztnQkE5REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7OztnQkFUMEIsVUFBVTtnQkFHNUIsWUFBWTtnQkFIMEIsU0FBUzs7OytCQVlyRCxLQUFLO3VCQU1MLE1BQU07OzRCQWxCVDs7U0FVYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBPdXRwdXQsIFJlbmRlcmVyMiwgU2VjdXJpdHlDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgbWFya2VkIGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgaGxqcyBmcm9tIFwiaGlnaGxpZ2h0LmpzXCI7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCBlbW9qaSBmcm9tICdub2RlLWVtb2ppJ1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXJrZG93bl0nXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBzZXQgbWFya2Rvd250ZXh0KHYpIHtcbiAgICBpZiAodiAhPSBudWxsICYmIHYgIT0gdGhpcy5fY29udGVudCkge1xuICAgICAgdGhpcy5fY29udGVudCA9IHY7XG4gICAgICB0aGlzLnJlbmRlck1hcmtkb3duKHRoaXMuX2NvbnRlbnQpO1xuICAgIH1cbiAgfVxuICBAT3V0cHV0KCkgZ2V0IGh0bWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2VkQ29udGVudDtcbiAgfVxuICBfY29udGVudDtcbiAgbWFya2VkQ29udGVudDogc3RyaW5nO1xuICByZW5kZXJlciA9IG5ldyBtYXJrZWQuUmVuZGVyZXIoKTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgc2FuaXRpemU6IERvbVNhbml0aXplciwgcHJpdmF0ZSByZW5kZXIyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLm1hcmtlZFJlbmRlcmVyKCk7XG4gICAgdGhpcy5yZW5kZXJNYXJrZG93bihcIlwiKTtcbiAgfVxuXG5cbiAgcmVuZGVyTWFya2Rvd24odGV4dCkge1xuICAgIGNvbnN0IHJlcGxhY2VyID0gKG1hdGNoKSA9PiBlbW9qaS5lbW9qaWZ5KG1hdGNoKTtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oOi4qOikvZywgcmVwbGFjZXIpO1xuXG4gICAgdGhpcy5tYXJrZWRDb250ZW50ID0gbWFya2VkKHRleHQpO1xuXG4gICAgdGhpcy5tYXJrZWRDb250ZW50ID0gdGhpcy5zYW5pdGl6ZS5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLm1hcmtlZENvbnRlbnQpIGFzIHN0cmluZ1xuXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuc2FuaXRpemUuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LkhUTUwsIHRoaXMubWFya2VkQ29udGVudCk7XG5cbiAgfVxuXG4gIG1hcmtlZFJlbmRlcmVyKCkge1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0gPSAodGV4dDogYW55KSA9PiB7XG4gICAgICBpZiAoL15cXHMqXFxbW3ggXVxcXVxccyovLnRlc3QodGV4dCkpIHtcbiAgICAgICAgdGV4dCA9IHRleHRcbiAgICAgICAgICAucmVwbGFjZSgvXlxccypcXFsgXFxdXFxzKi8sICc8aSBjbGFzcz1cImZhIGZhLXNxdWFyZS1vXCIgc3R5bGU9XCJtYXJnaW46IDAgMC4yZW0gMC4yNWVtIC0xLjZlbTtcIj48L2k+ICcpXG4gICAgICAgICAgLnJlcGxhY2UoL15cXHMqXFxbeFxcXVxccyovLCAnPGkgY2xhc3M9XCJmYSBmYS1jaGVjay1zcXVhcmVcIiBzdHlsZT1cIm1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtO1wiPjwvaT4gJyk7XG4gICAgICAgIHJldHVybiBgPGxpIHN0eWxlPVwibGlzdC1zdHlsZTogbm9uZTtcIj4ke3RleHR9PC9saT5gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGA8bGk+JHt0ZXh0fTwvbGk+YDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMucmVuZGVyZXIudGFibGUgPSAoaGVhZGVyOiBzdHJpbmcsIGJvZHk6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZFwiPlxcbjx0aGVhZD5cXG4ke2hlYWRlcn08L3RoZWFkPlxcbjx0Ym9keT5cXG4ke2JvZHl9PC90Ym9keT5cXG48L3RhYmxlPlxcbmA7XG4gICAgfTtcblxuICAgIG1hcmtlZC5zZXRPcHRpb25zKHtcbiAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGhsanMuaGlnaGxpZ2h0QXV0byhjb2RlKS52YWx1ZTtcbiAgICAgIH0sXG4gICAgICByZW5kZXJlcjogdGhpcy5yZW5kZXJlcixcbiAgICAgIHRhYmxlczogdHJ1ZSxcbiAgICAgIHNhbml0aXplOiBmYWxzZSxcbiAgICAgIHNtYXJ0TGlzdHM6IHRydWUsXG5cbiAgICB9KTtcbiAgfVxufVxuIl19