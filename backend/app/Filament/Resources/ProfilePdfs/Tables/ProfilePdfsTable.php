<?php

namespace App\Filament\Resources\ProfilePdfs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class ProfilePdfsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label(__('admin.col_name'))
                    ->searchable()
                    ->sortable(),
                TextColumn::make('formatted_size')
                    ->label(__('admin.col_file_size'))
                    ->sortable(query: fn ($query, $direction) => $query->orderBy('file_size', $direction)),
                TextColumn::make('created_at')
                    ->label(__('admin.col_created_at'))
                    ->dateTime()
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label(__('admin.col_is_active'))
                    ->boolean(),
            ])
            ->stackedOnMobile()
            ->recordUrl(fn ($record) => $record->file_url)
            ->openRecordUrlInNewTab()
            ->recordActions([
                EditAction::make()
                    ->label(__('admin.btn_edit')),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->label(__('admin.btn_delete'))
                        ->after(fn ($records) => $records->each(fn ($record) =>
                            Storage::disk('public')->delete($record->file_path)
                        )),
                ]),
            ]);
    }
}
