<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\Image;

class ApiImageController extends Controller
{
    public function destroy(Image $image)
    {
        $image->delete();
        return response()->noContent();
    }
}
