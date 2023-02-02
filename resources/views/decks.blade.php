@extends('layouts.app')

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md mb-3">
        <h4>New deck</h4>
        <form method="post">
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description (optional)</label>
                <textarea class="form-control" id="description" name="description" rows="4"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create new deck</button>
        </form>
    </div>
    <div class="col-md">
        <h4>Decks</h4>
        <ul>
@foreach ($decks as $deck)
            <li><a href="{{ url('decks', $deck->id) }}">{{ $deck->name }}</a></li>
@endforeach
        </ul>
    </div>
</div>

@endsection
