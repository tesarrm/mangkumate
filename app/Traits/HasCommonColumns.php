<?php

namespace App\Traits;

trait HasCommonColumns
{
    /**
     * Mendapatkan kolom fillable secara dinamis.
     */
    public function getFillable()
    {
        return $this->fillable ?? $this->getTableColumns();
    }

    /**
     * Mendapatkan kolom sortable secara dinamis.
     */
    public function getSortable()
    {
        return $this->sortable ?? $this->getTableColumns();
    }

    /**
     * Mendapatkan semua kolom tabel.
     */
    protected function getTableColumns()
    {
        return \Schema::getColumnListing($this->getTable());
    }

    /**
     * Scope untuk filter.
     */
    public function scopeFilter($query, array $filters)
    {
        foreach ($filters as $column => $value) {
            if ($value) {
                // Global search
                if ($column === 'search') {
                    $query->where(function ($query) use ($value) {
                        foreach ($this->getSearchableColumns() as $searchColumn) {
                            $query->orWhere($searchColumn, 'like', "%{$value}%");
                        }
                    });
                }

                // Search column individu
                if (in_array($column, $this->getFilterableColumns())) {
                    $query->where($column, 'like', "%{$value}%");
                }
            }
        }
    }

    /**
     * Mendapatkan kolom yang bisa dicari (searchable).
     */
    protected function getSearchableColumns()
    {
        return $this->searchable ?? $this->getTableColumns();
    }

    /**
     * Mendapatkan kolom yang bisa difilter.
     */
    protected function getFilterableColumns()
    {
        return $this->filterable ?? $this->getTableColumns();
    }
}