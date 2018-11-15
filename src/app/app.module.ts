import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { YkEditorModule } from '../../lib/yk-editor/src/';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    YkEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
