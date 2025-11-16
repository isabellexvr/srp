<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('accountability_process_id')->constrained('accountability_processes')->cascadeOnDelete();
            $table->string('purchase_number');
            $table->text('description');
            $table->string('supplier_name');
            $table->string('supplier_cnpj');
            $table->decimal('value', 15, 2);
            $table->date('purchase_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
