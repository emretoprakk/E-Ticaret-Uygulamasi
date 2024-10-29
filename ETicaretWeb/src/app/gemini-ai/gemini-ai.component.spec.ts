import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeminiAiComponent } from './gemini-ai.component';

describe('GeminiAiComponent', () => {
  let component: GeminiAiComponent;
  let fixture: ComponentFixture<GeminiAiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeminiAiComponent]
    });
    fixture = TestBed.createComponent(GeminiAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
