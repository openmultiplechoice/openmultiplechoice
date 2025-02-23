<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\Paginator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Paginator::useBootstrapFive();

        if (DB::connection()->getDriverName() == 'sqlite') {
            DB::connection()->getPdo()->exec('PRAGMA journal_mode=WAL');
            DB::connection()->getPdo()->exec('PRAGMA synchronous=normal;');
            DB::connection()->getPdo()->exec('PRAGMA temp_store=memory;');
        }
    }
}
