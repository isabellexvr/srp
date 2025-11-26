<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountabilityProcess extends Model
{
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
        'progress'
    ];

    // Relação com escola
    public function school()
    {
        return $this->belongsTo(School::class);
    }

    // Relação com itens do checklist
    public function checklistItems(): HasMany
    {
        return $this->hasMany(ChecklistItem::class);
    }

    // Relação com compras
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    // Calcular progresso automaticamente
    public function calculateProgress(): int
    {
        $totalItems = $this->checklistItems->count();
        
        if ($totalItems === 0) {
            return 0;
        }

        $completedItems = $this->checklistItems->where('status', 'completed')->count();
        
        return (int) round(($completedItems / $totalItems) * 100);
    }

    // Atualizar progresso (método para ser chamado quando itens forem atualizados)
    public function updateProgress(): void
    {
        $this->progress = $this->calculateProgress();
        $this->save();
    }

    // Accessor para progresso calculado (sempre atualizado)
    public function getCalculatedProgressAttribute(): int
    {
        return $this->calculateProgress();
    }
}