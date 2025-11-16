<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Validation extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'document_type',
        'validator_id',
        'validator_role',
        'validated_at',
        'digital_signature',
    ];

    public function validator()
    {
        return $this->belongsTo(User::class, 'validator_id');
    }
}
