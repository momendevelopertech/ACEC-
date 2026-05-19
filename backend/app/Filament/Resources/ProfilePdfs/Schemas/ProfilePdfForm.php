<?php

namespace App\Filament\Resources\ProfilePdfs\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProfilePdfForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make(__('admin.section_pdf_details'))->schema([
                    TextInput::make('name')
                        ->label(__('admin.col_name'))
                        ->required()
                        ->maxLength(255),
                    FileUpload::make('file_path')
                        ->label(__('admin.col_pdf_file'))
                        ->disk('public')
                        ->directory('profile-pdfs')
                        ->acceptedFileTypes(['application/pdf'])
                        ->maxSize(102400)
                        ->required(fn ($livewire) => $livewire instanceof \Filament\Resources\Pages\CreateRecord)
                        ->preserveFilenames(),
                ])->columns(1),
                Section::make(__('admin.section_status'))->schema([
                    Toggle::make('is_active')
                        ->label(__('admin.col_is_active'))
                        ->helperText(__('admin.profile_pdf_active_hint')),
                ]),
            ]);
    }
}
