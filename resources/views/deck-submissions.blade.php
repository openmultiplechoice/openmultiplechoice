@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Submissions')

@section('content')

<div class="row">
    <div class="col-md">
        <h4>Submissions</h4>
        Decks submitted to be released to the public deck directory and shown to all users in the respective module.
    </div>
</div>

<div class="row pt-4">
    @forelse ($submissions as $submission)
        <div class="col-md-6 mb-1">
            <div class="card">
                <div class="card-header">
                    <span class="badge text-bg-light">
                        @if ($submission->deck->exam_at)
                            {{ $submission->deck->exam_at->format('d.m.Y') }}
                        @else
                            {{ $submission->deck->created_at->format('d.m.Y') }}
                        @endif
                    </span>
                    <span class="badge text-bg-secondary" title="Number of questions">
                        {{ sizeof($submission->deck->questions) }}
                    </span>
                </div>
                <div class="card-body">
                    <h6 class="card-title text-nowrap overflow-hidden" title="Name">
                        {{ $submission->deck->name }}
                    </h6>
                    <hr>
                    <p>
                        <i class="bi bi-file-earmark-check"></i>
                        @if($submission->deck->module)
                            {{ $submission->deck->module->name }}
                        @else
                            <strong>No module</strong>
                        @endif
                    <br>
                    <i class="bi bi-person"></i> {{ $submission->user->name ?? 'No user' }}
                    <br>
                    <i class="bi bi-clock"></i> {{ $submission->created_at->format('d.m.y H:i') }}
                    </p>
                    <hr>
                    <div class="row pb-0 pt-2">
                        <div class="col-md-4 py-1">
                            <form action="/submissions/{{ $submission->id }}/approve" method="post">
                                @method('PUT')
                                @csrf

                                <button class="btn btn-sm btn-primary form-control" type="submit">
                                    <i class="bi bi-file-arrow-up-fill"></i> Approve
                                </button>
                            </form>
                        </div>
                        <div class="col-sm-5 py-1">
                            <a class="card-link" href="{{ url('decks', $submission->deck->id) }}">Browse</a>
                        </div>
                        <div class="col-md-3 py-1">
                            <form action="/submissions/{{ $submission->id }}" method="post">
                                @method('DELETE')
                                @csrf

                                <button class="btn btn-sm btn-danger form-control" type="submit">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @empty
        <p>No submissions yet</p>
    @endforelse
</div>

@endsection
