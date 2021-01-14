import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, VirtualTimeScheduler } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private user: BehaviorSubject<User> = new BehaviorSubject<User>(this.checkUser());

    constructor(private http: HttpClient,
        private router : Router) {
    }

    public get currentUserValue() {
        return this.user.value;
    }


    get checkIsAdmin() : boolean{
        return this.currentUserValue.role == "Admin";
      }

    login(email: string, password: string) {
        return this.http
            .post<any>(`${environment.apiUrl}/api/login`, { email, password })
            .pipe(
                map((user) => {
                    let cryptuser = btoa(JSON.stringify(user));
                    localStorage.setItem('currentUser', cryptuser);
                    this.user.next(user);
                    return user;
                })
            );
    }

    checkUser(){
        var storageUser = localStorage.getItem('currentUser');
        if(storageUser){
            return JSON.parse(atob(storageUser));
        }
        return null;
        
    }
    logout() {
        this.router.navigate(['/login']);
        localStorage.removeItem('currentUser');
        this.user.next(null);
    }
}
