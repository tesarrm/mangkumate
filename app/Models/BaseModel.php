<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Kyslik\ColumnSortable\Sortable;
use App\Traits\HasCommonColumns;

class BaseModel extends Model
{
    use HasCommonColumns, Sortable;

    /**
     * Kolom yang di-guard.
     */
    protected $guarded = ['id'];
}