@extends('layouts.app')

@section('title', 'Session')

@section('content')

<div id="SessionView" data-session-id="{{ $session->id }}" ></div>
<script src="{{ mix('js/SessionView.js') }}"></script>

@endsection
