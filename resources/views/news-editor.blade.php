@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'News')

@section('content')

<div class="row">
    <div class="col-md">
        <form action="/news/{{ isset($news) ? $news->id : '' }}" method="post" class="mt-3 mb-3">
            @isset($news)
                @method('PUT')
            @endisset
            @csrf
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input id="title" type="text" name="title" class="form-control" value="{{ $news->title ?? '' }}">
            </div>
            <div class="mb-3">
                <input id="text" type="hidden" name="text" value="{{ $news->text ?? '' }}">
                <trix-editor input="text"></trix-editor>
            </div>
            <button class="btn btn-sm btn-primary" type="submit">Save</button>
        </form>
    </div>
</div>

@endsection
