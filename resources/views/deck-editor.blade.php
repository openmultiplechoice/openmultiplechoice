@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Subjects')

@section('content')

<div class="row">
    <div class="col-md">
        <h1 class="h4"><a href="{{ url('decks', $deck->id) }}" class="text-reset text-decoration-none">{{ $deck->name }}</a></h1>
        <form action="/decks/{{ isset($deck) ? $deck->id : '' }}" method="post" class="mt-3 mb-3">
            @isset($deck)
                @method('PUT')
            @endisset
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input id="name" type="text" name="name" class="form-control" value="{{ $deck->name ?? '' }}">
            </div>
            <div class="mb-3">
                <label for="module_id" class="form-label">Module (optional)</label>
                <select id="module_id" name="module_id" class="form-select">
                    <option value="" selected>Select a module ...</option>
                    @foreach ($modules as $module)
                        <option value="{{ $module->id }}" {{ ($module->id == $deck->module_id) ? 'selected' : '' }}>{{ $module->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                <label for="exam_at" class="form-label">Exam date (optional)</label>
                <input id="exam_at" type="date" name="exam_at" class="form-control" value="{{ optional($deck->exam_at)->format('Y-m-d') ?? '' }}">
            </div>
            <div class="mb-3">
                <label for="access" class="form-label">Access</label>
                @if ($deck->access == 'public-rw-listed')
                    <input type="hidden" id="access" name="access" value="public-rw-listed">
                    <select id="access" name="access" class="form-select" disabled>
                        <option value="public-rw-listed" selected>public-rw-listed</option>
                    </select>
                @else
                    <select id="access" name="access" class="form-select">
                        @foreach (['private', 'public-ro', 'public-rw'] as $access)
                            <option value="{{ $access }}" {{ ($deck->access == $access) ? 'selected' : '' }}>{{ $access }}</option>
                        @endforeach
                    </select>
                @endif
                <div class="form-text">
                    Access can be <i>private</i> (only you can see this deck),
                    <i>public-ro</i> (anyone can see this deck, but only you can edit it) or
                    <i>public-rw</i> (anyone can see and edit this deck). If a deck is <i>public-rw-listed</i>,
                    access cannot be changed.
                </div>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description (optional)</label>
                <input type="hidden" id="description" name="description" value="{{ $deck->description ?? '' }}">
                <trix-editor input="description"></trix-editor>
            </div>
            <button class="btn btn-sm btn-primary" type="submit">Save</button>
        </form>
    </div>
</div>

@if ($deck->access != 'public-rw-listed' && ($deck->user_id == Auth::id() || Auth::user()->is_admin))
    <h2 class="h4">Danger Zone</h2>
    <div class="m-1 p-3 border border-primary-subtle rounded">
        <div class="row">
            <div class="col-md">
                <p>
                    <strong>Submit this deck for listing</strong><br>
                    Submit this deck for listing in the public deck directory for other users to use.
                </p>
            </div>
            <div class="col-md">
                <form action="/submissions{{ $deck->submission ? '/'.$deck->submission->id : '' }}" method="post">
                    @method($deck->submission ? 'delete' : 'post')
                    @csrf
                    <input type="hidden" name="deck_id" value="{{ $deck->id }}" />
                    <button class="btn btn-sm {{ $deck->submission ? 'btn-outline-primary' : 'btn-primary' }}" type="submit">
                        {{ $deck->submission ? "Retract submission" : "Submit this deck" }}
                    </button>
                </form>
            </div>
        </div>
    </div>
    <div class="m-1 p-3 border border-danger rounded">
        <div class="row">
            <div class="col-md">
                <p>
                    <strong>Archive this deck</strong><br>
                    Archived decks are not listed but can be unarchived.
                </p>
            </div>
            <div class="col-md">
                <form action="/decks/{{ $deck->id }}" method="post">
                    @method('PUT')
                    @csrf

                    <input type="hidden" name="is_archived" value="{{ $deck->is_archived ? 0 : 1 }}" />
                    <button class="btn btn-sm {{ $deck->is_archived ? 'btn-outline-danger' : 'btn-danger' }}" type="submit">
                        {{ $deck->is_archived ?  "Unarchive deck" : "Archive this deck" }}
                    </button>
                </form>
            </div>
        </div>
    </div>
@endif

@endsection
