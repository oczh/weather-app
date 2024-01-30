import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type weatherDataObj = {
  locaton: string;
  weather_icon: string;
  weather: string;
  temperature : number;
  windSpeed: number;
  cloudness: number;
  pressure: number;
  humindy: number;
  sunset: number;
  rain: number
}

interface currentWeatherObject {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
interface Clouds {
  all: number;
}
interface Wind {
  speed: number;
  deg: number;
}
interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface Coord {
  lon: number;
  lat: number;
}

@Injectable({
  providedIn: 'root'
})

export class RequestsService {
  appid: string;
  lang: string;
  coord = {} as Coord;
  units: string; 
  currentWeather: currentWeatherObject;
  currentWeatherData : weatherDataObj

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
          this.currentWeather = v;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      });
    })
  }

  makeCurrentURL(language: string, coordinates: Coord, api: string, unit: string){
  return `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=${language}&appid=${api}&units=${unit}`
  }

  getCurentRequest() {
    return this.http.get<currentWeatherObject>(this.makeCurrentURL(this.lang, this.coord, this.appid, this.units));
  }   

  makeCurrentWeatherObject(requests : currentWeatherObject){
    this.currentWeatherData.locaton = requests.name; 
    this.currentWeatherData.weather_icon = requests.weather[0].icon;
    this.currentWeatherData.temperature = requests.main.temp;
    
  }
}

