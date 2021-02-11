@extends('layouts.app')

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md">
        <h4>New deck</h4>
        <form method="post">
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="official" name="official" value="true">
                <label class="form-check-label" for="official">Official</label>
            </div>
            <button type="submit" class="btn btn-primary">Create new deck</button>
        </form>
    </div>
    <div class="col-md">
        <h4>Decks</h4>
        <ul>
@foreach ($decks as $deck)
            <li>{{ $deck->name }}</li>
@endforeach
        </ul>
    </div>
</div>

@endsection
