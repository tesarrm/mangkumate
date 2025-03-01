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
            'date-1740703591391' => 'nullable|date',
            'datetime-1740703594097' => 'nullable|date',
            'integer-1740703598549' => 'nullable|integer',
            'float-1740703601418' => 'nullable|numeric',
            'long-text-1740703606423' => 'nullable|string',
            'code-1740703640069' => 'nullable|string',
            'color-1740703644650' => 'nullable|string|max:255',
            'image-1740703648951' => 'nullable|string|max:255',
            'markdown-editor-1740703656177' => 'nullable|string',
            'name' => 'nullable|string|max:255',
            'textarea-1740703583590' => 'nullable|string',
            'checkbox-1740703589387' => 'boolean',
            'small-text-1740703614280' => 'nullable|string|max:255',
            'password-1740703609644' => 'nullable|string|max:255',
            'select-1740703619623' => 'nullable|string|max:255',
            'time-1740703636782' => 'nullable|string',
            'text-editor-1740703660481' => 'nullable|string',
            'multiple-select-1740703664854' => 'nullable|string|max:255',
            'button-1740703586099' => 'nullable|string|max:255',
        ];

        return $rules;
    }
}