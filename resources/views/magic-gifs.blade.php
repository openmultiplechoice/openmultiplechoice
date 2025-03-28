@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Magic GIFs')

@section('content')

<div class="row">
    <div class="col-md">
        <form class="mb-4" method="post" enctype="multipart/form-data">
            @csrf

            @error('gif')
                <div class="alert alert-danger" role="alert">{{ $message }}</div>
            @enderror
            <div class="mb-3">
                <label for="gif" class="form-label">GIF</label>
                <input class="form-control" type="file" id="gif" name="gif">
            </div>

            @error('name')
                <div class="alert alert-danger" role="alert">{{ $message }}</div>
            @enderror
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name">
            </div>
            <button type="submit" class="btn btn-sm btn-primary">Add GIF</button>
        </form>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Preview</th>
                    <th scope="col">Open</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($gifs as $gif)
                    <tr>
                        <th scope="row">{{ $gif->id }}</th>
                        <td>{{ $gif->name }}</td>
                        <td>{{ $gif->created_at }}</td>
                        <td><image src="{{ url('magic-gifs', $gif->id) }}" height="100px" /></td>
                        <td><a href="{{ url('magic-gifs', $gif->id) }}" target="_blank">Open</a></td>
                    </tr>
                @empty
                    <tr>
                        <th>No GIFs yet</th>
                    </tr>
                @endforelse
            </tbody>
        </table>
        <div class="sticky-bottom bg-white mt-3 pt-3">
            {{ $gifs->links() }}
        </div>
    </div>
</div>

@endsection
