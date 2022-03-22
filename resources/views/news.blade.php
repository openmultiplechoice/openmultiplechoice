@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md">
        <h1 class="h4">News</h1>
        <ul>
@foreach ($news as $n)
            <li><span class="font-monospace">{{ $n->created_at }}<span> <a class="link-dark" href="{{ url('news', $n->id) }}">{{ $n->title }}</a></li>
@endforeach
        </ul>
    </div>
</div>

@endsection
