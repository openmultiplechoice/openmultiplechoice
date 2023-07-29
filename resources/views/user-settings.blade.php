@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'My settings')

@section('content')

<div class="row">
    <div class="col">
        <p>Here you can manage your personal settings.</p>

        <div id="UserSettingsView"></div>
        <script src="{{ mix('js/UserSettingsView.js') }}"></script>
    </div>
</div>

@endsection
