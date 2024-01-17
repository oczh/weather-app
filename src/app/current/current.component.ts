import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})

export class CurrentComponent implements OnInit {
  lang: string;
  lati: number;
  long: number;

  constructor() {}

  ngOnInit(): void {
    this.lang = navigator.language;
    console.log(`browsers language: ${this.lang}`);
    navigator.geolocation.getCurrentPosition((data) => {
      this.lati = data.coords.latitude;
      this.long = data.coords.longitude;
      console.log(`browsers position:
      geolocation coordinates latitude: ${this.lati}, 
      geolocation coordinates longitude: ${this.long}`)
    });
  }
}
