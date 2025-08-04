# Installation

This guide outlines an installation on Ubuntu LTS but is mostly OS-agnostic.
Regardless of your operating system, it should give you an idea about the
required steps to install OMC.

In a nutshell, the requirements are:

* PHP with php-fpm
* A webserver, for example Nginx with FastCGI
* A supported database, for example PostgreSQL
* (optional) Memcached

## Install the OS dependencies

```
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
    composer \
    nginx \
    php-curl \
    php-fpm \
    php-memcached \
    php-pgsql \
    php-xml \
    postgresql
```

For an installation with MariaDB as database, install `mariadb-server` and
`php-mysql` instead of `postgresql` and `php-pgsql`.

## Create the installation directory

```
sudo mkdir -p /var/www/openmultiplechoice
sudo chown www-data: /var/www/openmultiplechoice
```

## Get OpenMultipleChoice

```
sudo -u www-data git clone https://github.com/openmultiplechoice/openmultiplechoice /var/www/openmultiplechoice
```

## Install the PHP dependencies

```
cd /var/www/openmultiplechoice
sudo -u www-data composer install
```

## Configure the webserver

### Nginx

Example Nginx configuration can be found under [`contrib/nginx/omc.conf`](../contrib/nginx/omc.conf).

Make sure to adjust the server name, for example:

```
server {
        ...
        server_name omc.example.com;
        ...
}
```

### Caddy

Example Caddy configuration:

```
omc.example.com {
	root * /var/www/openmultiplechoice/public

	php_fastcgi unix//run/php/php-fpm.sock

	file_server
}
```

## Set up the database

### PostgreSQL

Create a user:

```
createuser -P omc
```

Create a database:

```
createdb -O omc omc
```

### MariaDB (MySQL)

Create a user. Make sure to replace `TODO` with a strong and unique passphrase.

```
CREATE USER 'omc'@'localhost' IDENTIFIED BY 'TODO';
```

Create a database and grant all privileges to `'omc'@'localhost'`:

```
CREATE DATABASE omc;
GRANT ALL PRIVILEGES ON omc.* TO 'omc'@'localhost';
```

## Configure OpenMultipleChoice

Create the `.env` configuration file from the example:

```
cd /var/www/openmultiplechoice

sudo -u www-data cp .env.example .env
```

Create a unique and secret application key:

```
sudo -u www-data php artisan key:generate
```

Adjust the settings in `.env` according to your setup. At the very least,
the following parameters have to be updated:

```
APP_DEBUG=false
APP_ENV=production
APP_NAME
APP_URL

ASSET_URL

DB_DATABASE
DB_USERNAME
DB_PASSWORD
```

Cache the config for better performance:

```
sudo -u www-data php artisan config:cache
```

Run the database migrations:

```
sudo -u www-data php artisan migrate
```

After a reload of the webserver, OMC should be reachable under your server name.

# Post-Installation

## Create the first OMC user

Info on how to create a first user can be found in [`docs/tinker.md`](./tinker.md#add-user).

## Set up the Laravel scheduler

### Cron

Configure the [scheduler](https://laravel.com/docs/10.x/scheduling#running-the-scheduler)
to run scheduled tasks with the following cron job for the www-data user
(`crontab -e`):

```
* * * * * cd /var/www/openmultiplechoice && php artisan schedule:run >> /dev/null 2>&1
```

## Configure php-fpm

POST request and file upload limits are configured through the webserver
and php-fpm.

Example `/etc/php/8.3/fpm/conf.d/99-custom-php.ini`:

```
upload_max_filesize = 8M
post_max_size = 8M
```

Caddy's `request_body` `max_size` and Nginx's `client_max_body_size` have
to be set accordingly.

## Favicon

Create an empty default favicon file or put your own favicon in place:

```
touch public/favicon.ico
```
