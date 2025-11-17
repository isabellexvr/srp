<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AccountabilityProcess extends Model
{
    use HasFactory;

    public function calculateProgress()
    {
        $totalItems = $this->checklistItems->count();
        if ($totalItems === 0)
            return 0;
        $completedItems = $this->checklistItems->where('status', 'completed')->count();
        return round(($completedItems / $totalItems) * 100);
    }
    use HasFactory;

    protected $fillable = [
        'school_id',
        'year',
        'semester',
        'process_number',
        'status',
        'president_name',
        'treasurer_name',
        'submission_date',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function checklistItems()
    {
        return $this->hasMany(ChecklistItem::class);
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    public function generalDocuments()
    {
        return $this->hasMany(GeneralDocument::class);
    }
}
