@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Info')

@section('content')

<div class="row">
    <div class="col-md">
        <h1 class="h4"><a class="text-reset text-decoration-none" href="{{ url('info') }}"><i class="bi bi-arrow-left me-2"></i> Info</a></h1>

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
                {!! Auth::user()->is_admin ? '<a href="/info/'. $info->id .'/edit" class="text-reset text-decoration-none"><i class="bi bi-pencil"></i></a>' : '' !!}
            </small>
        </p>
        <div class="alert alert-light shadow-sm">
            {!! Purify::clean($info->text) !!}
        </div>
    </div>
</div>

@endsection
