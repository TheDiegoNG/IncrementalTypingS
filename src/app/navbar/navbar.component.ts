import { Component, computed, inject, OnInit } from '@angular/core';
import { MenuService } from '../Services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule]
})
export class NavbarComponent {
  menuService = inject(MenuService)
  
  constructor() {}

  onNavbarScroll(event: WheelEvent) {
    const container = event.currentTarget as HTMLElement;
    if(!container) return;
    container.scrollLeft += event.deltaY;
    event.preventDefault();
  }
}
