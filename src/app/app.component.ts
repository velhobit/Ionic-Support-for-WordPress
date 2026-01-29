import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent } from './components/header/header.component';
import { register } from 'swiper/element/bundle';
import { SocialfabComponent } from './components/socialfab/socialfab.component';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HeaderComponent, SocialfabComponent],
})
export class AppComponent {
  constructor() {}
}
