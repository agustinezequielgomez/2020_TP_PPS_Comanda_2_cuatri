import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  @Input() title: string;
  @Input() data: any[] = null;
  @Input() labels: string[];
  public displaySkeleton = true;
  public colors = [{
    backgroundColor: ['rgba(75, 248, 254, 1)', 'rgba(246, 100, 102, 1)', 'rgba(255, 159, 70, 1)', 'rgba(81, 75, 254, 1)', 'rgba(254, 75, 248, 1)']
  }];
  public chartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: false,
    onClick: (ev, ar) => this.clickHandler(ev, ar),
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: true,
          maxRotation: 90,
          minRotation: 90
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    },
    layout: {
      padding: {
        bottom: 300
      },
    }
  };
  constructor() { }

  ngOnInit() {}

  clickHandler(ev, ar) {
    const elementClickedIndex = ar[0]._index;
  }
}
