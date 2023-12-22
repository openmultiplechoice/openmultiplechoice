@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md">
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('info') }}">Info</a></li>
            <li class="breadcrumb-item active" aria-current="page"></li>
        </ol>
        </nav>

        <h1 class="display-6">{{ $info->title }}</h1>
        <p class="font-monospace"><small>{{ $info->created_at->format('d.m.Y') }}</small></p>
        <p>{!! $info->text !!}</p>
    </div>
</div>

@endsection
