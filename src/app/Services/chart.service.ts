import { computed, inject, Injectable } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { MarketService } from './market.service';
import { NavigationEnd, Router } from '@angular/router';
import { StatsService } from './stats.service';
import { DateTime } from 'luxon';
import { GameService } from './game.service';
import { ChartUtils } from '../Utils/chartUtils';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  marketService = inject(MarketService);
  gameService = inject(GameService);
  private componentMarketActive: boolean = false;
  private componentStatsActive: boolean = false;
  marketChart: Chart | undefined;
  pieBonusChart: Chart | undefined;
  pieBonusSumsChart: Chart | undefined;

  chartUtils = new ChartUtils();

  letterBonus = computed(() => {
    let letterBonus = this.marketService.letterBonus();

    if (!this.componentMarketActive) return;

    this.marketChart?.data.labels?.push(
      `${DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS)}`
    );

    for (let i = 0; i < letterBonus.length; i++) {
      this.marketChart!.data.datasets[i].data.push(letterBonus[i]);
    }
    if (this.marketChart!.data.labels!.length > 100) {
      this.marketChart!.data.labels!.shift();
      this.marketChart!.data.datasets.forEach((dataset) => {
        dataset.data.shift();
      });
    }

    // Update the chart
    this.marketChart!.update();

    return letterBonus;
  });

  bonusMultiValues = computed(() => {
    let bonusValues = this.gameService.game().bonusValues;
    if (!this.componentStatsActive) return;
    const bonusValuesArr = Object.values(bonusValues)
    this.pieBonusChart!.data.datasets[0].data = bonusValuesArr;

    this.pieBonusChart!.update();
    return bonusValuesArr;
  });

  bonusSumsValues = computed(() => {
    let bonusValues = this.gameService.game().bonusSumsValues;
    if (!this.componentStatsActive) return;
    const bonusValuesArr = Object.values(bonusValues)
    this.pieBonusSumsChart!.data.datasets[0].data = bonusValuesArr;

    this.pieBonusSumsChart!.update();
    return bonusValuesArr;
  });

  constructor(private router: Router) {
    // this.initializeMarketChart();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.componentMarketActive = event.url.includes('marketMenu');
        this.componentStatsActive = event.url.includes('statsMenu');
      }
    });
  }

  initializeMarketChart() {
    const ctx = document.getElementById('marketChart') as HTMLCanvasElement;

    const DATA_COUNT = 1;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

    const labels: string[] = [];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'a-e-i-o-u-l-n-s-t-r',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.red,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.red,
            0.5
          ),
          fill: true,
          color: 'rgb(20, 20, 20)',
        },
        {
          label: 'd-g',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.orange,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.orange,
            0.5
          ),
          fill: true,
          color: 'rgb(20, 20, 20)',
        },
        {
          label: 'b-c-m-p',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.yellow,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.yellow,
            0.5
          ),
          fill: true,
          color: 'rgb(20, 20, 20)',
        },
        {
          label: 'f-h-v-w-y',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.green,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.green,
            0.5
          ),
          fill: true,
          color: 'rgb(20, 20, 20)',
        },
        {
          label: 'k',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.blue,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.blue,
            0.5
          ),
          fill: true,
          color: 'rgb(20, 20, 20)',
        },
        {
          label: 'j-x',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.purple,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.purple,
            0.5
          ),
          fill: true,
          color: 'rgb(20, 20, 20)',
        },
        {
          label: 'q-z',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.grey,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.grey,
            0.5
          ),
          fill: true,
          color: 'rgb(20, 20, 20)',
        },
        {
          label: 'Special Characters',
          data: this.chartUtils.numbers(NUMBER_CFG),
          borderColor: this.chartUtils.CHART_COLORS.lightblue,
          backgroundColor: this.chartUtils.transparentize(
            this.chartUtils.CHART_COLORS.lightblue,
            0.5
          ),
          fill: true,
          color: 'rgb(20, 20, 20)',
        },
      ],
    };

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {
        animation: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 20,
                family: 'Montserrat',
              },
            },
          },
          title: {
            display: true,
            text: 'The Word Market',
            font: {
              size: 30,
              family: 'Montserrat',
            },
          },
        },
      },
    };

    this.marketChart = new Chart(ctx, config);
  }

  initializeStatsMultiChart(ctx: HTMLCanvasElement) {
    const data = {
      labels: [
        'Sums',
        'Flat Multiplier',
        'Word Length Multi',
        'Achievements',
        'Passive Points Multi',
        'Card Amount Bonus',
        'Points Percentage Cards Multi',
        'Percentage Multiupgrade',
        'Perfection Combo',
        'Critical',
        'Mastery Bonus',
      ],
      datasets: [
        {
          label: 'Multi Values',
          data: this.bonusMultiValues() ?? [],
          backgroundColor: [
            this.chartUtils.CHART_COLORS.blue,
            this.chartUtils.CHART_COLORS.lightblue,
            this.chartUtils.CHART_COLORS.purple,
          ],
        },
      ],
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Multiplier Bonuses',
            font: {
              size: 30,
              family: 'Montserrat',
            },
          },
        },
      },
    };

    this.pieBonusChart = new Chart(ctx, config);
  }

  initializeStatsSumsChart(ctx: HTMLCanvasElement) {
    const data = {
      labels: [
        'Word Length',
        'Letters Value',
        'Repeated Letters Bonus',
        'Different Letters Bonus',
        'MultiUpgrade Points',
        'Flat Sums',
        'Card Points Bonus',
      ],
      datasets: [
        {
          label: 'Sums Values',
          data: this.bonusSumsValues() ?? [],
          backgroundColor: [
            this.chartUtils.CHART_COLORS.blue,
            this.chartUtils.CHART_COLORS.lightblue,
            this.chartUtils.CHART_COLORS.purple,
          ],
        },
      ],
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sums Bonuses',
            font: {
              size: 30,
              family: 'Montserrat',
            },
          },
        },
      },
    };

    this.pieBonusSumsChart = new Chart(ctx, config);
  }
}
