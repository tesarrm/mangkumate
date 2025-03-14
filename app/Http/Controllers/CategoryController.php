<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\Category;

class CategoryController extends BaseController
{
    protected $model;
    protected $table = 'categories';

    public function __construct(Category $model)
    {
        parent::__construct($model, $this->table, [], [], []);
    }

    protected function getValidationRules($id = null)
    {
        $rules = [
            'name' => 'nullable|string|max:255',
        ];

        return $rules;
    }
}