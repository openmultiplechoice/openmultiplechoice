@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Tokens')

@section('content')

<div class="row">
    <div class="col-md">
        <form method="post">
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name">
            </div>
            <button type="submit" class="btn btn-sm btn-primary">Create token</button>
        </form>

        <p class="mt-3">Existing tokens</p>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last used at</th>
                    <th scope="col">Created at</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($tokens as $token)
                    <tr>
                        <th scope="row">{{ $loop->iteration }}</th>
                        <td>{{ $token->name }}</td>
                        <td><kbd>{{ $token->last_used_at ? $token->last_used_at : "not used yet" }}</kbd></td>
                        <td><kbd>{{ $token->created_at }}</kbd></td>
                    </tr>
                @empty
                    <tr>
                        <th>No tokens yet</th>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

@endsection
