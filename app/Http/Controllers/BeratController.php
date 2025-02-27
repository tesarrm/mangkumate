<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\Berat;

class BeratController extends BaseController
{
    protected $model;
    protected $table = 'berats';

    public function __construct(Berat $model)
    {
        parent::__construct($model, $this->table, [], [], []);
    }

    protected function getValidationRules($id = null)
    {
        $rules = [
            'input-1740634303844' => 'nullable|string|max:255',
            'button-1740656882843' => 'nullable|string|max:255',
        ];

        return $rules;
    }
}