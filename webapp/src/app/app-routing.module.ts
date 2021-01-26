import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { UserRoleEnum } from './constants';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UserNotApprovedComponent } from './shared/components/user-not-approved/user-not-approved.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    data: { role: UserRoleEnum.ADMIN },
    canLoad: [AuthGuardService],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'customer',
    data: { role: UserRoleEnum.CUSTOMER },
    canLoad: [AuthGuardService],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: 'not-approved',
    component: UserNotApprovedComponent
  },
  {
    path: '**',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
