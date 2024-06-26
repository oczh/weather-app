import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  weatherDataObj,
  forecastObj,
  currentWeatherObject,
  Coord,
  forecastWeatherObject,
} from './types_interfaces';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  appid: string;
  lang: string;
  coord = {} as Coord;
  units: string;
  currentWeather: currentWeatherObject;
  currentWeatherData = {} as weatherDataObj;
  forcastWeather: forecastWeatherObject;
  forcastWearherData = {} as forecastObj;
  coord$: any;

  constructor(public http: HttpClient) {
    this.appid = '6c46aa43db7539a6daf11a763626b3d2';
    this.lang = navigator.language;
    this.units = 'metric';
  }

  getCurrentWeather() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.coord.lat = data.coords.latitude;
      this.coord.lon = data.coords.longitude;
      this.getCurrentRequest().subscribe({
        next: (v) => {
          console.log(v);
          this.currentWeather = v;
          this.makeCurrentWeatherObject(v);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    });
  }

  getForcastWeather() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.coord.lat = data.coords.latitude;
      this.coord.lon = data.coords.longitude;
      this.getForcastRequest().subscribe({
        next: (v) => {
          console.log(v);
          this.forcastWeather = v;
          this.makeForecastWeatherObject(v);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    });
  }

  makeweatherobject(current: boolean, locationForm: boolean) {
    if(locationForm) {
      this.requestHandling(current)
    } 
    else {
      this.readcoords(this.requestHandling, current)
    }
  }

  readcoords(getrequest: any, current: boolean) {
      navigator.geolocation.getCurrentPosition((data) => {
        this.coord.lat = data.coords.latitude;
        this.coord.lon = data.coords.longitude;
        getrequest(current, this);
      });
    }

  requestHandling(current : boolean, context?: any) {
    if(current === true){
      this.getCurrentRequest().subscribe({
        next: (v: any) => {
          console.log(v);
          //this.forcastWeather = v;
          this.makeCurrentWeatherObject(v);
        },
        error: (e: any) => console.error(e),
        complete: () => console.info('complete'),
      });
    }
    else if(current === false){
      if (context) {
        context.getForcastRequest().subscribe({
          next: (v: any) => {
            console.log(v);
            //this.forcastWeather = v;
            context.makeForecastWeatherObject(v);
          },
          error: (e: any) => console.error(e),
          complete: () => console.info('complete'),
        })
      }
      else {
      this.getForcastRequest().subscribe({
        next: (v: any) => {
          console.log(v);
          //this.forcastWeather = v;
          this.makeForecastWeatherObject(v);
        },
        error: (e: any) => console.error(e),
        complete: () => console.info('complete'),
      })

      }
    }
  }

  makeCurrentURL(
    language: string,
    coordinates: Coord,
    api: string,
    unit: string
  ) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=${language}&appid=${api}&units=${unit}`;
  }

  makeForcastURL(
    language: string,
    coordinates: Coord,
    api: string,
    unit: string
  ) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=${language}&appid=${api}&units=${unit}`;
  }

  getCurrentRequest() {
    console.log(this.coord)
    return this.http.get<currentWeatherObject>(
      this.makeCurrentURL(this.lang, this.coord, this.appid, this.units)
      );
  }

  getForcastRequest() {
    console.log(this)
    console.log(this.http)
    return this.http.get<forecastWeatherObject>(this.makeForcastURL(this.lang, this.coord, this.appid, this.units)
    );
  }

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
    console.log(this.forcastWearherData);
  }
}
