<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\Item;

class ItemController extends BaseController
{
    protected $model;
    protected $table = 'items';

    public function __construct(Item $model)
    {
        parent::__construct($model, $this->table, [], [], []);
    }

    protected function getValidationRules($id = null)
    {
        $rules = [
            'Name' => 'nullable|string|max:255',
            'qty' => 'nullable|integer',
            'buy_date' => 'nullable|date',
        ];

        return $rules;
    }
}