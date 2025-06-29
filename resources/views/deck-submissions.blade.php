@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Submissions')

@section('content')

<div class="row">
    <div class="col-md">
        <h4>Submissions</h4>
        Decks submitted for the <i>main decks</i> category.
    </div>
</div>

<div class="row pt-4">
    @forelse ($submissions as $submission)
        <div class="col-md-6 mb-3">
            <div class="card">
                <div class="card-header">
                    <span class="badge text-bg-light">
                        @if ($submission->deck->exam_at)
                            {{ $submission->deck->exam_at->format('d.m.Y') }}
                        @else
                            {{ $submission->deck->created_at->format('d.m.Y') }}
                        @endif
                    </span>
                    <span class="badge text-bg-light font-monospace" title="Number of questions">
                        <i class="bi bi-collection"></i> {{ sizeof($submission->deck->questions) }}
                    </span>
                </div>
                <div class="card-body">
                    <h6 class="card-title text-truncate" title="{{ $submission->deck->name }}">
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
                        <i class="bi bi-person"></i> <a href="{{ url('admin/users/' . $submission->user->id . '/edit') }}">{{ $submission->user->name ?? 'No user' }}</a>
                        <br>
                        <i class="bi bi-clock"></i> {{ $submission->created_at->format('d.m.y H:i') }}
                    </p>
                    <hr>
                    <div class="row pb-0 pt-2">
                        <div class="col-md-4 py-1">
                            <form action="/submissions/{{ $submission->id }}/approve" method="post" onsubmit="return confirm('Are you sure you want to approve this submission?');">
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
                            <form action="/submissions/{{ $submission->id }}" method="post" onsubmit="return confirm('Are you sure you want to delete this submission?');">
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
