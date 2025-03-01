<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->date('date-1740703591391');
            $table->datetime('datetime-1740703594097');
            $table->integer('integer-1740703598549');
            $table->float('float-1740703601418');
            $table->longText('long-text-1740703606423');
            $table->text('code-1740703640069');
            $table->string('color-1740703644650');
            $table->string('image-1740703648951');
            $table->text('markdown-editor-1740703656177');
            $table->string('name')->nullable(false);
            $table->text('textarea-1740703583590');
            $table->boolean('checkbox-1740703589387');
            $table->string('small-text-1740703614280');
            $table->string('password-1740703609644');
            $table->string('select-1740703619623');
            $table->time('time-1740703636782');
            $table->text('text-editor-1740703660481');
            $table->string('multiple-select-1740703664854');
            $table->string('button-1740703586099');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};