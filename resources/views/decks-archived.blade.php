@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md">
        <h4>Your archived decks</h4>
    </div>
</div>

<div class="row">
    @forelse ($decks as $deck)
        @include('deck-col-element')
    @empty
        <div class="col-md">
            <p>No archived decks</p>
        </div>
    @endforelse

    <p>{{ $decks->links() }}</p>
</div>

@endsection
