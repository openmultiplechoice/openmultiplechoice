<div class="col-md-4 mb-1">
    <div class="card">
        <div class="card-header">
            <span class="badge text-bg-light">
                @if ($deck->exam_at)
                    {{ $deck->exam_at->format('d/m/Y') }}
                @else
                    {{ $deck->created_at->format('d/m/Y') }}
                @endif
            </span>
            <span class="badge text-bg-light font-monospace" title="Number of questions">
                <i class="bi bi-collection"></i> {{ sizeof($deck->questions) }}
            </span>
            <form method="post" action="/decks/{{ $deck->id }}/bookmark" style="display: inline-block;">
                @csrf
                @php($is_bookmarked = $deck->bookmarked())
                @if($is_bookmarked)
                    @method('delete')
                @endif
                <button class="btn btn-sm btn-link" type="submit">
                    <i class="@if($is_bookmarked) bi-bookmark-check-fill @else bi-bookmark @endif"> </i>
                </button>
            </form>
        </div>
        <div class="card-body">
            <h6 class="card-title text-nowrap overflow-hidden" title="{{ $deck->name }}">
                {{ $deck->name }}
            </h6>

            <a class="btn btn-sm btn-primary" href="{{ url('decks', $deck->id) }}" role="button"><i class="bi bi-collection-fill"></i> Open</a>
        </div>
    </div>
</div>
