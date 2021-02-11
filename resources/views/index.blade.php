@extends('layouts.app')

@section('title', 'Home')

@section('content')

<div class="row">
    <div class="col-lg">
        <a href="/sessions" class="btn btn-primary">{{ __('omc.newsession') }}</a>
        <!-- <a href="#" type="button" class="btn btn-secondary">{{ __('omc.continuesession') }}</a> -->
    </div>
    <div class="col-lg">
        <h4>Sessions</h4>
        <ul>
@forelse ($sessions as $session)
            <li><a href="{{ url('sessions', $session->id) }}">{{ $session->name }}</a> {{ $session->created_at }}</li>
@empty
            <p>No sessions yet</p>
@endforelse
        </ul>
    </div>
    <div class="col-lg">
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
