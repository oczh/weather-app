import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type weatherDataObj = {
  location?: string;
  time?: string;
  weather_icon: string;
  weather: string;
  temperature : number;
  windSpeed: number;
  cloudness: number;
  pressure: number;
  humidity: number;
  sunrise?: string;
  sunset?: string;
  rain?: number;
  snow?: number;
}

type forecastObj = {
  location: string;
  forecastArr: weatherDataObj[] 
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
  rain?: Rain;
  snow?: Snow;
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
  gust?: number;
}
interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
  temp_kf?: number;
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

interface Rain {
  '1h' : number;
  '3h' : number;
}

interface Snow {
  '1h' : number;
  '3h' : number;
}

interface forecastWeatherObject {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}
interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys_forcast;
  dt_txt: string;
  rain?: Rain;
  snow?: Snow;
}
interface Sys_forcast {
  pod: string;
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
  currentWeatherData = {} as weatherDataObj;
  forcastWeather: forecastWeatherObject;
  forcastWearherData = {} as forecastObj;

  constructor(private http: HttpClient) { 
    this.appid = '6c46aa43db7539a6daf11a763626b3d2';
    this.lang = navigator.language;
    this.units = 'metric';
  }

  getCurrentWeather() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.coord.lat = data.coords.latitude;
      this.coord.lon = data.coords.longitude;
      this.getCurrentRequest().subscribe({
        next: (v) =>{ 
          console.log(v)
          this.currentWeather = v;
          this.makeCurrentWeatherObject(v);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    })
  }

  getForcastWeather() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.coord.lat = data.coords.latitude;
      this.coord.lon = data.coords.longitude;
      this.getForcastRequest().subscribe({
        next: (v) =>{ 
          console.log(v)
          this.forcastWeather = v;
          this.makeForecastWeatherObject(v);
          console.log(this.makeForecastWeatherObject(v))
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    })
  }

  makeCurrentURL(language: string, coordinates: Coord, api: string, unit: string){
    return `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=${language}&appid=${api}&units=${unit}`
  }

  makeForcastURL(language: string, coordinates: Coord, api: string, unit: string){
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=${language}&appid=${api}&units=${unit}`
  }

  getCurrentRequest() {
    return this.http.get<currentWeatherObject>(this.makeCurrentURL(this.lang, this.coord, this.appid, this.units));
  }   

  getForcastRequest() {
    return this.http.get<forecastWeatherObject>(this.makeForcastURL(this.lang, this.coord, this.appid, this.units));
  }

  makeCurrentWeatherObject(request : currentWeatherObject){
    this.currentWeatherData.location = request.name; 
    this.currentWeatherData.weather_icon = request.weather[0].icon;
    this.currentWeatherData.weather = request.weather[0].main;
    this.currentWeatherData.temperature = request.main.temp;
    this.currentWeatherData.windSpeed = request.wind.speed;
    this.currentWeatherData.cloudness = request.clouds.all;
    this.currentWeatherData.pressure = request.main.pressure;
    this.currentWeatherData.humidity = request.main.humidity;
    this.currentWeatherData.sunrise = this.formatedDate(request.sys.sunrise);
    this.currentWeatherData.sunset = this.formatedDate(request.sys.sunset);
    this.currentWeatherData.rain = request.rain?.['1h'];
    this.currentWeatherData.snow = request.snow?.['1h'];    
  }

  makeForecastWeatherObject(request : forecastWeatherObject){
    this.forcastWearherData.location = request.city.name;
    this.forcastWearherData.forecastArr = []
    for(let i = 0; i < request.list.length; i++){
      let datas = {} as weatherDataObj
      datas.time = this.time(request.list[i].dt_txt);
      datas.weather_icon = request.list[i].weather[0].icon;
      datas.weather = request.list[i].weather[0].main;
      datas.temperature = request.list[i].main.temp;
      datas.windSpeed = request.list[i].wind.speed;
      datas.cloudness = request.list[i].clouds.all;
      datas.pressure = request.list[i].main.pressure;
      datas.humidity = request.list[i].main.humidity;
      datas.rain = request.list[i].rain?.['3h'];
      datas.snow = request.list[i].snow?.['3h'];
      this.forcastWearherData.forecastArr.push(datas);
    }
    console.log(this.forcastWearherData)
  }

  formatedDate(unix_timestamp : number){
    const date = new Date(unix_timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours + ':' + minutes;
  }

  time(date: string){
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    const hours = new Date(date).getHours();
    return month + '.' + day + '. ' + hours + 'h'
  }
}

