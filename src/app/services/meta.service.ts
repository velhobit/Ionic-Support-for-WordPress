import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private meta: Meta, private title: Title) {}

  updateMetaTags(data: {
    title: string;
    description: string;
    image: string;
    url: string;
    publishedDate?: string;
    modifiedDate?: string;
  }) {
    this.title.setTitle(data.title);
    this.meta.updateTag({
      property: 'description',
      content: data.description,
    });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({
      property: 'og:description',
      content: data.description,
    });
    this.meta.updateTag({ property: 'og:image', content: data.image });
    this.meta.updateTag({ property: 'og:url', content: data.url });
    this.meta.updateTag({ property: 'og:type', content: 'article' });

    if (data.publishedDate) {
      this.meta.updateTag({
        property: 'article:published_time',
        content: data.publishedDate,
      });
    }
    if (data.modifiedDate) {
      this.meta.updateTag({
        property: 'article:modified_time',
        content: data.modifiedDate,
      });
    }
  }
}
