import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'course/:courseName', loadChildren: () => import('./pages/course/course.module').then(m => m.CourseModule) },
  { path: 'SjfAlgorithm', loadChildren: () => import('./pages/sjf-algorithm/sjf-algorithm.module').then(m => m.SjfAlgorithmModule) },
  { path: 'FcfsAlgotithm', loadChildren: () => import('./pages/fcfs-algotithm/fcfs-algotithm.module').then(m => m.FcfsAlgotithmModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
