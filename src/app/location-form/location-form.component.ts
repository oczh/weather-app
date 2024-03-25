import { Component } from '@angular/core';
import { RequestsService } from '../requests.service';
import { NgForm } from '@angular/forms';
import { Coord, local_name } from '../types_interfaces';
import { HttpClient } from '@angular/common/http';
import { RequestRxService } from '../request-rx.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent {

  constructor(public requestRxServise: RequestRxService, private http: HttpClient) {}
  
  onSubmit(form: NgForm) {
    this.requestRxServise.getCoordinatesByQuery(form.value.location)
  }
}
