import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradesMenuComponent } from './upgrades-menu.component';

describe('UpgradesMenuComponent', () => {
  let component: UpgradesMenuComponent;
  let fixture: ComponentFixture<UpgradesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpgradesMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
