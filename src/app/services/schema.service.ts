import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  constructor() {}

  public addSchemaToPage(post: any) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      image: post.thumbnail.url,
      publisher: {
        '@type': 'Organization',
        name: 'Velho Bit - Apple',
        logo: {
          '@type': 'ImageObject',
          url: 'https://apple.velhobit.com.br/assets/main-icon.png',
        },
      },
      datePublished: post.published_date,
      dateModified: post.modified_date,
      description: post.description,
      mainEntityOfPage: post.url,
    };

    this.addJsonLdSchema(schema);
  }

  private addJsonLdSchema(schema: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
