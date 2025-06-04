import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestigeMenuComponent } from './prestige-menu.component';

describe('PrestigeMenuComponent', () => {
  let component: PrestigeMenuComponent;
  let fixture: ComponentFixture<PrestigeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestigeMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestigeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
