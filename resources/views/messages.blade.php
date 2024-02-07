@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Tokens')

@section('content')

@php
    $purifier = new HTMLPurifier(HTMLPurifier_Config::createDefault());
@endphp

<div class="row">
    <div class="col-md">
        @foreach($messages as $message)
            <div class="rounded-2 bg-light p-2 mb-0">
                {!! $purifier->purify($message->text) !!}
            </div>
            <p class="text-muted text-end">
                <small>
                    <a href="{{ url('questions', $message->question->id) }}" target="_blank" class="btn btn-sm btn-link link-dark">Show</a>
                    {{ Carbon\Carbon::parse($message->created_at)->setTimezone(config('app.timezone_view'))->format('d/m/Y H:i') }}
                </small>
            </p>
        @endforeach

        <p>{{ $messages->links() }}</p>
    </div>
</div>

@endsection
