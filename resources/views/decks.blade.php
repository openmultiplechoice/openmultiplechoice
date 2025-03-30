@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

<div class="row mb-3">
    <div class="col-md">
        <h4>Create new deck</h4>
        <form method="post">
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name') }}">
                @error('name')
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description (optional)</label>
                <input type="hidden" id="description" name="description" value="{{ old('description') }}">
                <trix-editor input="description" class="form-control @error('description') is-invalid @enderror"></trix-editor>
                @error('description')
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            <button type="submit" class="btn btn-sm btn-primary">Create deck</button>
        </form>
    </div>
</div>

<div class="row">
    <div class="col-md">
        <h4>Your decks</h4>
    </div>
</div>

<div class="row mb-3">
    @forelse ($decks as $deck)
        @include('deck-col-element')
    @empty
        <div class="col-md">
            <p>No decks yet</p>
        </div>
    @endforelse
</div>

<div class="row">
    <div class="col-md">
        <div class="alert alert-light">
            You can find your archived decks <a href="/decks/archived" class="alert-link">here</a>.
        </div>
    </div>
</div>

<div class="sticky-bottom bg-white mt-3 pt-3">
    {{ $decks->links() }}
</div>

@endsection
