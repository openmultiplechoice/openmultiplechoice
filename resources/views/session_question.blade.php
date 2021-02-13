@extends('layouts.app')

@section('title', 'Session')

@section('content')

@include('layouts.session_buttons')

<div class="row">
    <div class="col mt-4">
        <p class="ps-3 border-start border-{{ isset($answerChoice) ? $answerChoice->answer_id == $question->correct_answer_id ? 'success': 'danger' : 'dark' }}">{{ $question->text }}</p>
        <form method="post">
        @csrf
@foreach ($question->answers as $answer)
            <button type="submit" class="btn btn-light w-100 mb-2 text-start" name="answer_id" value="{{ $answer->id }}">
                <span class="badge pe-3 {{ isset($answerChoice) && $answerChoice->answer_id == $answer->id ? $answerChoice->answer_id == $question->correct_answer_id ? 'text-success' : 'text-danger' : 'text-dark' }}">{{ str_split('ABCDEFGHIJKLMN')[$loop->index] ?? $loop->index }}</span> {{ $answer->text }}
            </button>
@endforeach
        </form>
    </div>
</div>

@endsection
