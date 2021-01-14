import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { of, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { UserAssessment } from '../../models/user-assesments.model';
import { UserAssesmentsService } from '../../services/user-assesment.service';

@Component({
  selector: 'app-user-assessment',
  templateUrl: './user-assessment.component.html',
  styleUrls: ['./user-assessment.component.less']
})
export class UserAssessmentComponent implements OnInit {
  loading : boolean;

  assesments: UserAssessment[] = [];
  constructor(private userAssesmentsService : UserAssesmentsService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  openAssesmentReport(id:number){
    this.router.navigate([`/dashboard/assesment-report/${id}`]);
  }
  async loadData(): Promise<void> {
    this.spinner.show();
    var data = await this.userAssesmentsService.getAssestments()
    .pipe(
      first(),
      catchError((error) => {
        setTimeout(() => { this.loading = false; this.spinner.hide(); }, 100);
        return of(error);
      })
    ).toPromise();
  
    if(data){
      this.assesments = data;
      setTimeout(() => { this.loading = false; this.spinner.hide(); }, 100);
    }
  }

}
