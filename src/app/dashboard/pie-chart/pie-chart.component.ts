import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ChartData } from 'src/app/DTOs/ChartData';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnDestroy {
  private root!: am5.Root;
  private chart!: am5percent.PieChart;
  private series!: am5percent.PieSeries;
  baseurl = '';
  dashboardInfo: ChartData[] = [];

  constructor(private client: HttpClient) {
    this.baseurl = environment.APIUrl;
  }

  ngOnInit() {
    // Fetch data first
    this.client.get(this.baseurl + '/api/Dashboard/dashboard').subscribe({
      next: (response) => {
        this.dashboardInfo = response as ChartData[];
        // Initialize chart after data is received
        this.initializeChart();
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    });
  }

  private initializeChart() {
    // Create root element
    this.root = am5.Root.new("chartDiv");

    // Set themes
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    // Create chart
    this.chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout,
        innerRadius: am5.percent(50)
      })
    );

    // Create series
    this.series = this.chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false
      })
    );

    // Configure labels
    this.series.labels.template.setAll({
      textType: "circular",
      centerX: 0,
      centerY: 0,
      text: "{value}",
      populateText: true,
      fontSize: 25,
      maxWidth: 110
    });

    // Configure ticks
    this.series.ticks.template.setAll({
      forceHidden: false
    });

    // Configure tooltips
    this.series.slices.template.set("tooltipText", "{category}: {value}");

    // Set data
    this.series.data.setAll(this.dashboardInfo);

    // Add legend
    const legend = this.chart.children.push(am5.Legend.new(this.root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      marginTop: 15,
      marginBottom: 15
    }));

    legend.labels.template.setAll({
      fontSize: 13,
      fontWeight: "400"
    });

    legend.data.setAll(this.series.dataItems);

    // Add animation
    this.series.appear(1000, 100);
  }

  ngOnDestroy() {
    // Clean up chart when component is destroyed
    if (this.root) {
      this.root.dispose();
    }
  }
}