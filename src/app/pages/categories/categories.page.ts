import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { WordpressService } from 'src/app/services/wordpress.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class CategoriesPage implements OnInit {
  menus: any[] = [];
  mainMenu: any = {};
  currentCategory: string = '';
  default: any;

  constructor(
    private wpService: WordpressService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const arr_location = window.location.href.split('/');
    this.default = arr_location[arr_location.length - 1];

    this.wpService.getMenus().subscribe({
      next: (data) => {
        this.menus = data;
        this.mainMenu = data.find(
          (menu: any) => menu.name.toLowerCase() === 'main'
        );
        if (this.mainMenu && this.mainMenu.items) {
          this.mainMenu.items = this.mainMenu.items.map((item: any) => {
            if (item.url) {
              item.url = item.url.replace(environment.apiUrl, '');
              const arr_url = item.url.split('/').filter((v: any) => v !== '');
              item.name = arr_url[arr_url.length - 1];
            }
            return item;
          });
        }
      },
      error: (err) => {
        console.error('Erro ao carregar menus:', err);
      },
    });
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }
}
