import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequestRxService } from '../request-rx.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent {

  constructor(public requestRxServise: RequestRxService) {}
  
  onSubmit(form: NgForm) {
    this.requestRxServise.getCoordinatesByQuery(form.value.location)
  }
}
