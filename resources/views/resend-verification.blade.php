@extends('layouts.app')

@section('title', 'Login')

@section('content')

<div class="row">
    <div class="col-md-4 offset-md-4">
        <h4>Resend email verification</h4>
        <div class="row my-2">
            <div class="col text-break">
                If you did not receive a verification email after signing up, you can request a new one here by submitting
                this form with the email address you signed up with.
            </div>
        </div>
        <form method="post" action="{{ route('verification.send') }}">
            @csrf
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email">
            </div>
            <div class="mb-3 align-self-end">
                <button type="submit" class="btn btn-primary">Resend verification email</button>
            </div>
        </form>
    </div>
</div>

@endsection
