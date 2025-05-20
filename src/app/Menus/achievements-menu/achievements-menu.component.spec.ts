import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsMenuComponent } from './achievements-menu.component';

describe('AchievementsMenuComponent', () => {
  let component: AchievementsMenuComponent;
  let fixture: ComponentFixture<AchievementsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
