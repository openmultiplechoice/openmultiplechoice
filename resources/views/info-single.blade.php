@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

@php
    $purifier = new HTMLPurifier(HTMLPurifier_Config::createDefault());
@endphp

<div class="row">
    <div class="col-md">
        <h1 class="h4"><a class="text-reset text-decoration-none" href="{{ url('info') }}">Info</a></h1>

        <h2 class="h5">{{ $info->title }}</h2>
        <p class="font-monospace"><small>{{ $info->created_at->format('d.m.Y') }}</small></p>
        <p>{!! $purifier->purify($info->text) !!}</p>
    </div>
</div>

@endsection
