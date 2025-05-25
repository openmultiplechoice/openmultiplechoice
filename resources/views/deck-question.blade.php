@extends('layouts.app')

@section('title', 'Deck')

@section('content')


<div class="row mb-3">
    <div class="col">
        <div class="mb-2 d-flex gap-1">
            <h1 class="h4 mb-1 text-truncate" title="{{ $deck->name }}">
                <a href="{{ url('decks', $deck->id) }}" class="text-reset text-decoration-none">{{ $deck->name }}</a>
            </h1>
            @if($deck->submission)
                <span class="badge text-rounded-pill text-bg-warning mb-1 align-self-center text-uppercase">Submitted</span>
            @endif
        </div>
        <div class="d-grid gap-2 d-sm-block">
            <form action="{{ url('sessions') }}" method="POST" class="d-inline-grid">
                @csrf
                <input type="hidden" name="deck_id" value="{{ $deck->id }}" />
                <button type="submit" class="btn btn-sm btn-primary"><i class="bi bi-rocket-takeoff"></i> Start session</button>
            </form>
        </div>
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
    <div class="col-lg-9 col-xl-8 col-xxl-6 col-md-12">
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
