import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
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
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonSkeletonText,
  IonIcon,
  IonChip,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { RouterModule } from '@angular/router';
import { WordpressService } from 'src/app/services/wordpress.service';
import { HelperService } from 'src/app/services/helper.service';
import { addIcons } from 'ionicons';
import { calendar } from 'ionicons/icons';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
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
export class CategoryPage implements OnInit {
  page: number = 1;
  posts: any[] = [];
  cat_slug: string = '';
  cat_name: string = '';
  loading: boolean = true;

  constructor(
    private wpService: WordpressService,
    private helperService: HelperService
  ) {
    addIcons({ calendar });
  }

  ngOnInit() {
    const arr_location = window.location.href.split('/');
    this.cat_slug = arr_location[arr_location.length - 1];
    this.getCategory(this.cat_slug);

    this.wpService
      .getPostsByCategory(this.cat_slug, this.page)
      .subscribe((data) => {
        this.loading = false;
        this.posts = data.posts.map((post: any) => {
          post.updated_date = this.helperService.lastDateRender(
            post.modified_date,
            post.published_date
          );

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

  getPostThumbnail(id: number) {
    return this.wpService.getMedia(id);
  }

  getCategories(ids: number[]) {
    return this.wpService.getCategorySlugsByIds(ids);
  }

  getCategory(slug: string) {
    this.wpService.getCategoryBySlug(slug).subscribe((data) => {
      this.cat_name = data[0].name;
    });
  }
}
