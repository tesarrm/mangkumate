<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('builders', function (Blueprint $table) {
            // $table->id();
            // $table->string('form_name');
            $table->string('id')->primary();
            $table->json('sections')->nullable(); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('builders');
    }
};