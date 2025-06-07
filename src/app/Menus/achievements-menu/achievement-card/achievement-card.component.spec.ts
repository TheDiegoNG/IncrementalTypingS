import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementGroupCardComponent } from './achievement-card.component';

describe('AchievementCardComponent', () => {
  let component: AchievementGroupCardComponent;
  let fixture: ComponentFixture<AchievementGroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementGroupCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
