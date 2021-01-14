import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/core/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserAssessmentReportComponent } from './components/user-assesments-report/user-assessment-report.component';
import { UserAssessmentComponent } from './components/user-assesments/user-assessment.component';
import { DashboardComponent } from './pages/dashboard.component';
import { UserAssesmentsService } from './services/user-assesment.service';
import { ChartistModule } from 'ng-chartist';

const dashboardRoutes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path:'assesment-report/:id',
    component : UserAssessmentReportComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxSpinnerModule,
    RouterModule.forChild(dashboardRoutes),
    ChartistModule 
  ],
  declarations: [
    DashboardComponent,
    UserAssessmentComponent,
    UserAssessmentReportComponent
  ],
  providers:[UserAssesmentsService]
})
export class DashboardModule { }
