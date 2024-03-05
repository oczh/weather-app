export type weatherDataObj = {
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

export type forecastObj = {
    location: string;
    forecastArr: weatherDataObj[] 
}

export interface currentWeatherObject {
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

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface Clouds {
    all: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust?: number;
}

export interface Main {
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

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Rain {
    '1h' : number;
    '3h' : number;
}

export interface Snow {
    '1h' : number;
    '3h' : number;
}

export interface forecastWeatherObject {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: City;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface List {
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

export interface Sys_forcast {
    pod: string;
}