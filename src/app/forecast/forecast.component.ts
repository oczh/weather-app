import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestRxService } from '../request-rx.service';
import { Coord } from '../types_interfaces';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})

export class ForecastComponent implements OnInit, OnDestroy {
  subscription: SubscriptionLike;
  constructor(public service: RequestRxService) {
  }
  
  ngOnInit(): void {
    this.service.readNavigatorCoords()
    this.subscription = this.service.coord$.subscribe({
      next: (v: Coord) => {
        console.log(this.service.coord$.getValue())
        if(this.service.coord$.getValue()?.lat !== 0){
          this.service.getForcastData();
        }
      },
      error: (e: any) => {}
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
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
