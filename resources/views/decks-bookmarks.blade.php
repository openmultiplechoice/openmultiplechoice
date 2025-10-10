@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Bookmarks')

@section('content')

    <div class="row">
        <div class="col-md">
            <h4>Your bookmarked decks</h4>
        </div>
    </div>

    <div class="row mb-3">
        @forelse($bookmarked_decks as $deck)
            @include('deck-col-element')
        @empty
            <div class="col-md">
                <p class="alert alert-light">No bookmarked decks yet</p>
            </div>
        @endforelse
    </div>
    <div class="sticky-bottom bg-white mt-3 pt-3">
        {{ $bookmarked_decks->links() }}
    </div>

@endsection
