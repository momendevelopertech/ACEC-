<?php

namespace App\Filament\Resources\ProfilePdfs\Pages;

use App\Filament\Resources\ProfilePdfs\ProfilePdfResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditProfilePdf extends EditRecord
{
    protected static string $resource = ProfilePdfResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->label(__('admin.btn_delete'))
                ->after(function ($record) {
                    Storage::disk('public')->delete($record->file_path);
                }),
        ];
    }
}
