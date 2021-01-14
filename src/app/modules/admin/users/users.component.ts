import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { ExportService } from '../services/export.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  loading : boolean;
  selectedUsers : UserModel[] = [];
  users: UserModel[] = [];
  constructor(private usersService : UsersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private exportService: ExportService) { }

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  selectAll(checked : boolean){
      this.users.forEach(user =>{
          if(checked){
            user.selected = true;
            if(!this.selectedUsers.find(x => x.email == user.email)){
                this.selectedUsers.push(user);
            }
          }
          else{
              user.selected = false;
              this.selectedUsers = [];
          }
      })
  }

  async loadData(): Promise<void> {
    this.spinner.show();
    var data = await this.usersService.getUsers()
    .pipe(
      first(),
      catchError((error) => {
        setTimeout(() => { this.loading = false; this.spinner.hide(); }, 100);
        return of(error);
      })
    ).toPromise();
  
    if(data){
      this.users = data;
      setTimeout(() => { this.loading = false; this.spinner.hide(); }, 100);
    }
  }
  selectUser(check: boolean, user :UserModel){
    if(check){
        this.selectedUsers.push(user);
    }
    else{
        const index = this.selectedUsers.indexOf(user);
        this.selectedUsers = this.selectedUsers.splice(index,1);
    }
  }

  exportToCsv(){
    if(this.selectedUsers.length > 0){
        this.exportService.exportToCsv(this.selectedUsers,'users',['email','first_name','last_name','groups']);
    }
    else{
        this.toastr.error('You did not select any user','Ooops');
    }
  }

 

}
