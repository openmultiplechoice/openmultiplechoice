# Tinker Cheatsheet

Various helpful [Tinker](https://laravel.com/docs/8.x/artisan#tinker)
example commands.

```
# Get all decks that are part of module "Demo"
App\Models\Module::where('name', 'Demo')->first()->decks()->get();
```
