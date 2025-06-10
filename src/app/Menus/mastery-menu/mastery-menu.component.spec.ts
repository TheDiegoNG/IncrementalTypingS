import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteryMenuComponent } from './mastery-menu.component';

describe('MasteryMenuComponent', () => {
  let component: MasteryMenuComponent;
  let fixture: ComponentFixture<MasteryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasteryMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasteryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
