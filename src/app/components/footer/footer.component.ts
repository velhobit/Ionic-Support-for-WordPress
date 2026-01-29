import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { SocialMedia } from 'src/app/models/social-media';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonGrid, IonRow, IonCol, RouterLink],
})
export class FooterComponent implements OnInit {
  year: string = new Date().getFullYear().toString();
  social?: SocialMedia[] = [];

  constructor() {
    this.social = environment.social;
  }

  ngOnInit() {}

  goTo(url: string) {
    window.open(url, '_blank');
  }
}
