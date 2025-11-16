<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ChecklistItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'accountability_process_id',
        'item_number',
        'description',
        'status',
        'sei_number',
        'notes',
    ];

    public function accountabilityProcess()
    {
        return $this->belongsTo(AccountabilityProcess::class);
    }
}
