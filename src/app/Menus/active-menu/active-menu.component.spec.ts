import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMenuComponent } from './active-menu.component';

describe('ActiveMenuComponent', () => {
  let component: ActiveMenuComponent;
  let fixture: ComponentFixture<ActiveMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
