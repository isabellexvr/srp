<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('general_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('accountability_process_id')->constrained('accountability_processes')->cascadeOnDelete();
            $table->string('document_type');
            $table->string('file_path');
            $table->string('file_name');
            $table->foreignId('uploaded_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('general_documents');
    }
};
