<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->string('code')->primary();
            $table->foreignId('generate_by_transaction_id')->nullable()->constrained('transactions')->onDelete('cascade');
            $table->foreignId('used_by_transaction_id')->nullable()->constrained('transactions')->onDelete('cascade');
            $table->integer('discount_amount');
            $table->date('expired_date');
            $table->enum('status', ['expired', 'unexpired']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
