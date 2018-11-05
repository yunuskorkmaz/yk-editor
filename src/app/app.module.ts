import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { YkEditorModule } from 'yk-editor';

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
