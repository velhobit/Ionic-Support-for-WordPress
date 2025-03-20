# 🌟 Ionic Support for WordPress

Este projeto de estudo demonstra como integrar eficientemente aplicações **Ionic com Angular**, utilizando o **WordPress como fonte de dados**. A combinação dessas tecnologias oferece uma solução completa e moderna para criar blogs, sites de notícias e aplicativos móveis com desempenho excepcional.

---

## 💡 Por que esta abordagem é interessante?

- **📱 Desenvolvimento Híbrido:** Crie aplicativos móveis com o Capacitor e aplicações web modernas utilizando o mesmo backend.
- **🌐 Integração Unificada:** A mesma API WordPress pode alimentar um site, um aplicativo móvel e uma aplicação web de forma consistente.
- **🔒 Segurança Aprimorada:** Abstração total do front e back do WordPress, garantindo maior proteção dos dados.
- **🚀 Aproveitamento do Ecossistema WordPress:** Utiliza APIs nativas do WordPress para desempenho otimizado, mantendo o uso eficiente dos recursos.
- **📈 SEO e Compartilhamento:** A inclusão de metadados e microdados via `meta.php` garante melhor indexação e compartilhamento de conteúdo.

---

## 🔧 Configuração

1. No WordPress de destino, instale o plugin necessário: [Ionic Support for WordPress - Plugin](https://github.com/velhobit/Ionic-Support-for-Wordpress-Plugin-).
2. Edite o arquivo `src/environments/environment.ts` com suas configurações locais.
3. Edite o arquivo `src/environments/environment.prod.ts` com suas configurações de produção.

---

## 🚀 Executando o Projeto

Para iniciar o ambiente de desenvolvimento, execute:

```bash
npm start
```

---

## 📦 Build do Projeto

Para gerar o build de produção, execute:

```bash
npm run build
```

---

## 📚 Entendendo os Pormenores do Projeto

Este projeto utiliza principalmente APIs nativas do WordPress, mas alguns endpoints foram otimizados por meio do plugin para garantir maior leveza e eficiência. Além disso, o plugin oferece suporte para uso de banners dinâmicos.

### 📋 Menus

- Crie o menu normalmente no painel WordPress.
- No arquivo de environment, declare o nome do menu que deseja utilizar na aplicação.

---

## 🖼️ Banners

- Crie listas de banners com slugs específicos no WordPress.
- As informações de `ALT`, `TITLE` e `CAPTION` são extraídas diretamente dos dados das mídias do WordPress.

---

## 📄 Metadados e Microdados

- O arquivo `meta.php` é responsável por adicionar metadados e microdados essenciais para SEO e compartilhamento social.
- Durante o build (`npm run build`), o arquivo `index.html` é convertido para `index.php`, garantindo que os dados do `meta.php` sejam incorporados corretamente.

---

Com essa estrutura, você aproveita o melhor do WordPress como CMS robusto e o poder do Ionic/Angular para criar aplicações modernas e performáticas! 🚀

## Próximos Recursos

- Adicionar Retorno e Navegação
- Adicionar Suporte Multidioma
- Adicionar Serviço de Alertas
- Adicionar Suporte de Estados Globais
- Adicionar Suporte a CustomFields
- Adicionar Suporte ao Woocommerce
