import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'course/:courseName',
    loadChildren: () => import('./pages/course/course.module').then(m => m.CourseModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'SjfAlgorithm',
    loadChildren: () => import('./pages/sjf-algorithm/sjf-algorithm.module').then(m => m.SjfAlgorithmModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'FcfsAlgotithm',
    loadChildren: () => import('./pages/fcfs-algotithm/fcfs-algotithm.module').then(m => m.FcfsAlgotithmModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
