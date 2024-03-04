# Installation

**Please note**: it is recommended to install OMC on a separate virtual machine
or LXD system container.

A guided install guide for Ubuntu LTS can be found below.

## Requirements

* PHP with php-fpm
* A webserver, for example Nginx with FastCGI
* A supported database, for example MariaDB
* (optional) Memcached

## Ubuntu LTS (virtual machine or LXD container)

Prepare a new Ubuntu virtual machine or LXD container. For example:

```
lxc launch ubuntu:22.04 omc
```

Download the install script:

```
curl -LO https://raw.githubusercontent.com/openmultiplechoice/openmultiplechoice/master/tools/omc-install
```

Execute the install script:

```
bash ./omc-install
```

Adjust the server name in `/etc/nginx/sites-enabled/omc.conf`.

```
server {
        ...
        server_name omc.example.com;

        ...
}
```

Create a MySQL (MariaDB) user. Make sure to replace `TODO` with a strong
and unique passphrase.

```
CREATE USER 'omc'@'localhost' IDENTIFIED BY 'TODO';
```

Create a database and grant all privileges to `'omc'@'localhost'`:


```
CREATE DATABASE omc;
GRANT ALL PRIVILEGES ON omc.* TO 'omc'@'localhost';
```

Change to the `omc` user:

```
sudo su - omc
```

Copy the `.env.example` file and create a unique and secret application key:

```
cp .env.example .env
php artisan key:generate
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
php artisan config:cache
```

Run the database migrations:

```
php artisan migrate
```

Change back to the administrative user and reload nginx to enable
`/etc/nginx/sites-enabled/omc.conf`:

```
sudo systemctl restart nginx
```

OMC should now be reachable under your server name.

Configure the [scheduler](https://laravel.com/docs/10.x/scheduling#running-the-scheduler)
to run scheduled tasks with the following cron job for the OMC user
(`crontab -e`):

```
* * * * * cd /var/www/openmultiplechoice && php artisan schedule:run >> /dev/null 2>&1
```
