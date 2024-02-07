@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'My settings')

@section('content')

<div class="row">
    <div class="col">
        <p>Here you can manage your personal settings.</p>

        <div id="UserSettingsView"></div>
        @vite(['resources/js/UserSettingsView.js'])

        <h4 class="mt-3">User</h4>
        <h6>Profile name</h6>
        @error('public_name')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror
        <form action="/me" method="post">
            @method('PUT')
            @csrf

            <div class="mb-3">
                <input type="text" class="form-control" name="public_name" value="{{ $user->public_name }}">
                <div id="emailHelp" class="form-text">You can set an optional <i>public name</i> to be shown instead of your username.</div>
            </div>

            <button class="btn btn-sm btn-primary" type="submit">Save</button>
        </form>
    </div>
</div>

@endsection
