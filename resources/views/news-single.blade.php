@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md">
        <h1 class="h4">{{ $news->title }}</h1>
        <p class="font-monospace"><small>{{ $news->created_at }}</small></p>
        <p>{!! $news->text !!}</p>
    </div>
</div>

@endsection
