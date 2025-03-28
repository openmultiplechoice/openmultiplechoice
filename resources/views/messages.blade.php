@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Comments')

@section('content')

<div class="row">
    <div class="col-md">
        <h4>Your comments</h4>
        @forelse($messages as $message)
            <div class="rounded-2 bg-light p-2 mb-0 text-break">
                {!! Purify::clean($message->text) !!}
            </div>
            <p class="text-muted text-end">
                <small>
                    <a href="{{ url('questions', $message->question->id) }}" target="_blank" class="btn btn-sm btn-link link-dark">Show</a>
                    {{ Carbon\Carbon::parse($message->created_at)->setTimezone(config('app.timezone_view'))->format('d/m/Y H:i') }}
                </small>
            </p>
        @empty
            <p>No comments yet</p>
        @endforelse

        <div class="sticky-bottom bg-white mt-3 pt-3">
            {{ $messages->links() }}
        </div>
    </div>
</div>

@endsection
