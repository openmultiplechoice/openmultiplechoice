@extends('layouts.app', [ 'container_class' => 'container'])

@section('title', 'Registration token management')

@section('content')

<div class="row">
    <div class="col-md">
        <h4>Registration token management</h4>
    </div>
</div>
<div class="row">
    <div class="col">
        <form method="post">
            @csrf
            <div class="row">
                <div class="col-md-3 mb-3">
                    <label for="count" class="form-label"># of token</label>
                    <input type="number" class="form-control @error('count') is-invalid @enderror" id="count" name="count" placeholder="Number of tokens to generate" value="10">
                    @error('count')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                    @enderror
                </div>
                <div class="col-md-3 mb-3">
                    <label for="expires_in" class="form-label">Expires in</label>
                    <select class="form-select @error('expires_in') is-invalid @enderror" id="expires_in" name="expires_in">
                        <option value="1">1 day</option>
                        <option value="7" selected>7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                    </select>
                    @error('expires_in')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                    @enderror
                </div>
                <div class="col-md-3 mb-3">
                    <label for="output_format" class="form-label">Output format</label>
                    <select class="form-select @error('output_format') is-invalid @enderror" id="output_format" name="output_format">
                        <option value="json">JSON</option>
                        <option value="csv">CSV</option>
                    </select>
                    @error('output_format')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                    @enderror
                </div>
                <div class="col-md-3 mb-3 align-self-end">
                    <button class="btn btn-primary" type="submit" id="gen_token_button">Generate tokens</button>
                </div>
            </div>
        </form>
    </div>
</div>
<div class="row my-4">
    <div class="col">
        <table class="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Token</th>
                <th>Created at</th>
                <th>Expires at</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            @foreach($tokens as $token)
                <tr>
                    <td>{{ $token->id }}</td>
                    <td>{{ $token->token }}</td>
                    <td>{{ $token->created_at->format('d.m.Y H:i:s') }}</td>
                    <td>{{ $token->expires_at->format('d.m.Y H:i:s') }}</td>
                    <td>
                        <form action="/admin/settings/signup/token/{{ $token->id }}" method="post">
                            @csrf
                            @method('DELETE')
                            <button class="btn btn-sm btn-primary" type="submit">
                                Delete
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
<div class="row">
    <div class="col">
        {{ $tokens->links() }}
    </div>
</div>

@endsection
