@extends('layouts.app')

@section('title', 'Deck Question Editor')

@section('content')

<div id="DeckForm" data-deck-id="{{ $deck->id }}" data-deck-name="{{ $deck->name }}" data-module-id="{{ $deck->module_id }}"></div>
@vite(['resources/js/DeckForm.js'])

@endsection
