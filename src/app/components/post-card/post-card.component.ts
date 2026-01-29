import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-post-card',
  standalone: true,
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonChip,
    RouterLink,
  ],
})
export class PostCardComponent implements OnInit {
  @Input() post?: any;

  constructor() {}

  ngOnInit() {}
}
