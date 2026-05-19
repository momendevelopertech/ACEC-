<?php

namespace App\Filament\Resources\ProfilePdfs\Pages;

use App\Filament\Resources\ProfilePdfs\ProfilePdfResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListProfilePdfs extends ListRecords
{
    protected static string $resource = ProfilePdfResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->label(__('admin.btn_create')),
        ];
    }
}
