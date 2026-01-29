import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonSkeletonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WordpressService } from 'src/app/services/wordpress.service';
import { switchMap } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SchemaService } from 'src/app/services/schema.service';
import { MetaService } from 'src/app/services/meta.service';
import { HelperService } from 'src/app/services/helper.service';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonRow,
    IonCol,
    IonGrid,
    IonSkeletonText,
    IonThumbnail,
    HeaderComponent,
    IonChip,
    RouterLink,
    FooterComponent,
  ],
})
export class PostPage implements OnInit {
  post: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private helperService: HelperService,
    private wordpressService: WordpressService,
    private schemaService: SchemaService,
    private metaService: MetaService,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          const category = params['category'];
          const slug = params['slug'];
          return this.wordpressService.getPostByCategoryAndSlug(category, slug);
        }),
      )
      .subscribe((post) => {
        if (post) {
          this.changeDetectorRef.detectChanges();
          this.runContentScripts();
          this.schemaService.addSchemaToPage(post);
          this.metaService.updateMetaTags({
            title: post.title,
            description: post.description,
            image: post.thumbnail.url,
            url: window.location.href,
            publishedDate: post.published_date,
            modifiedDate: post.modified_date,
          });
          post.publishedDateRendered = this.helperService.dateRender(
            post.published_date,
          );
          post.modifiedDateRendered = this.helperService.dateRender(
            post.modified_date,
          );
          this.post = post;
          this.post.content = this.getSafeHtml(post.content);
          this.loading = false;
        }
      });
  }

  getSafeHtml(content: string) {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=|(?:v|e(?:mbed)?)\/))([a-zA-Z0-9_-]+)(?:[?&][^"]*)?/g;

    content = content?.replace(
      /(<div class="wp-block-embed__wrapper">)(.*?)(<\/div>)/gs,
      (match, p1, p2, p3) => {
        const youtubeMatch = youtubeRegex.exec(p2); // Usando .exec para pegar o grupo correto
        if (youtubeMatch) {
          const videoId = youtubeMatch[1]; // O ID do vídeo estará no grupo 1
          if (videoId) {
            const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            return `${p1}${embedCode}${p3}`;
          }
        }
        return match; // Se não houver correspondência, retorna o match original
      },
    );

    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  runContentScripts() {
    const container = document.querySelector(`#postContent`);

    if (container) {
      const scripts = container.querySelectorAll('script');
      console.log(scripts);
      scripts.forEach((originalScript: any) => {
        const newScript = document.createElement('script');

        Array.from(originalScript.attributes).forEach((attr: any) =>
          newScript.setAttribute(attr.name, attr.value),
        );
        if (originalScript.textContent) {
          newScript.textContent = originalScript.textContent;
        }

        originalScript.parentNode.insertBefore(newScript, originalScript);
        originalScript.remove();
      });
    }
  }
}
