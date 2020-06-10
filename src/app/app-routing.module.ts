import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'course/:courseName', loadChildren: () => import('./pages/course/course.module').then(m => m.CourseModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'round-robin-algorithm', loadChildren: () => import('./pages/round-robin-algorithm/round-robin-algorithm.module').then(m => m.RoundRobinAlgorithmModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
