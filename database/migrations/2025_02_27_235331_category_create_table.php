<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('input-1740634303844');
            $table->text('textarea-1740700415653');
            $table->string('input-1740700422295');
            $table->date('date-1740700424405');
            $table->text('textarea-1740700428889');
            $table->time('time-1740700435536');
            $table->string('button-1740700439673');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('categories');
    }
};