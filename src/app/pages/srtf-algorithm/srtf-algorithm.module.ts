import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SrtfAlgorithmRoutingModule } from './srtf-algorithm-routing.module';
import { SrtfAlgorithmComponent } from './srtf-algorithm.component';


@NgModule({
  declarations: [SrtfAlgorithmComponent],
  imports: [
    CommonModule,
    SrtfAlgorithmRoutingModule
  ]
})
export class SrtfAlgorithmModule { }
