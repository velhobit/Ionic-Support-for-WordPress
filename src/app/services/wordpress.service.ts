import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private baseUrl = environment.apiUrl + '/wp-json/wp/v2'; // URL da API WordPress
  private customBaseUrl = environment.apiUrl + '/wp-json/custom/v1'; // URL personalizada para menus

  constructor(private http: HttpClient) {}

  /*
  getPosts(page = 0, excludedCategories: number[] = []): Observable<any> {
    const excluded = excludedCategories.join(',');
    return this.http.get(
      `${this.baseUrl}/posts?per_page=10&page=${page}&categories_exclude=${excluded}&order=desc`
    );
  }
*/

  getPosts(page = 0, excludedCategories: number[] = []): Observable<any> {
    return this.http.get(`${this.customBaseUrl}/posts/${page}/10`);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/${id}`);
  }

  getPostsByCategory(category: string, page = 0): Observable<any> {
    return this.http.get(
      `${this.customBaseUrl}/categories/${category}/posts/${page}/10`
    );
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  getPostByCategoryAndSlug(category: string, slug: string): Observable<any> {
    return this.http.get(`${this.customBaseUrl}/posts/${category}/${slug}/`);
  }

  getMedia(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/media/${postId}`);
  }

  getCategorySlugsByIds(categoryIds: number[]): Observable<any> {
    const ids = categoryIds.join(',');
    return this.http.get(`${this.baseUrl}/categories?include=${ids}`);
  }

  getCategoryBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories?slug=${slug}`);
  }

  getBannersList(): Observable<any> {
    return this.http.get(`${this.customBaseUrl}/banners/`);
  }

  getBanners(slug: string): Observable<any> {
    return this.http.get(`${this.customBaseUrl}/banners/${slug}`);
  }

  /**
   * Método para buscar todos os menus
   */
  getMenus(): Observable<any> {
    return this.http.get(`${this.customBaseUrl}/menus`);
  }
}
