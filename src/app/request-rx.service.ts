import { Injectable } from '@angular/core';
import { Coord, currentWeatherObject, forecastObj, forecastWeatherObject, local_name, weatherDataObj } from './types_interfaces';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class RequestRxService {
  coord$ = new BehaviorSubject<Coord>({lat : 0, lon : 0})
  private appid = '6c46aa43db7539a6daf11a763626b3d2';
  lang = navigator.language;
  units = 'metric';
  currentWeatherData = {} as weatherDataObj;
  forcastWearherData = {} as forecastObj;
  curWeaDatasArr : weatherDataObj[] = [];

  constructor(public http: HttpClient) {}

  readNavigatorCoords() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.coord$.next({lat: data.coords.latitude, lon:data.coords.longitude});
    });
  }
  
  getCoordinatesByQuery(city: string){
    this.http.get<local_name[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.appid}`).subscribe({
      next: (v) =>{ 
        console.log(city)
        console.log(v)
        this.coord$.next({lat: v[0].lat, lon : v[0].lon});
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  getCurrentData() {
    return this.http.get<currentWeatherObject>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.coord$.getValue().lat}&lon=${this.coord$.getValue().lon}&lang=${this.lang}&appid=${this.appid}&units=${this.units}`
    ).subscribe({
      next: (v: currentWeatherObject) => {
        console.log(v);
        this.makeCurrentWeatherObject(v);
      },
      error: (e: any) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  getForcastData() {
    return this.http.get<forecastWeatherObject>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${this.coord$.getValue().lat}&lon=${this.coord$.getValue().lon}&lang=${this.lang}&appid=${this.appid}&units=${this.units}`
    ).subscribe({
      next: (v: forecastWeatherObject) => {
        console.log(v);
        this.makeForecastWeatherObject(v);
        
      },
      error: (e: any) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  makeCurrentWeatherObject(request: currentWeatherObject) {
    let datas = {} as weatherDataObj
    datas.location = request.name;
    datas.weather_icon = request.weather[0].icon;
    datas.weather = request.weather[0].main;
    datas.temperature = Math.round(request.main.temp);
    datas.windSpeed = Math.round(request.wind.speed);
    datas.cloudness = request.clouds.all;
    datas.pressure = request.main.pressure;
    datas.humidity = request.main.humidity;
    datas.sunrise = new Date(
        request.sys.sunrise * 1000
      ).toLocaleTimeString(this.lang, {
        hour: 'numeric',
        minute: 'numeric',
    });
    datas.sunset = new Date(
        request.sys.sunset * 1000
      ).toLocaleTimeString(this.lang, {
        hour: 'numeric',
        minute: 'numeric',
    });
    datas.rain = request.rain?.['1h'];
    datas.snow = request.snow?.['1h'];
    this.curWeaDatasArr.push(datas)
  }
/** 
  makeCurrentWeatherObject(request: currentWeatherObject) {
    this.currentWeatherData.location = request.name;
    this.currentWeatherData.weather_icon = request.weather[0].icon;
    this.currentWeatherData.weather = request.weather[0].main;
    this.currentWeatherData.temperature = Math.round(request.main.temp);
    this.currentWeatherData.windSpeed = Math.round(request.wind.speed);
    this.currentWeatherData.cloudness = request.clouds.all;
    this.currentWeatherData.pressure = request.main.pressure;
    this.currentWeatherData.humidity = request.main.humidity;
    this.currentWeatherData.sunrise = new Date(
        request.sys.sunrise * 1000
      ).toLocaleTimeString(this.lang, {
        hour: 'numeric',
        minute: 'numeric',
    });
    this.currentWeatherData.sunset = new Date(
        request.sys.sunset * 1000
      ).toLocaleTimeString(this.lang, {
        hour: 'numeric',
        minute: 'numeric',
    });
    this.currentWeatherData.rain = request.rain?.['1h'];
    this.currentWeatherData.snow = request.snow?.['1h'];
  }
*/
  makeForecastWeatherObject(request: forecastWeatherObject) { 
    this.forcastWearherData.location = request.city.name;
    this.forcastWearherData.forecastArr = [];
    for (let i = 0; i < request.list.length; i++) {
      let datas = {} as weatherDataObj;
      datas.time =
        new Date(request.list[i].dt_txt).toLocaleTimeString(this.lang, {
          weekday: 'long',
          // month: 'short',
          // day: 'numeric',
          hour: 'numeric',
          dayPeriod: 'short',
        }) + 'h';
      datas.weather_icon = request.list[i].weather[0].icon;
      datas.weather = request.list[i].weather[0].main;
      datas.temperature = Math.round(request.list[i].main.temp);
      datas.windSpeed = Math.round(request.list[i].wind.speed);
      datas.cloudness = request.list[i].clouds.all;
      datas.pressure = request.list[i].main.pressure;
      datas.humidity = request.list[i].main.humidity;
      datas.rain = request.list[i].rain?.['3h'];
      datas.snow = request.list[i].snow?.['3h'];
      this.forcastWearherData.forecastArr.push(datas);
    }
  }
}

