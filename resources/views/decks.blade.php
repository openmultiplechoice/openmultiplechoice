@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Decks')

@section('content')

<div class="row">
    <div class="col-md mb-3">
        <h4>Create new deck</h4>
        <form method="post">
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description (optional)</label>
                <textarea class="form-control" id="description" name="description" rows="4"></textarea>
            </div>
            <button type="submit" class="btn btn-sm btn-primary">Create deck</button>
        </form>
    </div>
</div>

@if ($decks->count() > 0)
<div class="row">
    <div class="col-md">
        <h4>Your decks</h4>
    </div>
</div>

<div class="row">
    @forelse ($decks as $deck)
        <div class="col-md-4 mb-1">
            <div class="card">
                <div class="card-header">
                    <span class="badge text-bg-light">
                        @if ($deck->exam_at)
                            {{ $deck->exam_at->format('d/m/Y') }}
                        @else
                            {{ $deck->created_at->format('d/m/Y') }}
                        @endif
                    </span>
                    <span class="badge text-bg-secondary" title="Number of questions">
                        <i class="bi bi-collection"></i> {{ sizeof($deck->questions) }}
                    </span>
                </div>
                <div class="card-body">
                    <h6 class="card-title text-nowrap overflow-hidden" title="{{ $deck->name }}">
                        {{ $deck->name }}
                    </h6>

                    <a class="btn btn-sm btn-primary" href="{{ url('decks', $deck->id) }}" role="button"><i class="bi bi-collection-fill"></i> Open</a>
                </div>
            </div>
        </div>
    @empty
        <div class="col-md">
            <p>No decks yet</p>
        </div>
    @endforelse
</div>
@endif

@endsection
