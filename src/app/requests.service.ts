import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type coordinates = {
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root'
})

export class RequestsService {
  appid: string;
  lang: string;
  coord = {} as coordinates;
  units: string; 
  currentWeather: any;

  constructor(private http: HttpClient) { 
    this.appid = '6c46aa43db7539a6daf11a763626b3d2';
    this.lang = navigator.language;
    this.units = 'metric';
  }

  getCurrentWeather(){
    navigator.geolocation.getCurrentPosition((data) => {
      this.coord.lat = data.coords.latitude;
      this.coord.lon = data.coords.longitude;
      this.getCurentRequest().subscribe({
        next: (v) =>{ 
          console.log(v)
          this.currentWeather = v
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      });
    })
  }

  makeCurrentURL(language: string, coordinates: coordinates, api: string, unit: string){
  return `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=${language}&appid=${api}&units=${unit}`
  }

  getCurentRequest() {
    return this.http.get<RequestsService>(this.makeCurrentURL(this.lang, this.coord, this.appid, this.units));
  }   
}

