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
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();

            // School details
            $table->string('school_name')->unique();
            $table->string('city');
            $table->string('state');
            $table->string('pincode', 10);
            $table->string('board');

            // Job details
            $table->string('subject');
            $table->string('grade');
            $table->string('salary_range');
            $table->unsignedInteger('min_experience');
            $table->string('qualification');
            $table->unsignedInteger('no_of_teachers');

            // Facilities (optional)
            $table->boolean('food')->default(false);
            $table->boolean('accommodation')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_posts');
    }
};
