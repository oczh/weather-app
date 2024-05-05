import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentRoutingModule } from './current-routing.module';
import { CurrentComponent } from './current.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CurrentComponent
  ],
  imports: [
    CommonModule,
    CurrentRoutingModule,
    SharedModule
  ]
})
export class CurrentModule { }
