@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md">
        <h1 class="h4">Info</h1>
        <ul>
@foreach ($info as $n)
            <li><span class="font-monospace">{{ $n->created_at }}<span> <a class="link-dark" href="{{ url('info', $n->id) }}">{{ $n->title }}</a></li>
@endforeach
        </ul>
    </div>
</div>

@endsection
