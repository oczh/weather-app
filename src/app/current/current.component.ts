import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestRxService } from '../request-rx.service';
import { Coord } from '../types_interfaces';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})

export class CurrentComponent implements OnInit, OnDestroy {

  constructor(public service: RequestRxService) {
  }  

  ngOnInit(): void {
    this.service.readNavigatorCoords()
    this.service.coord$.subscribe({
      next: (v: Coord) => {
        console.log(this.service.coord$.getValue())
        this.service.getCurrentData()
      },
      error: (e: any) => {}
    })
  }

  ngOnDestroy(): void {
    this.service.coord$.unsubscribe();
  }

  deleteRow(index : number){
    this.service.curWeaDatasArr.splice(index, 1)
  }
}
