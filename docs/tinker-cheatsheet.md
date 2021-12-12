# Tinker Cheatsheet

Various helpful [Tinker](https://laravel.com/docs/8.x/artisan#tinker)
example commands.

```
# Get all decks that are part of module "Demo"
App\Models\Module::where('name', 'Demo')->first()->decks()->get();

# Put a file (e.g. an image) from disk into storage
# (here `<PROJECT_ROOT>/storage/app/images'`)
Storage::putFile('images', new File('some.jpg'))
```
