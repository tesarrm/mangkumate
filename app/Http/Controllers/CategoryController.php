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
            'input-1740634303844' => 'nullable|string|max:255',
            'textarea-1740700415653' => 'nullable|string',
            'input-1740700422295' => 'nullable|string|max:255',
            'date-1740700424405' => 'nullable|date',
            'textarea-1740700428889' => 'nullable|string',
            'time-1740700435536' => 'nullable|string',
            'button-1740700439673' => 'nullable|string|max:255',
        ];

        return $rules;
    }
}