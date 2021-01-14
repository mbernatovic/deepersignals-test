import { Component, OnInit } from '@angular/core';
import { User } from '@app/core/models/user';
import { AuthenticationService } from '@app/core/services/auth.service';

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
    loading = false;
    users: User[];
    currentUser: User;

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    get isUserAdmin() : boolean{
        return this.currentUser.role == "Admin";
    }
}
