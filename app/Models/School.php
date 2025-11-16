<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class School extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'address',
        'phone',
        'email',
        'director_name',
    ];

    public function accountabilityProcesses()
    {
        return $this->hasMany(AccountabilityProcess::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
