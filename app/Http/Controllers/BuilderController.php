<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\Builder;

class BuilderController extends BaseController
{
    protected $model;
    protected $table = 'builders';

    public function __construct(Builder $model)
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