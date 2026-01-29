import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCol,
  IonGrid,
  IonHeader,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  Platform,
} from '@ionic/angular/standalone';
import { WordpressService } from 'src/app/services/wordpress.service';
import { environment } from 'src/environments/environment';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonThumbnail,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    RouterLink,
  ],
})
export class HeaderComponent implements OnInit {
  menus: any[] = [];
  mainMenu: any = {};
  currentCategory: string = '';
  default: any;
  isDarkMode: boolean = false;
  symbol: string = '';

  constructor(
    private wpService: WordpressService,
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform,
  ) {}

  ngOnInit() {
    this.checkDarkMode();
    const arr_location = window.location.href.split('/');
    this.default = arr_location[arr_location.length - 1];
    this.symbol = environment.symbol;

    this.wpService.getMenus().subscribe({
      next: (data) => {
        this.menus = data;
        this.mainMenu = data.find(
          (menu: any) => menu.name.toLowerCase() === 'main',
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

  ngOnChange() {
    this.checkDarkMode();
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

  checkDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    prefersDark.addEventListener('change', (e) => {
      this.isDarkMode = e.matches;
    });
  }
}
