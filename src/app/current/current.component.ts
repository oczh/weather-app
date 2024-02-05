import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})

export class CurrentComponent implements OnInit {
  //akkor ezt hogy lehet beadni típusnak?
  //weatherData : RequestsService.weatherDataObj
  keys : string[]
  datas : Array<any>

  constructor(public requestServise: RequestsService) {
    this.keys = Object.keys(requestServise.currentWeatherData)
  }
  
  ngOnInit(): void {
    this.requestServise.getCurrentWeather();
    console.log(this.requestServise.currentWeatherData)
    console.log(Object.keys(this.requestServise.currentWeatherData)) //miért nem hajlandó kiírni??
    console.log(this.keys)
    
  }
}
