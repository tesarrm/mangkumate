<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\Product;

class ProductController extends BaseController
{
    protected $model;
    protected $table = 'products';

    public function __construct(Product $model)
    {
        parent::__construct($model, $this->table, [], [], []);
    }

    protected function getValidationRules($id = null)
    {
        $rules = [
            'name' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
        ];

        return $rules;
    }
}