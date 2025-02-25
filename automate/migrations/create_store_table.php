<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('store', function (Blueprint $table) {
            $table->id();
            $table->string('');
            $table->text('');
            $table->boolean('');
            $table->date('');
            $table->string('');
            $table->datetime('');
            $table->integer('');
            $table->float('');
            $table->longText('');
            $table->string('');
            $table->string('');
            $table->string('');
            $table->time('');
            $table->text('');
            $table->string('');
            $table->string('');
            $table->text('');
            $table->text('');
            $table->json('');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('store');
    }
};