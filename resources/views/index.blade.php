@extends('layouts.app')

@section('title', 'Home')

@section('content')

<div class="row">
    <div class="col-lg-8">
        <a href="/sessions" class="btn btn-primary mb-2">{{ __('omc.newsession') }}</a>
        <div id="IndexSessionView" data-user-id="{{ Auth::user()->id }}" ></div>
        <script src="{{ asset('js/IndexSessionView.js') }}"></script>
    </div>
    <div class="col-lg-4">
        <h4>News</h4>
@forelse ($news as $entry)
    @if ($entry->level == 'danger')
        <div class="alert alert-danger" role="alert">
    @elseif ($entry->level == 'warning')
        <div class="alert alert-warning" role="alert">
    @elseif ($entry->level == 'light')
        <div class="alert alert-light" role="alert">
    @else
        <div class="alert alert-secondary" role="alert">
    @endif
            <h6 class="alert-heading">{{ $entry->title }}</h6>
            <p>{{ $entry->text }}</p>
        </div>
@empty
        <p>No news yet</p>
@endforelse
    </div>
</div>

@endsection
