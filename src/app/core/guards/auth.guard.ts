import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const user = this.authenticationService.currentUserValue;
        if(user){
            if (state.url.includes('/admin')) {
                if(user.role == "Admin"){
                    return true;
                }
                else{
                    this.router.navigate(['/dashboard']);
                    return false;
                }
            }
            
            if(!state.url.includes('/admin') && user){
                return true;
            }        
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
