@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'User Management')

@section('content')
    <div class="row">
        <div class="col-md">
            <h4>User management</h4>
        </div>
    </div>
    <div class="row justify-content-end">
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
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->is_admin ? 'y' : 'n' }}</td>
                    <td>{{ $user->is_moderator ? 'y' : 'n' }}</td>
                    <td>{{ $user->created_at->format('d.m.Y H:i:s') }}</td>
                    <td>{{ optional($user->last_login_at)->format('d.m.Y H:i:s') ?? 'n/a' }}</td>
                    <td>{{ $user->is_enabled ? 'y' : 'n' }}</td>
                    <td>
                        <form action="/admin/users/{{ $user->id }}" method="post">
                            @method('put')
                            @csrf
                            <input type="hidden" name="is_enabled" value="{{ $user->is_enabled ? 0 : 1 }}" />
                            <button class="btn btn-sm {{ $user->is_enabled ? 'btn-outline-primary' : 'btn-primary' }}" type="submit">
                                {{ $user->is_enabled ? "Disable" : "Enable" }}
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    {{ $users->links() }}
@endsection
