@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Info')

@section('content')

<div class="row">
    <div class="col-md">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h1 class="h4"><a class="text-reset text-decoration-none" href="{{ url('info') }}"><i class="bi bi-arrow-left me-2"></i> Info</a></h1>
            @if (Auth::user()->is_admin)
                <a href="{{ url('/info/'. $info->id .'/edit') }}" class="btn btn-outline-secondary btn-sm">Edit</a>
            @endif
        </div>

        <h2 class="h4">{{ $info->title }}</h2>
        <p>
            <small>
                <span class="font-monospace">
                    {{ $info->created_at->format('d.m.Y') }}
                    @if ($info->created_at != $info->updated_at)
                        (updated {{ $info->updated_at->format('d.m.Y') }})
                    @endif
                </span>
                {!! $info->is_pinned ? '<i class="bi bi-pin-angle"></i>' : '' !!}
                {!! $info->is_alert ? '<i class="bi bi-exclamation-triangle text-warning"></i>' : '' !!}
            </small>
        </p>
        <div class="alert alert-light shadow-sm">
            {!! Purify::clean($info->text) !!}
        </div>
    </div>
</div>

@endsection
