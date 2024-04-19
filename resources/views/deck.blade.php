@extends('layouts.app')

@section('title', 'Decks')

@section('content')

@php
    $purifier = new HTMLPurifier(HTMLPurifier_Config::createDefault());
@endphp

<div class="row mb-3">
    <div class="col">
        <h1 class="h4">{{ $deck->name }}
            @if($deck->submission)
                <span class="badge text-rounded-pill text-bg-secondary">Submitted</span>
            @endif
        </h1>
        @if (count($questions) > 0)
            <form action="{{ url('sessions') }}" method="POST" class="float-start me-2">
                @csrf
                <input type="hidden" name="deck_id" value="{{ $deck->id }}" />
                <button type="submit" class="btn btn-sm btn-primary"><i class="bi bi-rocket-takeoff"></i> New session</button>
            </form>
        @endif
    </div>
</div>

<div class="row">
    <div class="col-lg-3 d-none d-lg-block">
        <div class="list-group text-small">
            <a href="{{ url('decks', $deck->id) }}"
                class="list-group-item list-group-item-action list-group-item-dark"
                style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"><small>Overview</small></a>
            @foreach ($questions as $q)
                <a href="{{ url('decks/'. $deck->id .'/questions/'. $q->id) }}"
                    class="list-group-item list-group-item-action list-group-item-light"
                    style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"><small>@if ($q->text) {{ htmlspecialchars(strip_tags($q->text)) }} @else Question Nr. {{ $loop->index + 1 }} @endif</small></a>
            @endforeach
        </div>
    </div>
    <div class="col-lg-9 col-md-12">
        <div class="row mb-3 pt-1 pb-1 bg-white">
            @if ($urlPrev)
                <div class="col-6">
                    <a href="{{ url($urlPrev) }}" class="btn btn-sm btn-light w-100"><span class="fw-bold">&leftarrow;</span> Previous</a>
                </div>
            @else
                <div class="col-6">
                    <a href="{{ url('decks/'. $deck->id) }}" class="btn btn-sm btn-light w-100">Overview</a>
                </div>
            @endif
            @if ($urlNext)
                <div class="col-6">
                    <a href="{{ url($urlNext) }}" class="btn btn-sm btn-light w-100">Next <span class="fw-bold">&rightarrow;</span></a>
                </div>
            @else
                <div class="col-6">
                    <a href="{{ url('decks/'. $deck->id) }}" class="btn btn-sm btn-light w-100">Overview</a>
                </div>
            @endif
        </div>

        <p>Number of questions in this deck: <span class="badge text-bg-secondary"><i class="bi bi-collection"></i> {{ count($questions) }}</span></p>

        @if ($deck->description)
            <h2 class="h4">Description</h2>
            <div class="mb-3">
                {!! $purifier->purify($deck->description) !!}
            </div>
        @endif

        @if (Auth::user()->is_admin || $deck->user_id == Auth::id() || $deck->access == "public-rw" || $deck->access == "public-rw-listed")
            <div class="row mb-3">
                <div class="col-md mb-3">
                    <a href="/decks/{{ $deck->id }}/edit" class="btn btn-sm btn-outline-secondary w-100"><i class="bi bi-pencil"></i> Edit deck</a>
                </div>
                <div class="col-md">
                    <a href="/decks/{{ $deck->id }}/questions/edit" class="btn btn-sm btn-outline-secondary w-100"><i class="bi bi-pencil"></i> Add / remove questions</a>
                </div>
            </div>
        @endif

    </div>
</div>

@endsection
