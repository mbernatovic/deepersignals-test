import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBarChartOptions, IChartistAnimationOptions, IChartistData } from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { UserAssessmentReport } from '../../models/user-assesment-report.model';
import { UserAssesmentsService } from '../../services/user-assesment.service';

@Component({
  selector: 'app-user-assessment-report',
  templateUrl: './user-assessment-report.component.html',
  styleUrls: ['./user-assessment-report.component.less']
})
export class UserAssessmentReportComponent implements OnInit {
  type: ChartType = 'Bar';
  data: IChartistData = {
    labels: [
      "Agreeableness",
      "Drive",
      "Luck",
      "Openess"
    ],
    series: [
      []
    ]
  
  };

  options: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    height: 600
  };
 
  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };

  report : UserAssessmentReport;
  constructor(private activatedRoute : ActivatedRoute,
    private spinner : NgxSpinnerService,
    private userAssesmentsService: UserAssesmentsService) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params) => {
      if(params.id){
        await this.loadGraphData(parseInt(params.id));
      }
    });
    
  }

  async loadGraphData(id: number): Promise<void> {
    this.spinner.show();
    var response = await this.userAssesmentsService.getAssestmentReport(id)
    .pipe(
      first(),
      catchError((error) => {
        setTimeout(() => { this.spinner.hide(); }, 100);
        return of(null);
      })
    ).toPromise();
  
    if(response){
      this.data.series = [response.data.agreeableness, response.data.drive, response.data.luck, response.data.opness]
      switch(response.type){
        case "bar":
          this.type = "Bar";
          break;
        case "pie":
          this.type ="Pie";
          break;
        case "line":
          this.type = "Line";
          break;
        default:
          this.type ="Bar";
          break;
      }
      setTimeout(() => { this.spinner.hide(); }, 100);
    }
  }

}
