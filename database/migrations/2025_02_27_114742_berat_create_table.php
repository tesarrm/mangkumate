<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('berats', function (Blueprint $table) {
            $table->id();
            $table->string('input-1740634303844');
            $table->string('button-1740656882843');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('berats');
    }
};