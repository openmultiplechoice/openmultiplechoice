@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Archived Decks')

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

    <div class="sticky-bottom bg-white mt-3 pt-3">
        {{ $decks->links() }}
    </div>
</div>

@endsection
