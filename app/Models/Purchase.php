<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'accountability_process_id',
        'purchase_number',
        'description',
        'supplier_name',
        'supplier_cnpj',
        'value',
        'purchase_date',
    ];

    public function accountabilityProcess()
    {
        return $this->belongsTo(AccountabilityProcess::class);
    }

    public function purchaseDocuments()
    {
        return $this->hasMany(PurchaseDocument::class);
    }
}
