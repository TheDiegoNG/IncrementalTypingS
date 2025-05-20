import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveMenuComponent } from './passive-menu.component';

describe('PassiveMenuComponent', () => {
  let component: PassiveMenuComponent;
  let fixture: ComponentFixture<PassiveMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassiveMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassiveMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
