@extends('layouts.app')

@section('title', 'Decks')

@section('content')


<div class="row">
    <div class="col">
        <h1 class="h4">{{ $deck->name }}</h1>
        <form action="{{ url('sessions') }}" method="POST" class="float-start me-2">
            @csrf
            <input type="hidden" name="deck_id" value="{{ $deck->id }}" />
            <button type="submit" class="btn btn-sm btn-primary"><i class="bi bi-rocket-takeoff"></i> New session</button>
        </form>
        <a href="/decks/{{ $deck->id }}/edit" class="btn btn-sm btn-outline-secondary mb-3"><i class="bi bi-pencil"></i> Edit deck</a>
    </div>
</div>

<div class="row">
    <div class="col-lg-3 d-none d-lg-block">
        <div class="list-group text-small">
            <a href="{{ url('decks', $deck->id) }}"
                class="list-group-item list-group-item-action"
                style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"><small>Overview</small></a>
            @foreach ($questions as $q)
                <a href="{{ url('decks/'. $deck->id .'/questions/'. $q->id) }}"
                    class="list-group-item list-group-item-action @if ($q->id == $question->id) list-group-item-dark @else list-group-item-light @endif"
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

        <div id="QuestionView" data-question="{{ $question }}" ></div>
        @vite(['resources/js/QuestionView.js'])

        <div id="MessagesView" data-question-id="{{ $question->id }}" ></div>
        @vite(['resources/js/Messages.js'])
    </div>
</div>

@endsection
