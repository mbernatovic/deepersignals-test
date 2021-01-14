import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainComponent } from './core/layout/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate : [AuthGuard],
    children :[      
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path : 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
      path: 'login',
      loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
