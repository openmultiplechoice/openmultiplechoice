@extends('layouts.app')

@section('title', 'Deck')

@section('content')

<div class="row mb-3">
    <div class="col">
        <div class="mb-2 d-flex gap-1">
            <h1 class="h4 mb-1 text-truncate" title="{{ $deck->name }}">{{ $deck->name }}</h1>
            @if($deck->submission)
                <span class="badge text-rounded-pill text-bg-warning mb-1 align-self-center text-uppercase">Submitted</span>
            @endif
        </div>
        <div class="d-grid gap-2 d-sm-block">
            @if (count($questions) > 0)
                <form action="{{ url('sessions') }}" method="POST" class="d-inline-grid">
                    @csrf
                    <input type="hidden" name="deck_id" value="{{ $deck->id }}" />
                    <button type="submit" class="btn btn-sm btn-primary"><i class="bi bi-rocket-takeoff"></i> Start session</button>
                </form>
            @endif
            <form method="post" action="/decks/{{ $deck->id }}/bookmark" class="d-inline-grid">
                @csrf
                @php($is_bookmarked = $deck->bookmarked())
                @if($is_bookmarked)
                    @method('delete')
                @endif
                <button class="btn btn-sm btn-outline-primary" type="submit">
                    <i class="@if($is_bookmarked) bi-bookmark-check-fill @else bi-bookmark @endif"> </i> @if($is_bookmarked) Bookmarked @else Bookmark @endif
                </button>
            </form>
            @if (Auth::user()->is_admin || $deck->user_id == Auth::id() || $deck->access == "public-rw" || $deck->access == "public-rw-listed")
                <a href="/decks/{{ $deck->id }}/questions/edit" class="btn btn-sm btn-outline-secondary"><i class="bi bi-collection"></i> Add / Remove questions</a>
                <a href="/decks/{{ $deck->id }}/edit" class="btn btn-sm btn-outline-secondary"><i class="bi bi-three-dots"></i> Settings</a>
            @endif
        </div>
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
    <div class="col-md-12 col-lg-9 col-xl-8 col-xxl-6">
        @if (count($questions) > 0)
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
        @endif

        <div class="alert alert-light mb-3 py-2">
            <span class="badge text-black font-monospace" title="Number of questions"><i class="bi bi-collection"></i> {{ count($questions) }}</span>
            <span class="badge text-black font-monospace" title="Number of sessions"><i class="bi bi-rocket-takeoff"></i> {{ count($deck->sessions) }}</span>
            <span class="badge text-black font-monospace" title="Number of bookmarks"><i class="bi bi-bookmark"></i> {{ $deck->bookmarks_count }}</span>
            <span class="badge text-black font-monospace" title="Access level">{{ $deck->access }}</span>
        </div>

        @if ($deck->description)
            <h2 class="h4">Description</h2>
            <div class="mb-3">
                {!! Purify::clean($deck->description) !!}
            </div>
        @endif

    </div>
</div>

@endsection
