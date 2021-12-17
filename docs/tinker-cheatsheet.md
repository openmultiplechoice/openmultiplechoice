# Tinker Cheatsheet

Various helpful [Tinker](https://laravel.com/docs/8.x/artisan#tinker)
example commands.

Run tinker:

```
cd <PROJECT_ROOT>
php artisan tinker
```

Add a user:

```
User::create(['name' => 'some', 'email' => 'some@example.com', 'password' => Hash::make('some')]);
```

Get all decks that are part of module `Demo`:

```
App\Models\Module::where('name', 'Demo')->first()->decks()->get();
```

Put a file (e.g. an image) from disk into storage (below the storage
path is `<PROJECT_ROOT>/storage/app/images'`):

```
Storage::putFile('images', new File('some.jpg'))
```
