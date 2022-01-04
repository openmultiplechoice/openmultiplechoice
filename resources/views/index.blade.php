@extends('layouts.app')

@section('title', 'Home')

@section('content')

<div class="row">
    <div class="col-lg-8">
        <a href="/sessions" class="btn btn-outline-secondary mb-3">{{ __('omc.newsession') }}</a>
        <div id="IndexSessionView" data-user-id="{{ Auth::user()->id }}" ></div>
        <script src="{{ asset('js/IndexSessionView.js') }}"></script>
    </div>
    <div class="col-lg-4">
        <h4>News</h4>
@forelse ($news as $entry)
        <div class="alert alert-secondary" role="alert">
            <h6 class="alert-heading">{{ $entry->title }}</h6>
            <p>{{ $entry->text }}</p>
        </div>
@empty
        <p>No news yet</p>
@endforelse
    </div>
</div>

@endsection
