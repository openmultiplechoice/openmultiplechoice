@extends('layouts.app')

@section('title', 'Session')

@section('content')

<div id="appconfig" data-magic="{{ config('app.magic') }}" ></div>

<div id="SessionView" data-session-id="{{ $session->id }}" ></div>
@vite(['resources/js/SessionView.js'])

@endsection
