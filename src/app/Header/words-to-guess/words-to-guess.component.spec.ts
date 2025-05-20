import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsToGuessComponent } from './words-to-guess.component';

describe('WordsToGuessComponent', () => {
  let component: WordsToGuessComponent;
  let fixture: ComponentFixture<WordsToGuessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsToGuessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsToGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
