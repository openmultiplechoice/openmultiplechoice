@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Module')

@section('content')

<div class="row">
    <div class="col-md">
        <form action="/modules/{{ isset($module) ? $module->id : '' }}" method="post" class="mt-3 mb-3">
            @isset($module)
                @method('PUT')
            @endisset
            @csrf
            <div class="mb-3">
                <label for="subject_id" class="form-label">Subject</label>
                <select id="subject_id" name="subject_id" class="form-select">
                    <option selected>Select a subject ...</option>
                    @foreach ($subjects as $subject)
                        <option value="{{ $subject->id }}" {{ ($subject->id == $module->subject_id) ? 'selected' : '' }}>{{ $subject->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input id="name" type="text" name="name" class="form-control" value="{{ $module->name ?? '' }}">
            </div>
            <button class="btn btn-sm btn-primary" type="submit">Save</button>
        </form>
    </div>
</div>

<div class="row">
    <div class="col">
        <h4>Decks</h4>
        <ul>
            @foreach ($module->decks->sortByDesc('name') as $deck)
                <li><a href="{{ url('decks/'. $deck->id) }}">{{ $deck->name }}</a></li>
            @endforeach
        </ul>
    </div>
</div>

@endsection
