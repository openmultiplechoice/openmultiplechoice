<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\Image;

class ImageController extends Controller
{
    public function destroy(Image $image)
    {
        Storage::delete($image->path);
        $image->delete();
        return response()->noContent();
    }
}
