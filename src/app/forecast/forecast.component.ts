import { Component, OnDestroy, OnInit } from '@angular/core';
//import { RequestsService } from '../requests.service';
import { RequestRxService } from '../request-rx.service';
import { Coord } from '../types_interfaces';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})

export class ForecastComponent implements OnInit, OnDestroy {
  constructor(public service: RequestRxService) {
  }
  
  ngOnInit(): void {
    this.service.readNavigatorCoords()
    this.service.coord$.subscribe({
      next: (v: Coord) => {
        console.log(this.service.coord$.getValue())
        this.service.getForcastData()
      },
      error: (e: any) => {}
    })
  }

  ngOnDestroy(): void {
    this.service.coord$.unsubscribe()
  }
}
/** 
export class ForecastComponent {
  constructor(public RequestRxService: RequestsService) {
  }
  
  ngOnInit(): void {
    //this.RequestRxService.getForcastWeather();
    this.RequestRxService.makeweatherobject(false, false)
  }
} */ 
