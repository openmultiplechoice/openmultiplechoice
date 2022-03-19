@extends('layouts.app')

@section('title', 'Login')

@section('content')

<div class="row">
    <div class="col-md-4 offset-md-4">
        @error('login')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror

@if (config('app.login.form'))
        <form method="post">
            @csrf
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password">
            </div>
            <button type="submit" class="btn btn-primary">Log in</button>
        </form>
@endif

@if (config('app.login.keycloak'))
        <a href="{{ route('keycloak-login') }}" class="btn btn-dark mt-2">Log in with Keycloak</a>
@endif
    </div>
</div>

@endsection
