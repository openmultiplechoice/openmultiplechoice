<!doctype html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8">

    <title>{{ config('app.name') }} @yield('title')</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
    <style>
button.btn {
height: 100%;
}
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
    <a class="navbar-brand" href="{{ config('app.url') }}">{{ config('app.name') }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="{{ config('app.url') }}">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
