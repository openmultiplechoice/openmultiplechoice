@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Question List')

@section('content')
    <div class="row">
        <div class="col-md">
            <div class="alert alert-warning d-flex align-items-center">
                <i class="bi bi-info-circle me-2"></i>
                The following questions need review or are marked invalid. Contributions are welcome!
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            @forelse ($questions as $question)
                <div class="alert alert-light">
                    @php
                        $deck = $question->decks->last();
                        $numDecks = $question->decks->count();
                    @endphp
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            @if ($deck->module)
                                <li class="breadcrumb-item">{{ Str::limit($deck->module->subject->name, 20, '...') }}</li>
                                <li class="breadcrumb-item">{{ Str::limit($deck->module->name, 20, '...') }}</li>
                            @endif
                            <li class="breadcrumb-item active" aria-current="page">
                                <a href="{{ url('decks', $deck->id) }}">{{ Str::limit($deck->name, 25, '...') }}</a>
                                @if ($numDecks > 1)
                                    (and {{ $numDecks - 1 }} more @if(($numDecks - 1) > 1) {{ 'decks' }} @else {{ 'deck' }}@endif)
                                @endif
                            </li>
                        </ol>
                    </nav>
                    <hr>
                    <p>{!! Purify::clean($question->text) !!}</p>
                    <a class="btn btn-sm btn-primary mt-2" href="/questions/{{ $question->id }}"><span class="fw-bold">&rightarrow;</span> Open</a>
                </div>
            @empty
                <div class="alert alert-light">
                    <p>No questions to review currently.</p>
                </div>
            @endforelse
        </div>
    </div>
    <div class="sticky-bottom bg-white mt-3 pt-3">
        {{ $questions->links() }}
    </div>
@endsection
