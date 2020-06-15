import { FcfsAlgotithmComponent } from './../fcfs-algotithm/fcfs-algotithm.component';
import { SjfAlgorithmComponent } from './../sjf-algorithm/sjf-algorithm.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course.component';
import { RoundRobinAlgorithmComponent } from '../round-robin-algorithm/round-robin-algorithm.component';
import { SrtfAlgorithmComponent } from '../srtf-algorithm/srtf-algorithm.component';

const routes: Routes = [
  { path: '', component: CourseComponent },
  { path: 'round-robin-algorithm', component: RoundRobinAlgorithmComponent },
  { path: 'srtf-algorithm', component: SrtfAlgorithmComponent },
  { path: 'sjf-algorithm', component: SjfAlgorithmComponent},
  { path: 'fcfs-algorithm', component: FcfsAlgotithmComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
