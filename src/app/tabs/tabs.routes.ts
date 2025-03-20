import { Routes } from '@angular/router';
import { CategoryPage } from '../pages/category/category.page';
import { HomePage } from '../pages/home/home.page';
import { PostPage } from '../pages/post/post.page';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'home',
        redirectTo: '/',
        pathMatch: 'full',
      },
      {
        path: 'post/:category/:slug',
        component: PostPage,
      },
      {
        path: 'category/:slug',
        component: CategoryPage,
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('../pages/categories/categories.page').then(
            (m) => m.CategoriesPage
          ),
      },
      {
        path: 'social',
        loadComponent: () =>
          import('../pages/social/social.page').then((m) => m.SocialPage),
      },
    ],
  },
];
