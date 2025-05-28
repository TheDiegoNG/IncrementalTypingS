import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveBarIdleComponent } from './passive-bar-idle.component';

describe('PassiveBarIdleComponent', () => {
  let component: PassiveBarIdleComponent;
  let fixture: ComponentFixture<PassiveBarIdleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassiveBarIdleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassiveBarIdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
