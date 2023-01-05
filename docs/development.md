# Development

## Requirements

* [Vagrant](https://www.vagrantup.com/) with VirtualBox or Parallels as provider
* [Homestead](https://laravel.com/docs/8.x/homestead)
* Node.js + nvm (https://brew.sh or https://github.com/nvm-sh/nvm is recommended for the installation)

## Setting up the environment

The easiest way to set up a local development environment for OMC is
Laravel's [Homestead](https://laravel.com/docs/8.x/homestead) Vagrant
setup.

To run and work with the virtual machine, a separate terminal window is
recommended. This way switching between managing the virtual machine
and actual work (e.g. your code editor) is easy.

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

### Starting and connecting to the VM

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

### OMC configuration

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

Finally, create the storage links:

```
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

## Building JavaScript and CSS files

OMC uses Laravel's [Mix](https://laravel.com/docs/8.x/mix) as a configuration
layer on top of webpack. The most used commands are described below.

### Requirements

Since the Node.js and npm version coming with Homestead are not the latest
versions, use the [Node Version Manager](https://github.com/nvm-sh/nvm) to
install both on the host.

Then install the Node.js dependencies:

```
npm install --also=dev
```

### Production build

If you made a change to Svelte, Sass or JavaScript files, run `npm run prod`
to rebuild the bundle files and commit the changes.

### Development workflow

During development, `npm run watch` can be used to make webpack watch the
sources and trigger a rebuild whenever you made a change. This way you can
jump back and forth between your editor and the browser and instantly see
the result of your changes.

## Updating dependencies

### PHP / Composer

To update packages to the newest version within the set range in `composer.json`,
run

```
composer update
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
npm run prod
```
