@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md">
        <h1 class="h4"><a class="text-reset text-decoration-none" href="{{ url('info') }}">Info</a></h1>

        <h2 class="h5">{{ $info->title }}</h2>
        <p>
            <small>
                <span class="font-monospace">{{ $info->created_at->format('d.m.Y') }}</span>
                {!! $info->is_pinned ? '<i class="bi bi-pin-angle"></i>' : '' !!}
                {!! Auth::user()->is_admin ? '<a href="/info/'. $info->id .'/edit" class="text-reset text-decoration-none"><i class="bi bi-pencil"></i></a>' : '' !!}
            </small>
        </p>
        <p>{!! Purify::clean($info->text) !!}</p>
    </div>
</div>

@endsection
