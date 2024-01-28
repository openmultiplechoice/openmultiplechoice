@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Question')

@section('content')

@if (count($decks) > 0)
<div class="row mb-3">
    <div class="col">
        <div class="accordion" id="accordionDecks">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDeckList">
                        Decks with this question
                    </button>
                </h2>
                <div id="collapseDeckList" class="accordion-collapse collapse" data-bs-parent="#accordionDecks">
                    <div class="accordion-body">
                        <ul>
                            @foreach ($decks as $deck)
                                <li><a href="/decks/{{ $deck->id }}/questions/{{ $question->id }}">{{ $deck->name }}</a></li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endif

<div class="row">
    <div class="col">
        <div id="QuestionView" data-question="{{ $question }}" ></div>
        @vite(['resources/js/QuestionView.js'])

        <div id="MessagesView" data-question-id="{{ $question->id }}" ></div>
        @vite(['resources/js/Messages.js'])
    </div>
</div>

@endsection
