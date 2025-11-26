<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChecklistItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'accountability_process_id',
        'item_number',
        'description',
        'status',
        'sei_number',
        'notes'
    ];

    public function accountabilityProcess()
    {
        return $this->belongsTo(AccountabilityProcess::class);
    }

    protected static function booted()
    {
        static::saved(function ($checklistItem) {
            $checklistItem->accountabilityProcess->updateProgress();
        });

        static::deleted(function ($checklistItem) {
            $checklistItem->accountabilityProcess->updateProgress();
        });
    }
}