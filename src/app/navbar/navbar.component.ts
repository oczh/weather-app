import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  links = [
    { title: 'Home', fragment: 'home' },
    { title: 'Current weather', fragment: 'current_weather' },
    { title: '5 day forecast', fragment: 'weather_forecast' }
  ];
  
  constructor(public route: ActivatedRoute) {}
  
}
