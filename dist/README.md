# ngx-yk-editor
Angular markdown editor based Monaco Editor

## Usage

- Install yk-editor
```
npm install yk-editor
```

- Use editor component

```typescript
import { YkEditorModule } from 'dist';

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
```

```html

 <yk-editor [(content)]="value" (contentChange)="change($event)"></yk-editor>
```

- Add style angular.json
```diff
 "styles": [
    +"node_modules/yk-editor/assets/css/yk-editor.css",
    "src/styles.css"
    ]
```