@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Comments')

@section('content')

<div class="row">
    <div class="col-md">
        <h4>Your comments</h4>
        @forelse($messages as $message)
            <div class="border-start border-2 mb-3">
                <div class="d-flex gap-1 mb-2 message-content py-1 rounded-end-3">
                    <div class="d-flex flex-column gap-1" style="min-width: 2rem">
                        <button class="btn btn-link p-0 text-muted text-decoration-none opacity-25 disabled">
                            <i class="bi bi-hand-thumbs-up"></i>
                        </button>
                        <span class="text-center text-muted small">
                            {{ $message->thumbs_up_count - $message->thumbs_down_count }}
                        </span>
                        <button class="btn btn-link p-0 text-muted text-decoration-none opacity-25 disabled">
                            <i class="bi bi-hand-thumbs-down"></i>
                        </button>
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex gap-2 text-muted small">
                            @if($message->parent_message_id || $message->legacy_parent_message_id)
                                <i class="bi bi-arrow-return-right" title="Answer"></i>
                                <span>•</span>
                            @endif
                            <span>
                                @if($message->is_anonymous)
                                    <i class="bi bi-incognito" title="Anonymous"></i>
                                @elseif($message->author)
                                    {{ $message->author->public_name ?? $message->author->name}}
                                @endif
                            </span>
                            <span>•</span>
                            <span title="{{ Carbon\Carbon::parse($message->created_at)->format('d.m.Y H:i') }}">
                                {{ Carbon\Carbon::parse($message->created_at)->diffForHumans() }}
                                @if($message->updated_at != $message->created_at)
                                    <i class="bi bi-pencil ms-1" title="Edited {{ Carbon\Carbon::parse($message->updated_at)->format('d.m.Y H:i') }}"></i>
                                @endif
                            </span>
                        </div>
                        <div class="mt-1">
                            <div class="text-break">
                                {!! Purify::clean($message->text) !!}
                            </div>
                            <div class="d-flex justify-content-end small gap-2">
                                <a href="{{ url('questions', $message->question->id) }}" target="_blank" class="btn btn-sm btn-link link-dark">Show</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @empty
            <p>No comments yet</p>
        @endforelse

        <div class="sticky-bottom bg-white mt-3 pt-3">
            {{ $messages->links() }}
        </div>
    </div>
</div>

@endsection
