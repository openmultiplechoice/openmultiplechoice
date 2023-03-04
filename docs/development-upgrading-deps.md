# Upgrading dependencies

## Laravel

Upgrading Laravel from major to major version (for example version 9.x -> 10.x)
usually is fairly frictionless:

1. Raise the version in `composer.json` and run `composer update`
1. Go through the official upgrade guide and apply necessary changes, if any
   (for example https://laravel.com/docs/10.x/upgrade)
1. Apply changes from https://github.com/laravel/laravel to keep the Laravel
   app files up-to-date. This is the most time-consuming step, as each change
   has to be reviewed.
1. Make sure everything works as expected.
