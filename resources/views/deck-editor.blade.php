@extends('layouts.app')

@section('title', 'Decks')

@section('content')

<div id="DeckForm" data-deck-id="{{ $deck->id }}" data-deck-name="{{ $deck->name }}" data-module-id="{{ $deck->module_id }}"></div>
<script src="{{ asset('js/DeckForm.js') }}"></script>

@endsection
