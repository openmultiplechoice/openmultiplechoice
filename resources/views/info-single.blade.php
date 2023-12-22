@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md">
        <h1 class="h4">{{ $info->title }}</h1>
        <p class="font-monospace"><small>{{ $info->created_at->format('d.m.Y') }}</small></p>
        <p>{!! $info->text !!}</p>
    </div>
</div>

@endsection
