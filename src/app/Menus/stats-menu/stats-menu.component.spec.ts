import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsMenuComponent } from './stats-menu.component';

describe('StatsMenuComponent', () => {
  let component: StatsMenuComponent;
  let fixture: ComponentFixture<StatsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
