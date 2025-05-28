import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveBarComponent } from './passive-bar-active.component';

describe('PassiveBarComponent', () => {
  let component: PassiveBarComponent;
  let fixture: ComponentFixture<PassiveBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassiveBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassiveBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
