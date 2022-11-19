@extends('layouts.app')

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col">
        <h1 class="h4">{{ $deck->name }}</h1>
        <a href="/decks/{{ $deck->id }}/edit" class="btn btn-outline-secondary mb-3">Edit deck</a>
    </div>
</div>

@endsection
