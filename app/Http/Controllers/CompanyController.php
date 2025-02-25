<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\Company;

class CompanyController extends BaseController
{
    protected $model;
    protected $table = 'companies';

    public function __construct(Company $model)
    {
        parent::__construct($model, $this->table, [], [], []);
    }

    protected function getValidationRules($id = null)
    {
        $rules = [
            'input' => 'nullable|string|max:255',
            'textarea' => 'nullable|string',
            'checkbox' => 'boolean',
            'date' => 'nullable|date',
            'datetime' => 'nullable|date',
            'integer' => 'nullable|integer',
            'float' => 'nullable|numeric',
            'long-text' => 'nullable|string',
            'password' => 'nullable|string|max:255',
            'small-text' => 'nullable|string|max:255',
            'select' => 'nullable|string|max:255',
            'time' => 'nullable|string',
            'code' => 'nullable|string',
            'color' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'markdown-editor' => 'nullable|string',
            'text-editor' => 'nullable|string',
            'multiple-select' => 'nullable|string|max:255',
        ];

        return $rules;
    }
}