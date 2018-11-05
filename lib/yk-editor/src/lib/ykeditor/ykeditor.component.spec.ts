import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YKEditorComponent } from './ykeditor.component';

describe('YKEditorComponent', () => {
  let component: YKEditorComponent;
  let fixture: ComponentFixture<YKEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YKEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YKEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
