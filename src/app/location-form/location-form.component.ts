import { Component } from '@angular/core';
import { RequestsService } from '../requests.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent {
  constructor(public requestServise: RequestsService) {
  }
  
  ngOnInit(): void {
    this.requestServise.getForcastWeather();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(form.valid); 
  }
}
