<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('input');
            $table->text('textarea');
            $table->boolean('checkbox');
            $table->date('date');
            $table->datetime('datetime');
            $table->integer('integer');
            $table->float('float');
            $table->longText('long-text');
            $table->string('password');
            $table->string('small-text');
            $table->string('select');
            $table->time('time');
            $table->text('code');
            $table->string('color');
            $table->string('image');
            $table->text('markdown-editor');
            $table->text('text-editor');
            $table->string('multiple-select');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('stores');
    }
};