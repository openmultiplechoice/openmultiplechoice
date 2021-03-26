@extends('layouts.app')

@section('title', 'Session')

@section('content')

<div id="SessionView" data-session-id="{{ $session->id }}" ></div>
<script src="{{ asset('js/SessionView.js') }}"></script>

@endsection
