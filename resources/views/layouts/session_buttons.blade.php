<div class="row">
@if (isset($urlPrev))
    <div class="col-sm-3">
        <a class="btn btn-outline-dark btn-sm btn-block mb-1" href="{{ $urlPrev }}">Prev</a>
    </div>
@else
    <div class="col-sm-3"></div>
@endif
@if (isset($urlSession))
    <div class="col-sm-3">
        <a class="btn btn-outline-dark btn-sm btn-block mb-1" href="{{ $urlSession }}">Overview</a>
    </div>
@else
    <div class="col-sm-3"></div>
@endif
@if (isset($urlNext))
    <div class="col-sm-6">
        <a class="btn btn{{ isset($answerChoice) ? '' : '-outline' }}-dark btn-sm btn-block mb-1" href="{{ $urlNext }}">Next</a>
    </div>
@else
    <div class="col-sd-6"></div>
@endif
</div>
