<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'input',
        'textarea',
        'checkbox',
        'date',
        'datetime',
        'integer',
        'float',
        'long-text',
        'password',
        'small-text',
        'select',
        'time',
        'code',
        'color',
        'image',
        'markdown-editor',
        'text-editor',
        'multiple-select'
    ];
}