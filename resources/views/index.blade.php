@extends('layouts.app')

@section('title', 'Home')

@section('content')

<div class="row">
    <div class="{{ $info->isEmpty() ? 'col-lg-12' : 'col-lg-8' }}">
        <div class="row">
            <div class="col-md-8 col-lg-6 col-xxl-4 d-flex gap-1">
                <a href="/sessions/create" class="btn btn-primary mb-3 flex-fill"><i class="bi bi-rocket-takeoff"></i> {{ __('omc.newsession') }}</a>
                <a href="{{ url('decks') }}" class="btn btn-primary mb-3 flex-fill"><i class="bi bi-collection-fill"></i> New deck</a>
            </div>
        </div>

        <div id="IndexSessionView" data-user-id="{{ Auth::user()->id }}" ></div>
        @vite(['resources/js/IndexSessionView.js'])
    </div>
    @if ($info->isNotEmpty())
        <div class="col-lg-4">
            <h4><a class="text-reset text-decoration-none" href="{{ url('info') }}">Info</a></h4>
            @foreach ($info as $entry)
                <div class="alert alert-light card-highlight" role="alert">
                    <h6 class="alert-heading"><a class="link-dark alert-link stretched-link text-decoration-none" href="{{ url('info', $entry->id) }}">{{ $entry->title }}</a></h6>
                    <p>
                        <small>
                            <span class="font-monospace">
                                {{ $entry->created_at->format('d.m.Y') }}
                                @if ($entry->created_at != $entry->updated_at)
                                    (updated {{ $entry->updated_at->format('d.m.Y') }})
                                @endif
                            </span>
                            {!! $entry->is_pinned ? '<i class="bi bi-pin-angle"></i>' : '' !!}
                        </small>
                    </p>
                    <p>{!! Purify::clean(Str::limit($entry->text, 200, ' (...)')) !!}</p>
                </div>
            @endforeach
        </div>
    @endif
</div>

@if (sizeof($submissions) > 0)
    <div class="row">
        <div class="col-lg">
            <div class="alert alert-warning d-flex align-items-center">
                <i class="bi bi-info-circle flex-shrink-0 me-2"></i>
                <div>
                    <a href="{{ url('submissions') }}" class="alert-link stretched-link">
                        {{ sizeof($submissions) }} pending submission{{ sizeof($submissions) > 1 ? 's' : '' }}</a> to review.
                </div>
            </div>
        </div>
    </div>
@endif

<div id="IndexStatsView"></div>
@vite(['resources/js/IndexStatsView.js'])

@endsection
