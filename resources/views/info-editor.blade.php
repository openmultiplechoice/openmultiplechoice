@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Info')

@section('content')

<div class="row">
    <div class="col-md">
        <form action="/info/{{ isset($info) ? $info->id : '' }}" method="post" class="mt-3 mb-3">
            @isset($info)
                @method('PUT')
            @endisset
            @csrf
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input id="title" type="text" name="title" class="form-control" value="{{ $info->title ?? '' }}">
            </div>
            <div class="mb-3">
                <input id="text" type="hidden" name="text" value="{{ $info->text ?? '' }}">
                <trix-editor input="text"></trix-editor>
            </div>
            <div class="mb-2">
                <input type="checkbox" class="form-check-input" id="is_pinned" name="is_pinned" @isset($info) {{ $info->is_pinned ? 'checked' : '' }} @endisset>
                <label for="is_pinned" class="form-label">Pin it <i class="bi bi-pin-angle"></i></label>
            </div>
            <button class="btn btn-sm btn-primary" type="submit">Save</button>
        </form>
    </div>
</div>

@endsection
