@extends('layouts.app')

@section('title', 'Home')

@section('content')

<div class="row">
    <div class="col-lg-8">
        <a href="/sessions/create" class="btn btn-primary mb-3"><i class="bi bi-rocket-takeoff"></i> {{ __('omc.newsession') }}</a>
        <a href="{{ url('decks') }}" class="btn btn-primary mb-3"><i class="bi bi-collection-fill"></i> New deck</a>
        <div id="IndexSessionView" data-user-id="{{ Auth::user()->id }}" ></div>
        @vite(['resources/js/IndexSessionView.js'])
    </div>
    <div class="col-lg-4">
        <h4><a class="text-reset text-decoration-none" href="{{ url('info') }}">Info</a></h4>
@forelse ($info as $entry)
        <div class="alert alert-light" role="alert">
            <h6 class="alert-heading"><a class="link-dark" href="{{ url('info', $entry->id) }}">{{ $entry->title }}</a></h6>
            <p class="font-monospace"><small>{{ $entry->created_at->format('d.m.Y') }}</small></p>
            <p>{!! $entry->text !!}</p>
        </div>
@empty
        <p>No info yet</p>
@endforelse
    </div>
</div>

@endsection
