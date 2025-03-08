@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Session')

@section('content')

<div class="row">
    <div class="col-md">
        <h1 class="h4">
            <a href="{{ url('sessions', $session->id) }}" class="text-reset text-decoration-none"><i class="bi bi-arrow-left me-2"></i>Edit session</a>
        </h1>
        <form action="/sessions/{{ $session->id }}" method="post">
            @method('PUT')
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input id="name" type="text" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name', $session->name) }}">
                @error('name')
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            <button class="btn btn-sm btn-primary" type="submit">Save</button>
        </form>
    </div>
</div>

<div class="row">
        <div class="col-md">
            <div class="alert alert-light mt-5" role="alert">
                <p>
                    <strong>Delete session?</strong> Deleting the session will also delete the given answers. This cannot be undone.
                </p>
                <form action="{{ url('sessions', $session->id) }}" method="post" onsubmit="return confirm('Are you sure you want to delete this session?');">
                    @method('DELETE')
                    @csrf
                    <button class="btn btn-sm btn-danger" type="submit"><i class="bi bi-trash"></i> Delete session</button>
                </form>
            </div>
        </div>
    </div>

@endsection
