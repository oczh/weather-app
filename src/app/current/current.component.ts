import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})

export class CurrentComponent implements OnInit {

  constructor(public requestServise: RequestsService) {}
  
  ngOnInit(): void {
    this.requestServise.getCurrentWeather();
  }
}
