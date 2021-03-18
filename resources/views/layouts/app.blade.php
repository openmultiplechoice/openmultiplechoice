<!doctype html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8">

    <title>{{ config('app.name') }} @yield('title')</title>

    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <script src="{{ asset('js/bootstrap.bundle.min.js') }}"></script>

    <style>
button.btn {
height: 100%;
}
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
    <div class="container-fluid">
        <a class="navbar-brand" href="{{ config('app.url') }}">{{ config('app.name') }}</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="{{ config('app.url') }}">Home</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ __('omc.more') }}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/sessions">Sessions</a>
                        <a class="dropdown-item" href="/decks">Decks</a>
                        <a class="dropdown-item" href="/questions">Questions</a>
                        <a class="dropdown-item" href="/messages">Messages</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Admin</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container-fluid">

<div class="row">
    <div class="col">
@if (Session::has( 'msg-success' ))
        <div class="alert alert-success" role="alert">
            {{ Session::get( 'msg-success' ) }}
        </div>
@elseif (Session::has( 'msg-warning' ))
        <div class="alert alert-warning" role="alert">
            {{ Session::get( 'msg-warning' ) }}
        </div>
@elseif (Session::has( 'msg-error' ))
        <div class="alert alert-danger" role="alert">
            {{ Session::get( 'msg-error' ) }}
        </div>
@elseif (Session::has( 'msg-info' ))
        <div class="alert alert-primary" role="alert">
            {{ Session::get( 'msg-info' ) }}
        </div>
@endif
    </div>
</div>

@yield('content')

<p class="text-center text-muted mt-5"><small>Powered by <a target="_blank" class="text-muted" href="https://github.com/openmultiplechoice/openmultiplechoice">OpenMultipleChoice</a></small></p>

</div>

</body>
</html>
