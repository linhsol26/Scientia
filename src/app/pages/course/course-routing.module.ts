import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course.component';
import { RoundRobinAlgorithmComponent } from '../round-robin-algorithm/round-robin-algorithm.component';

const routes: Routes = [
  { path: '', component: CourseComponent },
  { path: 'round-robin-algorithm', component: RoundRobinAlgorithmComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
