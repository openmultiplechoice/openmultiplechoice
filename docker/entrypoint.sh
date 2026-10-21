#!/bin/sh
set -e

cd /var/www/html

# storage/app is the persisted volume; keep the real .env there too so the
# generated APP_KEY and the sqlite database survive container restarts.
ENV_FILE=storage/app/.env

if [ ! -f "$ENV_FILE" ]; then
    echo "No persisted .env found, creating one from the template..."
    cp .env.docker "$ENV_FILE"
fi
ln -sf "$ENV_FILE" .env

if ! grep -q '^APP_KEY=base64' .env; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

touch public/favicon.ico
php artisan storage:link --force >/dev/null 2>&1 || true

echo "Running database migrations..."
php artisan migrate --force

if [ ! -f storage/app/.demo-seeded ]; then
    echo "Seeding demo data (decks and demo users)..."
    php artisan db:seed --class=DemoSeeder --force
    php artisan db:seed --class=DemoUserSeeder --force
    touch storage/app/.demo-seeded
fi

echo "Starting the scheduler (generates the stats shown on the index page)..."
php artisan schedule:work &

echo "Starting OpenMultipleChoice on http://0.0.0.0:8000"
exec php artisan serve --host=0.0.0.0 --port=8000
