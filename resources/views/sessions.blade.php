@extends('layouts.app')

@section('title', 'Sessions')

@section('content')

<div class="row">
    <div class="col-md">
        <h4>New session</h4>
        <form method="post">
            @csrf
            <div class="mb-3">
                <label for="deck-id" class="form-label">Choose deck</label>
                <select class="form-control" id="deck-id" name="deck_id">
@foreach ($decks as $deck)
                    <option value="{{ $deck->id }}">{{ $deck->name }}</option>
@endforeach
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Create new session</button>
        </form>
    </div>
    <div class="col-md">
        <h4>Sessions</h4>
        <ul>
@forelse ($sessions as $session)
            <li><a href="/sessions/{{ $session->id }}">{{ $session->name }}</a> {{ $session->created_at }}</li>
@empty
            <p>No sessions yet</p>
@endforelse
        </ul>
    </div>
</div>

@endsection
