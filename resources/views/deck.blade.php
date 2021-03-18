@extends('layouts.app')

@section('title', 'Decks')

@section('content')

<div id="DeckForm" data-deck-id="{{ $deck->id }}" data-deck-name="{{ $deck->name }}"></div>
<script src="{{ asset('js/DeckForm.js') }}"></script>

@endsection
