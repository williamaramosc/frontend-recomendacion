import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardScoreBookComponent } from './card-score-book.component';

describe('CardScoreBookComponent', () => {
  let component: CardScoreBookComponent;
  let fixture: ComponentFixture<CardScoreBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardScoreBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardScoreBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
