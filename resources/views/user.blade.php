@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Edit/New User')

@section('content')
<form id="submit-user" action="/admin/users/{{ isset($user) ? $user->id : '' }}" method="post" onsubmit="return confirm('Are you sure?');">
    @isset($user)
        @method('PUT')
    @endisset
    @csrf
</form>
<div class="row">
    <div class="col-md">
        @if(isset($user))
            <h4><a class="text-reset text-decoration-none" href="/admin/users"><i class="bi bi-arrow-left me-2"></i> User #{{ $user->id }}</a></h4>
        @else
            <h4><a class="text-reset text-decoration-none" href="/admin/users"><i class="bi bi-arrow-left me-2"></i> New user</a></h4>
        @endif
    </div>
</div>
<div class="row">
    <div class="col-md-6 mb-3">
        <label for="name" class="form-label">Name</label>
        <input id="name" type="text" name="name" class="form-control @error('name') is-invalid @enderror" form="submit-user" value="{{ old('name', $user->name ?? '') }}">
        @error('name')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
        @enderror
    </div>
    <div class="col-md-6 mb-3">
        <label for="public_name" class="form-label">Public name</label>
        <input id="public_name" type="text" name="public_name" class="form-control @error('public_name') is-invalid @enderror" form="submit-user" value="{{ old('public_name', $user->public_name ?? '') }}">
        @error('public_name')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
        @enderror
    </div>
</div>
<div class="row">
    <div class="col-md mb-3">
        <label for="email" class="form-label">Email</label>
        <input id="email" type="email" name="email" class="form-control @error('email') is-invalid @enderror" form="submit-user" value="{{ old('email', $user->email ?? '') }}">
        @error('email')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
        @enderror
    </div>
</div>
<div class="row">
    <div class="col-md mb-3">
        <div class="form-check form-check-inline">
            <input type="hidden" name="is_enabled" form="submit-user" value="0">
            <input class="form-check-input" id="is_enabled" type="checkbox" name="is_enabled" form="submit-user" value="1" {{ old('is_enabled', $user->is_enabled ?? true) ? 'checked' : '' }}>
            <label for="is_enabled" class="form-check-label">Enabled</label>
        </div>
        <div class="form-check form-check-inline">
            <input type="hidden" name="is_admin" form="submit-user" value="0">
            <input class="form-check-input" id="is_admin" type="checkbox" name="is_admin" form="submit-user" value="1" {{ old('is_admin', $user->is_admin ?? false) ? 'checked' : '' }}>
            <label for="is_admin" class="form-check-label">Admin</label>
        </div>
        <div class="form-check form-check-inline">
            <input type="hidden" name="is_moderator" form="submit-user" value="0">
            <input class="form-check-input" id="is_moderator" type="checkbox" name="is_moderator" form="submit-user" value="1" {{ old('is_moderator', $user->is_moderator ?? false) ? 'checked' : '' }}>
            <label for="is_moderator" class="form-check-label">Moderator</label>
        </div>
    </div>
</div>
@isset($user)
    <div class="row">
        <div class="col-md-3 mb-3">
            <label for="created_at" class="form-label">Created</label>
            <input id="created_at" class="form-control" type="text" placeholder="{{ optional($user->created_at)->format('d.m.Y H:i:s') }}" disabled>
        </div>
        <div class="col-md-3 mb-3">
            <label for="updated_at" class="form-label">Updated</label>
            <input id="updated_at" class="form-control" type="text" placeholder="{{ optional($user->updated_at)->format('d.m.Y H:i:s') }}" disabled>
        </div>
        <div class="col-md-3 mb-3">
            <label for="email_verified_at" class="form-label">Email verified</label>
            <input id="email_verified_at" class="form-control" type="text" placeholder="{{ optional($user->email_verified_at)->format('d.m.Y H:i:s') ?? 'n/a' }}" disabled>
        </div>
        <div class="col-md-3 mb-3">
            <label for="last_login" class="form-label">Last login</label>
            <input id="last_login" class="form-control" type="text" placeholder="{{ optional($user->last_login_at)->format('d.m.Y H:i:s') ?? 'n/a' }}" disabled>
        </div>
    </div>
@endisset
<div class="row">
    <div class="col me-1 pb-2">
        <button class="btn btn-primary" form="submit-user" type="submit">Save</button>
    </div>
    @if(isset($user) && config('app.login.form'))
        <div class="col d-flex justify-content-end pb-2">
            <form action="/admin/users/{{ $user->id }}/reset-password" method="post" onsubmit="return confirm('Are you sure?');">
                @csrf
                <button class="btn btn-outline-secondary" type="submit">Reset password</button>
            </form>
        </div>
    @endif
</div>
@endsection
