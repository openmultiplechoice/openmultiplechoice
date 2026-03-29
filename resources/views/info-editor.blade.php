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
                <input type="hidden" name="is_pinned" value="0">
                <input type="checkbox" class="form-check-input @error('is_pinned') is-invalid @enderror" id="is_pinned" name="is_pinned" value="1" {{ old('is_pinned', isset($info) && $info->is_pinned ? 1 : 0) ? 'checked' : '' }}>
                <label for="is_pinned" class="form-label">Show as pinned message on Home page</label>
                @error('is_pinned')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-2">
                <input type="hidden" name="is_alert" value="0">
                <input type="checkbox" class="form-check-input @error('is_alert') is-invalid @enderror" id="is_alert" name="is_alert" value="1" {{ old('is_alert', isset($info) && $info->is_alert ? 1 : 0) ? 'checked' : '' }}>
                <label for="is_alert" class="form-label mb-0">Show as alert message on Home page</label>
                @error('is_alert')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <button class="btn btn-sm btn-primary mt-2" type="submit">Save</button>
        </form>
    </div>
</div>

@isset($info)
    <div class="row">
        <div class="col-md">
            <div class="alert alert-light mt-5" role="alert">
                <p>
                    <strong>Delete posting?</strong>
                </p>
                <form action="{{ url('info', $info->id) }}" method="post" onsubmit="return confirm('Are you sure you want to delete this posting?');">
                    @isset($info)
                        @method('DELETE')
                    @endisset
                    @csrf
                    <button class="btn btn-sm btn-danger" type="submit"><i class="bi bi-trash"></i> Delete posting</button>
                </form>
            </div>
        </div>
    </div>
@endisset

@endsection
