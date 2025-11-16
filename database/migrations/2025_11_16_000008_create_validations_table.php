<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('validations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('document_id');
            $table->string('document_type'); // 'purchase_document' ou 'general_document'
            $table->foreignId('validator_id')->constrained('users')->cascadeOnDelete();
            $table->string('validator_role');
            $table->timestamp('validated_at');
            $table->text('digital_signature')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('validations');
    }
};
