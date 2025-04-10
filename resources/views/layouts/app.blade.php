<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8">

    <title>{{ config('app.name') }} @yield('title')</title>

    <meta name="generator" content="OpenMultipleChoice - https://github.com/openmultiplechoice/openmultiplechoice" />

    @vite(['node_modules/bootstrap/dist/js/bootstrap.esm.js'])
    @vite(['node_modules/trix/dist/trix.esm.js'])
    @vite(['resources/scss/app.scss', 'resources/js/app.js'])
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
    <div class="container-fluid">
        <a class="navbar-brand" href="{{ config('app.url') }}">{{ config('app.name') }}</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="{{ config('app.url') }}">Home</a>
                </li>
                @if (Auth::check())
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ __('omc.more') }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="{{ url('decks') }}">Your decks</a>
                            <a class="dropdown-item" href="{{ url('bookmarks') }}">Your bookmarks</a>
                            <a class="dropdown-item" href="{{ url('messages') }}">Your comments</a>
                            <hr class="dropdown-divider">
                            <a class="dropdown-item" href="{{ url('info') }}">Info</a>
                            <hr class="dropdown-divider">
                            <h6 class="dropdown-header">Contribute</h6>
                            <a class="dropdown-item" href="{{ url('questions/reviewable') }}">Review questions</a>
                        </div>
                    </li>
                    @if (Auth::user()->is_admin || Auth::user()->is_moderator)
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Admin
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ url('submissions') }}">Submissions</a>
                                <hr class="dropdown-divider">
                                <a class="dropdown-item" href="{{ url('subjects') }}">Subjects</a>
                                <a class="dropdown-item" href="{{ url('modules') }}">Modules</a>
                                @if (config('app.magic'))
                                    <hr class="dropdown-divider">
                                    <a class="dropdown-item" href="{{ url('magic-gifs') }}">Magic GIFs</a>
                                @endif
                                @if (Auth::user()->is_admin)
                                    <hr class="dropdown-divider">
                                    <a class="dropdown-item" href="{{ url('admin/users') }}">User management</a>
                                    <a class="dropdown-item" href="{{ url('tokens') }}">API Token</a>
                                    <hr class="dropdown-divider">
                                    <h6 class="dropdown-header">Settings</h6>
                                    <a class="dropdown-item" href="{{ url('admin/settings/signup') }}">Sign-up</a>
                                @endif
                            </div>
                        </li>
                    @endif
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ Auth::user()->name }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownUser">
                            <a class="dropdown-item" href="/me/settings">Settings</a>
                            <hr class="dropdown-divider">
                            <a class="dropdown-item" href="/logout">Log out</a>
                        </div>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>

<div class="{{ $container_class ?? 'container-fluid'}}">

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

<div class="row mt-5">
    <div class="col">
        @if (config('app.poweredby'))
            <p class="text-center text-muted"><small>Powered by <a target="_blank" class="text-muted" href="https://github.com/openmultiplechoice/openmultiplechoice">OpenMultipleChoice</a></small></p>
        @endif

        @if (config('app.version'))
            <p class="text-center text-muted"><small>Version: <span class="font-monospace">{{ config('app.version') }}</span></small></p>
        @endif
    </div>
</div>


</div>

</body>
</html>
