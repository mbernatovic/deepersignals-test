import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/core/shared.module';
import { UsersComponent } from './users/users.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { UsersService } from './services/users.service';
import { ExportService } from './services/export.service';

const adminRoutes = [
    {
      path: '',
      component: UsersComponent
    }
  ];

@NgModule({
  declarations: [
      UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxSpinnerModule,
    RouterModule.forChild(adminRoutes)
  ],
  providers: [UsersService,ExportService]
})
export class AdminModule { }
