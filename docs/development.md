# Development

## Requirements

* PHP
* Node.js and npm
* A PostgreSQL (preferred) or MariaDB database

If you want to use a virtual machine for the development environment,
Homestead can be used:

* [Vagrant](https://www.vagrantup.com/) with VirtualBox or Parallels as provider
* [Homestead](https://laravel.com/docs/homestead)

## Setting up the environment

### Local

Once you have PHP and Node.js installed and a local clone of the OMC
repository, `cd` into the directory:

```
cd openmultiplechoice
```

... and create an `.env` file from the template:

```
cp .env.example .env
```

Use `php artisan key:generate` to create an app key:

```
php artisan key:generate # --> automatically updates your .env file
```

Adjust the `.env` file to work with your setup, for example:

```
...
APP_URL=http://127.0.0.1:8000
ASSET_URL=http://127.0.0.1:8000
...
```

Install the required PHP packages:

```
composer install
```

Create the default favicon file, storage links and initialize the database:

```
touch public/favicon.ico
php artisan storage:link
php artisan migrate:fresh
```

Run the PHP development server via `artisan`:

```
php artisan serve
```

Your local installation should now be reachable.

Instructions on how to build and run the frontend code can be found
under "Development workflow" [here](#development-workflow).

### Homestead

After [installation](https://laravel.com/docs/8.x/homestead#installing-homestead),
a `folders` mount and `sites` entry for OMC must be added to the generated
`Homestead.yaml` file. For example:

```
[...]

folders:
    - map: ~/code/
      to: /home/vagrant/code

sites:
    - map: omc.test
      to: /home/vagrant/code/openmultiplechoice/public

[...]
```

Above `omc.test` is used as the domain. The domain needs to be configured
in the `hosts` file of the host system. On Linux / macOS the file is located
at `/etc/hosts`, on Windows at `C:\Windows\System32\drivers\etc\hosts`.

#### Starting and connecting to the VM

`vagrant up` starts the VM:

```
vagrant up
```

Connect to the VM and `cd` into the OMC directory (the location might
differ in your setup depending on your `Homestead.yaml`):

```
vagrant ssh
cd code/openmultiplechoice/
```

Note: don't forget to update the base image from time to time, e.g. after
a Homestead update: `vagrant box update`.

#### OMC configuration

First install the requirements:

```
composer install
```

OMC is primarily configured through environment variables via dotenv.
An example file `.env.example` is included. A copy of `.env.example`
is a good starting point:

```
cp .env.example .env
```

For the development environment, only a single change to `.env` is needed;
use `php artisan key:generate` to create an app key.

```
# NOTE: this key is secret, never share it. The key below is an example
# key that should not be used.
APP_KEY=base64:xKQESFCyonhA6fjZVzW+DDho7s17W2SdJCxa7u+teuw=
```

Finally, create the default favicon file and storage links:

```
touch public/favicon.ico
php artisan storage:link
```

That's it! All other values can remain set to their defaults.

Laravel's [Artisan](https://laravel.com/docs/8.x/artisan) is used to

1. initalize the database and
1. add demo data.

```
php artisan migrate:fresh
php artisan db:seed --class=DemoSeeder
php artisan db:seed --class=DemoUserSeeder
```

OMC should now be running and reachable in your browser at http://omc.test

`DemoUserSeeder` created two demo users:

* `demo@example.com` with password `demo` and
* `demoadmin@example.com` with password `demoadmin`.

## Testing scheduled jobs

To test scheduled jobs, you need to run the scheduler. During development,
this can be done with running the schedule worker as follows:

```
php artisan schedule:work
```

## Testing the API

To test the API, create an API token and use it as Bearer token with curl.

For example, to fetch all decks:

```
curl -H 'Authorization: Bearer <TOKEN>' http://omc.test/api/decks
```

Please note that the API is a work in progress and neither complete nor stable.

## Building JavaScript and CSS files

OMC uses Vite as a frontend build tool and asset bundler. The most used
commands are described below.

### Requirements

Since the Node.js and npm version coming with Homestead are not the latest
versions, use the [Node Version Manager](https://github.com/nvm-sh/nvm) to
install both on the host.

Then install the Node.js dependencies:

```
npm install --also=dev
```

### Production build

If you made a change to Svelte, Sass or JavaScript files, run `npm run build`
to rebuild the bundle files and commit the changes.

### Development workflow

During development, `npm run dev` can be used to make webpack watch the
sources and trigger a rebuild whenever you made a change. This way you can
jump back and forth between your editor and the browser and instantly see
the result of your changes.

After installing [clockwork](https://underground.works/clockwork/) from the 
dev dependencies (which should happen automatically) you can see the data
collected for each request by visiting `http://[your-omc-domain]/clockwork`
or by using the clockwork browser extension (for [Chrome](https://chrome.google.com/webstore/detail/clockwork/dmggabnehkmmfmdffgajcflpdjlnoemp) 
or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/clockwork-dev-tools/)).
You can use the collected data to analyze the performance of the application
or eventual changes you make including a deeper look into the database queries.
Clockwork only works while the application is in debug mode and is using a local
domain.

## Updating dependencies

### PHP / Composer

To update packages to the newest version within the set range in `composer.json`,
run

```
composer update
```

If `composer install` leads to an error like the example below, the issue could
be a more recent php version on the machine where the update was done (for example,
php8.3 on the developer machine and php8.1 on the target server).

```
$ composer install
Installing dependencies from lock file (including require-dev)
Verifying lock file contents can be installed on current platform.
Your lock file does not contain a compatible set of packages. Please run composer update.

  Problem 1
    - symfony/css-selector is locked to version v7.0.0 and an update of this package was not requested.
    - symfony/css-selector v7.0.0 requires php >=8.2 -> your php version (8.1.2) does not satisfy that requirement.
  Problem 2
[...]
```

In this case, make sure to use a compatible php version for the update. For
example, on a macOS system with a brew php8.1. installation:

```
/opt/homebrew/opt/php@8.1/bin/php /opt/homebrew/bin/composer update
```

To upgrade packages to the latest version, find all outdated packages, update
the version in `composer.json` and then update.

```
composer outdated -D
...
```

### JavaScript

To update packages to the newest version within the set range in `package.json`,
run

```
npm update --save
```

To upgrade packages to the latest version, use `npm-check-updates`:

```
npm install --no-save npm-check-updates
npx ncu -u
npm install
```

In both cases, you have to rebuild the bundle files after:

```
npm run build
```

## Load testing

There are various tools to load test web applications, [oha](https://github.com/hatoo/oha)
is one option.

To run a load test, you have to manually disable API throttling in `app/Http/Kernel.php`
first.

For example, to create 1000 sessions from 100 concurrent connections:

```
oha http://127.0.0.1:8000/api/sessions \
  -n 1000 \
  -c 100 \
  -m POST \
  -H 'Authorization: Bearer <TOKEN>'
  -T 'application/json' \
  -d '{"deck_id": 1}'
```
