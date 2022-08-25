@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Subjects')

@section('content')

<div class="row">
    <div class="col">
        <a class="btn btn-outline-secondary mb-3" href="{{ url('subjects', 'create') }}">Create new subject</a>
        <h4>Subjects</h4>
        <ul>
            @foreach ($subjects as $subject)
                <li><a href="{{ url('subjects', $subject->id) }}">{{ $subject->name }}</a></li>
            @endforeach
        </ul>
    </div>
</div>

@endsection
