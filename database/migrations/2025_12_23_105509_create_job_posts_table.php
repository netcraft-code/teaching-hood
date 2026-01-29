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

            // School Details
            $table->string('school_name');
            $table->string('city_id');

            // Job Details
            $table->integer('subject_id')->nullable();
            $table->integer('grade_id')->nullable();

            // Facilities
            $table->boolean('food')->default(false);
            $table->boolean('accommodation')->default(false);

            $table->string('job_type');
            $table->integer('min_salary');
            $table->integer('max_salary');
            $table->string('experience_required');

            $table->text('job_description');
            $table->text('qualification_requirements');

            $table->date('application_deadline');

            $table->string('contact_email');
            $table->string('contact_phone');

            $table->boolean('status')->default(false);

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
