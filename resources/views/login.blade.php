@extends('layouts.app')

@section('title', 'Login')

@section('content')

<div class="row">
    <div class="col-md-4 offset-md-4">
        @error('login')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror

@if (config('app.login.form'))
        <form method="post" class="mt-5">
            @csrf
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password">
            </div>
            <div class="mb-2">
                <input type="checkbox" class="form-check-input" id="form_remain_logged_in" name="remain_logged_in">
                <label for="form_remain_logged_in" class="form-label">Remain logged in on this device</label>
            </div>
            <div class="row justify-content-between">
                <div class="col-xl-auto d-grid gap-2 d-xl-block my-2">
                    <button type="submit" class="btn btn-primary">Log in</button>
                    @if(config('app.signup_enabled'))
                        <a href="{{ route('signup') }}" class="btn btn-link">Sign up</a>
                    @endif
                </div>
                <div class="col-xl-auto d-grid gap-2 d-xl-block my-2 dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Trouble logging in?
                    </button>
                    <ul class="dropdown-menu">
                        <li><a href="{{ route('password.request') }}" class="dropdown-item">Forgot password?</a></li>
                        <li><a href="{{ route('verification.resend') }}" class="dropdown-item">Resend verification email</a></li>
                    </ul>
                </div>
            </div>

        </form>
@endif

@if (config('app.login.keycloak'))
        <p class="mt-5">Use <span class="fw-bold">{{ parse_url(config('services.keycloak.base_url'), PHP_URL_HOST) }}</span> to log in:</p>
        <form action="{{ route('keycloak-login') }}" method="get">
            @csrf
            <div class="mb-2">
                <input type="checkbox" class="form-check-input" id="keycloak_remain_logged_in" name="remain_logged_in">
                <label for="keycloak_remain_logged_in" class="form-label">Remain logged in on this device</label>
            </div>
            <button type="submit" class="btn btn-primary">Log in</button>
        <form>
@endif
    </div>
</div>

@endsection
