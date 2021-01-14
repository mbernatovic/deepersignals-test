import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@app/core/services/base.service';
import { AuthenticationService } from '@app/core/services/auth.service';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
    constructor(protected http: HttpClient, protected authService: AuthenticationService) {
        super(http, authService);
    }

    getUsers() : Observable<UserModel[]>{
        return this.getData('/api/users');
    }
}