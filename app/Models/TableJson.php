<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableJson extends Model
{
    use HasFactory;

    protected $fillable = [
        "form_name",
        "sections",
    ];
}
