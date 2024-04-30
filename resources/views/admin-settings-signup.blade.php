@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Admin settings')

@section('content')

<div class="row">
    <div class="col">
        <h4>Sign-up settings</h4>
        <form action="/admin/settings/signup" method="post">
            @method('PUT')
            @csrf
            <div class="mb-3 mt-1">
                <h6>Sign-up mode</h6>
                <select class="form-select @error('signup_mode') is-invalid @enderror" aria-label="Signup mode" name="signup_mode">
                    <option {{ $admin_settings_signup['signup_mode'] === "manual" ? 'selected' : '' }} value="manual">manual</option>
                    <option {{ $admin_settings_signup['signup_mode'] === "token" ? 'selected' : '' }} value="token">token</option>
                    <option {{ $admin_settings_signup['signup_mode'] === "open" ? 'selected' : '' }} value="open">open</option>
                </select>
                @error('signup_mode')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
                <div class="form-text">
                    The sign-up mode defines the way users are activated after registration:<br><br>
                    <strong>manual</strong>: each user will have to be manually activated by an admin. <br>
                    <strong>token</strong>: users who provide a valid token during sign-up will be activated without admin interaction. <br>
                    <strong>open</strong>: all users are activated after sign-up without admin interaction.
                    Caution: everyone with a valid email address can sign up on your instance. We recommend to restrict the allowed email domain in this case.
                </div>
                @if($admin_settings_signup['signup_mode'] === "token")
                    <div class="form-text mt-3">
                        <a href="/admin/settings/signup/token" class="btn btn-sm btn-primary">Manage tokens</a>
                    </div>
                @endif
            </div>
            <div class="mb-3 mt-1">
                <h6>Allowed mail domain for sign-up</h6>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">@</span>
                    <input type="text" class="form-control @error('signup_allowed_email') is-invalid @enderror" name="signup_allowed_email" value="{{ old('signup_allowed_email', $admin_settings_signup['signup_allowed_email']) }}">
                    @error('signup_allowed_email')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="form-text">
                    You can restrict the sign-up to a specific email domain.
                </div>
            </div>
            <button class="btn btn-sm btn-primary" type="submit">Save</button>
        </form>
    </div>
</div>

@endsection
