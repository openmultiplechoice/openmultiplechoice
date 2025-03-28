@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'User Management')

@section('content')
    <div class="row">
        <div class="col-md">
            <h4>User management</h4>
        </div>
    </div>
    <div class="row justify-content-around">
        <div class="col-md mb-3">
            <a class="btn btn-primary" href="/admin/users/create" role="button"><i class="bi-plus-circle-fill"></i> New user</a>
        </div>
        <div class="col-md-4">
            <form action="/admin/users" method="get">
                <div class="input-group mb-3">
                    <input type="text" name="search" class="form-control" placeholder="Search users" value="{{ request('search') }}">
                    <button class="btn btn-primary" type="submit">Search</button>
                </div>
            </form>
        </div>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Public name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Moderator</th>
                <th>Created at</th>
                <th>Last login</th>
                <th>Enabled</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
                <tr>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->public_name }}</td>
                    <td>{{ $user->email }} <i style="color:{{ $user->hasVerifiedEmail() ? 'green' : 'darkred' }}" class="bi {{ $user->hasVerifiedEmail() ? 'bi-check-circle-fill' : 'bi-x-circle-fill' }}"></i></td>
                    <td>{{ $user->is_admin ? 'y' : 'n' }}</td>
                    <td>{{ $user->is_moderator ? 'y' : 'n' }}</td>
                    <td>{{ $user->created_at->format('d.m.Y H:i:s') }}</td>
                    <td>{{ optional($user->last_login_at)->format('d.m.Y H:i:s') ?? 'n/a' }}</td>
                    <td>{{ $user->is_enabled ? 'y' : 'n' }}</td>
                    <td class="text-end"><a class="btn btn-primary btn-sm" href="/admin/users/{{ $user->id }}/edit" role="button"><i class="bi-pencil-square"></i></a></td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="sticky-bottom bg-white mt-3 pt-3">
        {{ $users->links() }}
    </div>
@endsection
