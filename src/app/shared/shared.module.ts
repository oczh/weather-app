import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationFormComponent } from '../location-form/location-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LocationFormComponent
  ]
})
export class SharedModule { }
