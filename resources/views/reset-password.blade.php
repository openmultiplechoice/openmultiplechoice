@extends('layouts.app')

@section('title', 'Password Reset')

@section('content')

<div class="row">
    <div class="col-md-4 offset-md-4">
        <h4>Change password</h4>
        <form method="post" class="mt-1" action="{{ route('password.update') }}">
            @csrf
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email', request('email')) }}">
                @error('email')
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control @error('password') is-invalid @enderror" id="password" name="password" value="{{ old('password') }}">
                @error('password')
                <div class="invalid-feedback">
                    {{ $message }}
                </div>
                @enderror
            </div>
            <div class="mb-3">
                <label for="password_confirmation" class="form-label">Password confirmation</label>
                <input type="password" class="form-control @error('password_confirmation') is-invalid @enderror" id="password_confirmation" name="password_confirmation" value="{{ old('password_confirmation') }}">
                @error('password_confirmation')
                <div class="invalid-feedback">
                    {{ $message }}
                </div>
                @enderror
            </div>
            <input type="hidden" class="form-control" id="token" name="token" value="{{ $token }}">
            <button type="submit" class="btn btn-primary">Change password</button>
        </form>
    </div>
</div>

@endsection
