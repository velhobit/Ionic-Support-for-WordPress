import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { WordpressService } from '../../services/wordpress.service';
import { RouterModule } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { addIcons } from 'ionicons';
import { calendar } from 'ionicons/icons';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HelperService } from 'src/app/services/helper.service';
import { SchemaService } from 'src/app/services/schema.service';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonLabel,
    IonList,
    RouterModule,
    IonRow,
    IonCol,
    IonGrid,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonSkeletonText,
    IonIcon,
    IonChip,
    HeaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  page: number = 1;
  posts: any[] = [];
  banners: any[] = [];
  loading: boolean = true;

  constructor(
    private wpService: WordpressService,
    private helperService: HelperService,
    private schemaService: SchemaService,
    private metaService: MetaService
  ) {
    addIcons({ calendar });

    this.metaService.updateMetaTags({
      title: 'Velho Bit - Dicas e novidades sobre Apple',
      description:
        'Descubra dicas, truques e novidades sobre produtos e serviços da Apple. Fique por dentro de atualizações, tutoriais, soluções e as melhores práticas para otimizar o uso do seu iPhone, iPad, MacBook e mais.',
      image: 'https://apple.velhobit.com.br/assets/favicon.png',
      url: window.location.href,
    });
  }

  ngOnInit() {
    this.loadBanners();
    this.wpService.getPosts(this.page).subscribe((data) => {
      this.posts = data.posts.map((post: any) => {
        post.updated_date = this.helperService.lastDateRender(
          post.modified_date,
          post.published_date
        );
        this.loading = false;
        return {
          ...post,
          date_info: this.helperService.lastDateRender(
            post.modified,
            post.date
          ),
        };
      });

      //this.loadCategories();
    });
  }

  loadThumbnails() {
    const postsWithThumbnails = this.posts.map((post) => {
      return this.getPostThumbnail(post.featured_media).pipe(
        map((thumbnail) => {
          return {
            ...post,
            thumbnail: thumbnail,
          };
        })
      );
    });

    forkJoin(postsWithThumbnails).subscribe((postsWithThumbnailData) => {
      this.posts = postsWithThumbnailData;
    });
  }

  loadCategories() {
    const postWithCategories = this.posts.map((post) => {
      return this.getCategories(post.categories).pipe(
        map((categories) => {
          return {
            ...post,
            categories_data: categories,
          };
        })
      );
    });

    forkJoin(postWithCategories).subscribe((postWithCategories) => {
      this.posts = postWithCategories;
      this.loadThumbnails();
    });
  }

  loadBanners() {
    this.wpService.getBanners('main-banners').subscribe((data) => {
      this.banners = data.banners;
    });
  }

  getPostThumbnail(id: number) {
    return this.wpService.getMedia(id);
  }

  getCategories(ids: number[]) {
    return this.wpService.getCategorySlugsByIds(ids);
  }
}
