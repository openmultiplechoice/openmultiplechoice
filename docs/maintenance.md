# Maintenance

Documentation on the maintenance of an OMC installation.

> [!WARNING]
> Always make sure to back up your installation and data regularly and that
> your backups actually work and can be used to recover from failures, system
> and data loss.

> [!NOTE]
> The instructions below do not necessarily work for your installation and only
> serve as examples.

## Maintenance mode

```
sudo -u www-data php artisan down

... # Do maintenance work (see below)

sudo -u www-data php artisan up
```

See `php artisan down -h` for various options, for example `--refresh`,
`--with-secret` and `--render`.

## Updating

```
sudo -u www-data git pull

sudo -u www-data composer install

sudo -u www-data php artisan migrate

sudo -u www-data php artisan config:cache

sudo -u www-data php artisan view:cache
```
