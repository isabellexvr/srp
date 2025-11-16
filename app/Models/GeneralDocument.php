<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GeneralDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'accountability_process_id',
        'document_type',
        'file_path',
        'file_name',
        'uploaded_by',
    ];

    public function accountabilityProcess()
    {
        return $this->belongsTo(AccountabilityProcess::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
