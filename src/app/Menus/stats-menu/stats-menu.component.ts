import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { interval } from 'rxjs';
import { Game } from '../../Classes/game';
import { GameService } from '../../Services/game.service';
import { CommonModule } from '@angular/common';
import { ChartService } from '../../Services/chart.service';

@Component({
  selector: 'app-stats-menu',
  templateUrl: './stats-menu.component.html',
  styleUrls: ['./stats-menu.component.scss'],
  imports: [CommonModule]
})
export class StatsMenuComponent implements AfterViewInit{
  @ViewChild("pieSumsBonusChart") sumCanvasRef!: ElementRef<HTMLCanvasElement>
  @ViewChild("pieBonusChart") multiCanvasRef!: ElementRef<HTMLCanvasElement>
  gameService = inject(GameService)
  chartService = inject(ChartService)

  constructor() {
    Chart.register(...registerables)
  }

  ngAfterViewInit(){
    this.chartService.initializeStatsMultiChart(this.multiCanvasRef.nativeElement);
    this.chartService.initializeStatsSumsChart(this.sumCanvasRef.nativeElement);
  }

  getMultiUpgradesStat(): string {
    const mu1 =
      this.gameService.game().multiUpgrades.find((mu) => mu.id === 'MultiUpgradePoints')
        ?.count || 0;
    const mu2 =
      this.gameService.game().multiUpgrades.find((mu) => mu.id === 'MultiUpgradeWords')
        ?.count || 0;
    const mu3 =
      this.gameService.game().multiUpgrades.find(
        (mu) => mu.id === 'MultiUpgradePointsMult'
      )?.count || 0;
    return `${mu1} - ${mu2} - ${mu3}`;
  }
}
