@extends('layouts.app')

@section('title', 'Login')

@section('content')

<div class="row">
    <div class="col-md-4 offset-md-4">
        <h4>Request password reset</h4>
        <form method="post" class="mt-1">
            @csrf
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email') }}">
                @error('email')
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary">Request password reset</button>
        </form>
    </div>
</div>

@endsection
