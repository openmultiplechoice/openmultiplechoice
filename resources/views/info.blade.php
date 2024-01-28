@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md">
        <h1 class="h4">Info</h1>
    </div>
</div>

<div class="row">
    @foreach ($info as $entry)
        <div class="col-md-4">
            <div class="alert alert-light" role="alert">
                <h6 class="alert-heading"><a class="link-dark" href="{{ url('info', $entry->id) }}">{{ $entry->title }}</a></h6>
                <p class="font-monospace"><small>{{ $entry->created_at->format('d.m.Y') }}</small></p>
                <p>{!! $entry->text !!}</p>
            </div>
        </div>
    @endforeach
</div>

@endsection