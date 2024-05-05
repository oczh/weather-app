import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestRxService } from '../request-rx.service';
import { Coord } from '../types_interfaces';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})

export class CurrentComponent implements OnInit, OnDestroy {
  subscription: SubscriptionLike;

  constructor(public service: RequestRxService) {
  }  

  ngOnInit(): void {
    this.service.readNavigatorCoords()
    this.subscription = this.service.coord$.subscribe({
      next: (v: Coord) => {
        if(this.service.coord$.getValue().lat !== 0){
          console.log(this.service.coord$.getValue())
          this.service.getCurrentData();
        }
      },
      error: (e: any) => {}
    })
  }

  ngOnDestroy(): void {
    this.service.curWeaDatasArr = [];
    this.subscription.unsubscribe();
  }

  deleteRow(index : number){
    this.service.curWeaDatasArr.splice(index, 1)
  }
}
