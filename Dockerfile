# Minimal single-container image for trying out OpenMultipleChoice.
# Uses SQLite so no separate database service is required.

# --- Frontend assets -------------------------------------------------------
FROM node:22-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY resources resources
COPY vite.config.js ./

# vite.config.js only needs the source files above, but laravel-vite-plugin
# reads composer.json/artisan to detect the Laravel project root.
COPY composer.json artisan ./

RUN npm run build

# --- PHP dependencies --------------------------------------------------
FROM composer:2 AS composer-deps

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
        --no-dev \
        --no-interaction \
        --no-progress \
        --no-scripts

# --- Runtime image -----------------------------------------------------
FROM php:8.3-cli-alpine

RUN apk add --no-cache sqlite-libs git \
    && apk add --no-cache --virtual .build-deps sqlite-dev \
    && docker-php-ext-install pdo_sqlite \
    && apk del .build-deps

WORKDIR /var/www/html

COPY . .
COPY --from=composer-deps /app/vendor ./vendor
COPY --from=frontend /app/public/build ./public/build

COPY docker/.env.docker .env.docker
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Demo data (sqlite DB, generated .env, uploaded images) lives here so it
# survives container restarts when the directory is mounted as a volume.
VOLUME /var/www/html/storage/app

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]
