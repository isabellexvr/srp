<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PurchaseDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_id',
        'document_type',
        'file_path',
        'file_name',
        'uploaded_by',
        'authenticity_verified',
        'verification_date',
    ];

    public function purchase()
    {
        return $this->belongsTo(Purchase::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
