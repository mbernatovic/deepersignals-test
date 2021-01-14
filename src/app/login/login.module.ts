import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '@app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
];

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes), ],
    providers:[AuthenticationService]
})
export class LoginModule {}
