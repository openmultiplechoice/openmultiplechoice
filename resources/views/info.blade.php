@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

@php
    $purifier = new HTMLPurifier(HTMLPurifier_Config::createDefault());
@endphp

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
                <p><small><span class="font-monospace">{{ $entry->created_at->format('d.m.Y') }}</span> {!! $entry->is_pinned ? '<i class="bi bi-pin-angle"></i>' : '' !!}</small></p>
                <p>{!! $purifier->purify(preg_split("/<br>/", $entry->text)[0]) !!}</p>
            </div>
        </div>
    @endforeach
</div>

@endsection
