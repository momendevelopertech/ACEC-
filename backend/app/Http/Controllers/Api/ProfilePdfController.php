<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProfilePdf;

class ProfilePdfController extends Controller
{
    public function active()
    {
        $pdf = ProfilePdf::where('is_active', true)->first();

        if (!$pdf) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'No active profile PDF found.',
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $pdf->id,
                'name' => $pdf->name,
                'file_url' => $pdf->file_url,
                'file_size' => $pdf->file_size,
                'formatted_size' => $pdf->formatted_size,
                'updated_at' => $pdf->updated_at,
            ],
        ]);
    }
}
