@extends('layouts.app')

@section('title', 'Login')

@section('content')

<div class="row">
    <div class="col-md-4 offset-md-4">
        <form method="post" class="mt-5">
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name') }}">
                @error('name')
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email') }}">
                @error('email')
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control @error('password') is-invalid @enderror" id="password" name="password">
                @error('password')
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                <label for="password_confirmation" class="form-label">Password confirmation</label>
                <input type="password" class="form-control" id="password_confirmation" name="password_confirmation">
            </div>
            @if($config['signup_mode'] === 'token')
                <div class="mb-3">
                    <label for="token" class="form-label">Registration Token</label>
                    <input type="text" class="form-control @error('token') is-invalid @enderror" id="token" name="token" value="{{ old('token') }}">
                    @error('token')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                    @enderror
                </div>
            @endif
            <button type="submit" class="btn btn-primary">Sign up</button>
        </form>
    </div>
</div>

@endsection
