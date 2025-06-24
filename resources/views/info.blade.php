@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Info')

@section('content')

<div class="row">
    <div class="col-md">
        <h1 class="h4"><a class="text-reset text-decoration-none" href="/"><i class="bi bi-arrow-left me-2"></i> Info</a></h1>
    </div>
</div>

<div class="row">
    @foreach ($info as $entry)
        <div class="col-lg-4">
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
        </div>
    @endforeach
</div>

@endsection
