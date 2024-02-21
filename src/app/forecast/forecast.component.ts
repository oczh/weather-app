import { Component } from '@angular/core';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  constructor(public requestServise: RequestsService) {
  }
  
  ngOnInit(): void {
    this.requestServise.getForcastWeather();
  }
}
