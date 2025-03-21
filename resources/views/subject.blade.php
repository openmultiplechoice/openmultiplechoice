@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Subject')

@section('content')

<div class="row">
    <div class="col-md">
        <form action="/subjects/{{ isset($subject) ? $subject->id : '' }}" method="post" class="mt-3 mb-3">
            @isset($subject)
                @method('PUT')
            @endisset
            @csrf
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input id="name" type="text" name="name" class="form-control" value="{{ $subject->name ?? '' }}">
            </div>
            <button class="btn btn-sm btn-primary" type="submit">Save</button>
        </form>
    </div>
</div>

<h4>Modules</h4>
<ul>
    @foreach ($modules as $module)
        <li><a href="{{ url('modules', $module->id) }}">{{ $module->name }}</a></li>
    @endforeach
</ul>

@endsection
