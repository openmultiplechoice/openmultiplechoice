@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Subjects')

@section('content')

@php($editallowed = $deck->access != 'public-rw-listed' || Auth::user()->is_admin || Auth::user()->is_moderator)
<div class="row">
    <div class="col-md">
        <div class="mb-2 d-flex gap-1">
            <h1 class="h4 mb-1">
                <a href="{{ url('decks', $deck->id) }}" class="text-reset text-decoration-none">{{ $deck->name }}</a>
            </h1>
            @if($deck->submission)
                <span class="badge text-rounded-pill text-bg-warning mb-1 align-self-center text-uppercase">Submitted</span>
            @endif
        </div>
        <form action="/decks/{{ isset($deck) ? $deck->id : '' }}" method="post" class="mt-3 mb-3">
            @isset($deck)
                @method('PUT')
            @endisset
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input id="name" type="text" name="name" class="form-control @error('name') is-invalid @enderror" {{ !$editallowed ? 'disabled' : '' }} value="{{ old('name', $deck->name) }}">
                @error('name')
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                <label for="module_id" class="form-label">Module (optional)</label>
                <select id="module_id" name="module_id" class="form-select" {{ !$editallowed ? 'disabled' : '' }}>
                    <option value="" selected>Select a module ...</option>
                    @foreach ($modules as $module)
                        <option value="{{ $module->id }}" {{ ($module->id == $deck->module_id) ? 'selected' : '' }}>{{ $module->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                <label for="exam_at" class="form-label">Exam date (optional)</label>
                <input id="exam_at" type="date" name="exam_at" class="form-control" {{ !$editallowed ? 'disabled' : '' }} value="{{ optional($deck->exam_at)->format('Y-m-d') ?? '' }}">
            </div>
            <div class="mb-3">
                <label for="access" class="form-label">Access</label>
                @if ($deck->access == 'public-rw-listed')
                    <select id="access" name="access" class="form-select" {{ !$editallowed ? 'disabled' : '' }}>
                        @foreach (['private', 'public-ro', 'public-rw', 'public-rw-listed'] as $access)
                            <option value="{{ $access }}" {{ ($deck->access == $access) ? 'selected' : '' }}>{{ $access }}</option>
                        @endforeach
                    </select>
                @else
                    <select id="access" name="access" class="form-select">
                        @foreach (['private', 'public-ro', 'public-rw'] as $access)
                            <option value="{{ $access }}" {{ ($deck->access == $access) ? 'selected' : '' }}>{{ $access }}</option>
                        @endforeach
                    </select>
                @endif
                <div class="form-text">
                    Access can be set to
                    <ul>
                        <li><i>private</i> (only you can see this deck),</li>
                        <li><i>public-ro</i> (anyone can see this deck, but only you can edit it) or</li>
                        <li><i>public-rw</i> (anyone can see and edit this deck).</li>
                    </ul>
                </div>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description (optional)</label>
                @if($editallowed)
                    <input type="hidden" id="description" name="description" value="{{ old('description', $deck->description) }}">
                    <trix-editor input="description" class="form-control @error('description') is-invalid @enderror"></trix-editor>
                @else
                    <div class="mb-3 form-control bg-body-secondary">
                        {!! Purify::clean($deck->description) !!}
                    </div>
                @endif
                @error('description')
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            <button class="btn btn-sm btn-primary" type="submit" {{ !$editallowed ? 'disabled' : '' }}>Save</button>
            @if(!$editallowed)
                <div class="form-text">
                    You cannot edit the metadata of this deck because it is <i>public-rw-listed</i>.<br>
                    You can still edit the questions in this deck or add new questions.
                </div>
            @endif
        </form>
    </div>
</div>

@if ($deck->access != 'public-rw-listed' && ($deck->user_id == Auth::id() || Auth::user()->is_admin))
    <h2 class="h4">Settings</h2>
    <div class="row mt-1 mb-3">
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
    <div class="row mb-3">
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
                <button class="btn btn-sm {{ $deck->is_archived ? 'btn-outline-primary' : 'btn-primary' }}" type="submit">
                    {{ $deck->is_archived ?  "Unarchive deck" : "Archive this deck" }}
                </button>
            </form>
        </div>
    </div>
@endif

@endsection
