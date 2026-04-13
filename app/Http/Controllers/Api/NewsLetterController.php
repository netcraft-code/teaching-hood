<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsLetterController extends Controller
{
    public function index()
    {
        $newsletters = Newsletter::all();
        return response()->json([
            'success' => true,
            'data' => $newsletters
        ]);
    }

    public function importNewsLetter(Request $request)
    {
        // Validate the incoming file
        $validator = Validator::make($request->all(), [
            'newsletter'   => 'required',
            'newsletter.*' => 'file|mimes:csv,txt,xlsx,xls,json|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        if ($request->hasFile('newsletter')) {
            $file = $request->file('newsletter');

            // Get original name
            $originalName = $file->getClientOriginalName();

            // Optional: sanitize name (recommended)
            $fileName = str_replace(' ', '_', $originalName);

            // Store file
            $filePath = $file->storeAs('newsletters', $fileName, 'public');

            $week = explode(' ', $originalName)[0];

            Newsletter::create([
                'name' => $originalName,
                'file_path' => $filePath,
                'week' => $week
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Newsletters imported successfully.',
        ]);
    }
}
