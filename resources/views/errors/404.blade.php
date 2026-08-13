@extends('layouts.app')

@section('title', '404 - Page not found')

@section('content')
<main class="row justify-content-center pt-4">
    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
        <div class="card border text-center bg-body-tertiary">
            <div class="card-body p-4 p-md-5">
                <i class="bi bi-signpost-split display-3 text-primary"></i>
                <p class="text-body-secondary fw-semibold mt-3 mb-2">Error 404</p>
                <h1 class="h2 mb-3">Page not found</h1>
                <p class="text-body-secondary mb-4">
                    The address may be incorrect, or the page may no longer be available.
                </p>

                <div class="d-flex flex-column flex-sm-row flex-wrap justify-content-center gap-2">
                    <a class="btn btn-primary" href="{{ route('index') }}">
                        <i class="bi bi-house-door me-1"></i>
                        Go home
                    </a>
                    <a class="btn btn-outline-primary" href="{{ route('sessions.create') }}">
                        <i class="bi bi-rocket-takeoff me-1"></i>
                        Start a new session
                    </a>
                    <a class="btn btn-outline-secondary" href="{{ route('decks.index') }}">
                        <i class="bi bi-collection me-1"></i>
                        View your decks
                    </a>
                </div>
            </div>
        </div>
    </div>
</main>
@endsection
