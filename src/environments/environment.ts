// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  siteUrl: 'http://localhost:8100',
  apiUrl: 'https://api.velhobit.com.br/apple',
  mainMenu: 'main',
  default_title: 'Velho Bit - Dicas e novidades sobre Apple',
  default_description:
    'Descubra dicas, truques e novidades sobre produtos e serviços da Apple. Fique por dentro de atualizações, tutoriais, soluções e as melhores práticas para otimizar o uso do seu iPhone, iPad, MacBook e mais.',
  default_image: 'http://localhost:8100/assets/favicon.png',
  symbol: '',
  social: [
    {
      name: '@designprogramacao',
      icon: 'fa-brands fa-telegram',
      url: 'http://t.me/designprogramacao',
    },
    {
      name: '@velhobit',
      icon: 'fa-brands fa-instagram',
      url: 'https://instagram.com/velhobit',
    },
    {
      name: '@velhobit',
      icon: 'fa-brands fa-threads',
      url: 'https://threads.net/velhobit',
    },
    {
      name: 'velhobit.com.br',
      icon: 'fa-brands fa-bluesky',
      url: 'https://bsky.app/profile/velhobit.com.br',
    },
    {
      name: '@velhobit',
      icon: 'fa-brands fa-tiktok',
      url: 'https://www.tiktok.com/@velhobit',
    },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
