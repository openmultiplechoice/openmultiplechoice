@extends('layouts.app')

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col">
        <h1 class="h4">{{ $deck->name }}</h1>
        @if (count($questions) > 0)
            <form action="{{ url('sessions') }}" method="POST" class="float-start me-2">
                @csrf
                <input type="hidden" name="deck_id" value="{{ $deck->id }}" />
                <button type="submit" class="btn btn-sm btn-primary">New session</button>
            </form>
        @endif
        <a href="/decks/{{ $deck->id }}/edit" class="btn btn-sm btn-outline-secondary mb-3">Edit deck</a>
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

        <p>Number of questions in this deck: <span class="font-monospace">{{ count($questions) }}</span></p>

        @if ($deck->description)
            <h2 class="h4">Description</h2>
            <p>{{ $deck->description }}</p>
        @endif

        @if ($deck->user_id == Auth::id() || Auth::user()->is_admin)
            <h2 class="h4">Danger Zone</h2>
            <div class="m-1 p-3 border border-danger rounded">
                <div class="row">
                    <div class="col-md">
                        <p>
                            <strong>Archive this deck</strong><br>
                            Archived decks are not listed but can be unarchived.
                        </p>
                    </div>
                    <div class="col-md">
                        <form action="/decks/{{ $deck->id }}" method="post">
                            @method('PUT')
                            @csrf

                            <input type="hidden" name="is_archived" value="{{ $deck->is_archived ? 0 : 1 }}" />
                            <button class="btn btn-sm {{ $deck->is_archived ? 'btn-outline-danger' : 'btn-danger' }}" type="submit">
                                {{ $deck->is_archived ?  "Unarchive deck" : "Archive this deck" }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        @endif

    </div>
</div>

@endsection
