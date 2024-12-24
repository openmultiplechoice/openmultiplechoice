# Tinker

Various helpful example commands for [Tinker](https://laravel.com/docs/11.x/artisan#tinker),
Laravel's REPL ("read-eval-print loop").

## Running

```
cd <PROJECT_ROOT>
php artisan tinker
```

## Users

### Add user

```
$u = User::create(['name' => 'some', 'email' => 'some@example.com']);
$u->email_verified_at = now();
# $u->is_admin = true;
# $u->is_moderator = true;
$u->password = Hash::make('some');
$u->save();
```

## Decks

### List all decks of a particular module

```
App\Models\Module::where('name', 'Demo')->first()->decks()->get();
```

### Create `N` test decks for the demo admin user (here `50`)

```
Deck::factory()->count(50)->create([
    'access' =>  'public-rw-listed',
    'module_id' => 1,
    'user_id' => User::where('email', 'demoadmin@example.com')->first()
]);
```

## Files

### Put a file

Put a file (e.g. an image) from disk into storage (below the storage
path is `<PROJECT_ROOT>/storage/app/images'`):

```
use Illuminate\Http\File;
Storage::putFile('images', new File('some.jpg'));
```
