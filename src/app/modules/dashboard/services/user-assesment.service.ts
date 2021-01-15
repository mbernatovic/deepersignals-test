import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/core/services/base.service';
import { AuthenticationService } from '@app/core/services/auth.service';
import { Observable } from 'rxjs';
import { UserAssessment } from '../models/user-assesments.model';
import { UserAssessmentReport } from '../models/user-assesment-report.model';

@Injectable({ providedIn: 'root' })
export class UserAssesmentsService extends BaseService {
    constructor(protected http: HttpClient, protected authService: AuthenticationService) {
        super(http, authService);
    }

    getAssestments() : Observable<UserAssessment[]>{
        return this.getData('/api/userassessments');
    }

    getAssestmentReport(assesmentId: number) : Observable<UserAssessmentReport>{
        const params = this.serialize({id:assesmentId});
        return this.getData(`/api/userassessment/graph?${params}`);
    }
}