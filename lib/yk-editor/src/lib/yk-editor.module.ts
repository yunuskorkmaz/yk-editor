import { NgModule } from '@angular/core';
import { YKEditorComponent } from './ykeditor/ykeditor.component';
import { MarkdownDirective } from './markdown.directive';
import { CommonModule } from "@angular/common";
import { AngularResizedEventModule } from 'angular-resize-event';
@NgModule({
  imports: [
    CommonModule,
    AngularResizedEventModule
  ],
  declarations: [ YKEditorComponent, MarkdownDirective],
  exports: [YKEditorComponent,MarkdownDirective]
})
export class YkEditorModule { }
