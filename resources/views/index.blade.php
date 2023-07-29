@extends('layouts.app')

@section('title', 'Home')

@section('content')

<div class="row">
    <div class="col-lg-8">
        <a href="/sessions/create" class="btn btn-primary mb-3"><i class="bi bi-ui-checks-grid"></i> {{ __('omc.newsession') }}</a>
        <a href="{{ url('decks') }}" class="btn btn-primary mb-3"><i class="bi bi-collection-fill"></i> New deck</a>
        <div id="IndexSessionView" data-user-id="{{ Auth::user()->id }}" ></div>
        <script src="{{ mix('js/IndexSessionView.js') }}"></script>
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
