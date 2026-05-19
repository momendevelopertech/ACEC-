<?php

namespace App\Filament\Resources\ProfilePdfs;

use App\Filament\Resources\ProfilePdfs\Pages\CreateProfilePdf;
use App\Filament\Resources\ProfilePdfs\Pages\EditProfilePdf;
use App\Filament\Resources\ProfilePdfs\Pages\ListProfilePdfs;
use App\Filament\Resources\ProfilePdfs\Schemas\ProfilePdfForm;
use App\Filament\Resources\ProfilePdfs\Tables\ProfilePdfsTable;
use App\Models\ProfilePdf;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProfilePdfResource extends Resource
{
    protected static ?string $model = ProfilePdf::class;
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;
    protected static ?int $navigationSort = 8;

    public static function getNavigationLabel(): string { return __('admin.profile_pdfs'); }
    public static function getModelLabel(): string { return __('admin.profile_pdfs'); }
    public static function getPluralModelLabel(): string { return __('admin.profile_pdfs'); }

    public static function form(Schema $schema): Schema { return ProfilePdfForm::configure($schema); }
    public static function table(Table $table): Table { return ProfilePdfsTable::configure($table); }

    public static function getRelations(): array { return []; }

    public static function getPages(): array
    {
        return [
            'index' => ListProfilePdfs::route('/'),
            'create' => CreateProfilePdf::route('/create'),
            'edit' => EditProfilePdf::route('/{record}/edit'),
        ];
    }
}
