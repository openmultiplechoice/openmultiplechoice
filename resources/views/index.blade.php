@extends('layouts.app')

@section('title', 'Home')

@section('content')

<div class="row">
    <div class="col-lg-8">
        <a href="/sessions/create" class="btn btn-outline-secondary mb-3">{{ __('omc.newsession') }}</a>
        <div id="IndexSessionView" data-user-id="{{ Auth::user()->id }}" ></div>
        <script src="{{ asset('js/IndexSessionView.js') }}"></script>
    </div>
    <div class="col-lg-4">
        <h4><a class="text-reset text-decoration-none" href="{{ url('news') }}">News</a></h4>
@forelse ($news as $entry)
        <div class="alert alert-light" role="alert">
            <h6 class="alert-heading"><a class="link-dark" href="{{ url('news', $entry->id) }}">{{ $entry->title }}</a></h6>
            <p class="font-monospace"><small>{{ $entry->created_at }}</small></p>
            <p>{!! $entry->text !!}</p>
        </div>
@empty
        <p>No news yet</p>
@endforelse
    </div>
</div>

@endsection
