# Feroxo Welding S.R.O. website

Готовый React/Vite сайт по выгруженному Figma-дизайну и SVG/assets архивам.

## Что внутри

- Многостраничная структура через hash-routing: Home, About Us, Products, Product detail, Service, News, News detail, Contact, Request.
- Адаптивная верстка под desktop/tablet/mobile.
- Ассеты оптимизированы из выгрузки Figma и SVG-архивов.
- Карточки товаров, категории, фильтр товаров, страницы товара.
- Форма Make Request с валидацией, выбранным оборудованием, сохранением списка в localStorage.
- Модальное окно заявки, product gallery, accordions на странице товара, news cards, carousel-like blocks.

## Запуск локально

```bash
cd feroxo-site
npm install
npm run dev
```

Открыть в браузере:

```bash
http://localhost:5173
```

## Сборка production

```bash
npm run build
npm run preview
```

После сборки готовая статическая версия будет в папке:

```bash
dist
```

## Как открыть, если папка лежит в Downloads

Windows PowerShell пример:

```powershell
cd "$env:USERPROFILE\Downloads\feroxo-site"
npm install
npm run dev
```

## GitHub Pages / static deploy

Проект собран как статический SPA с hash-routing (`#/products`, `#/contact`), поэтому его можно заливать на GitHub Pages, Netlify, Vercel или обычный хостинг без настройки серверных redirects.

## Важно

Форма заявки сейчас работает как frontend-прототип: валидирует данные, сохраняет последнюю заявку и выбранное оборудование в `localStorage`. Для production нужно подключить реальную отправку на email/API/CRM клиента.

Комментарии Figma обычно не попадают в локальный `.fig` export. В архиве я смогла использовать структуру страниц, изображения и SVG-макеты, но не отдельные онлайн-комментарии, если они были оставлены именно как Figma comments.
