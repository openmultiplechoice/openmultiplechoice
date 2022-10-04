@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Modules')

@section('content')

<div class="row">
    <div class="col">
        <a class="btn btn-outline-secondary mb-3" href="{{ url('modules', 'create') }}">Create new module</a>
        <h4>Modules</h4>
        <ul>
            @foreach ($modules as $module)
                <li><a href="{{ url('modules', $module->id) }}">{{ $module->name }}</a></li>
            @endforeach
        </ul>
    </div>
</div>

@endsection
