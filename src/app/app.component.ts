import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordboxComponent } from './Header/wordbox/wordbox.component';
import { WordsToGuessComponent } from './Header/words-to-guess/words-to-guess.component';
import { PointsCounterComponent } from './Header/points-counter/points-counter.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuService } from './Services/menu.service';
import { ActiveMenuComponent } from './Menus/active-menu/active-menu.component';
import { PassiveMenuComponent } from './Menus/passive-menu/passive-menu.component';
import { UpgradesMenuComponent } from './Menus/upgrades-menu/upgrades-menu.component';
import { StatsMenuComponent } from './Menus/stats-menu/stats-menu.component';
import { CardsMenuComponent } from './Menus/cards-menu/cards-menu.component';
import { AchievementsMenuComponent } from './Menus/achievements-menu/achievements-menu.component';
import { OptionsMenuComponent } from './Menus/options-menu/options-menu.component';
import { ModulesMenuComponent } from './Menus/modules-menu/modules-menu.component';
import { OverlayComponent } from './overlay/overlay.component';
import { PrestigeMenuComponent } from './Menus/prestige-menu/prestige-menu.component';
import { MasteryMenuComponent } from './Menus/mastery-menu/mastery-menu.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    WordboxComponent,
    WordsToGuessComponent,
    PointsCounterComponent,
    NavbarComponent,
    ActiveMenuComponent,
    PassiveMenuComponent,
    UpgradesMenuComponent,
    StatsMenuComponent,
    CardsMenuComponent,
    AchievementsMenuComponent,
    OptionsMenuComponent,
    ModulesMenuComponent,
    OverlayComponent,
    PrestigeMenuComponent,
    MasteryMenuComponent,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  menuService = inject(MenuService);
  title = 'IncrementalTyping';
}
