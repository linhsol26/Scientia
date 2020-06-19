import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuardService]
  },

  {
    path: 'course/:courseName',
    loadChildren: () => import('./pages/course/course.module').then(m => m.CourseModule),
    canActivate: [AuthGuardService]
  },

  {
    path: 'SjfAlgorithm',
    loadChildren: () => import('./pages/sjf-algorithm/sjf-algorithm.module').then(m => m.SjfAlgorithmModule),
    canActivate: [AuthGuardService]
  },

  {
    path: 'FcfsAlgotithm',
    loadChildren: () => import('./pages/fcfs-algotithm/fcfs-algotithm.module').then(m => m.FcfsAlgotithmModule),
    canActivate: [AuthGuardService]
  },

  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
