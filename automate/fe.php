<?php
require __DIR__ . '/../vendor/autoload.php';
use Illuminate\Support\Str;

function generateListTsxContent($tableName, $columns) {
    $modelName = ucfirst($tableName);
    $pluralTableName = Str::plural($tableName);

    // Generate kolom untuk List.tsx
    $columnsList = [];
    $columnsList[] = "{ accessor: 'no', title: 'No', sortable: false, hidden: false }";

    foreach ($columns as $column) {
        preg_match("/'\w+'/", $column, $matches);
        if (!empty($matches)) {
            $columnName = trim($matches[0], "'"); // Ambil nama kolom
            $columnTitle = ucwords(str_replace('_', ' ', $columnName)); // Format judul kolom
            $columnsList[] = "{ accessor: '$columnName', title: '$columnTitle', sortable: true, hidden: false }";
        }
    }

    // Tambahkan kolom created_at dan updated_at
    $columnsList[] = "{ accessor: 'created_at', title: 'Created At', sortable: true, hidden: false }";
    $columnsList[] = "{ accessor: 'updated_at', title: 'Updated At', sortable: true, hidden: false }";

    // Gabungkan kolom ke dalam string
    $columnsString = implode(",\n        ", $columnsList);

    $stub = <<<EOT
import React from 'react';
import List from '../../components/Entity/List';

const {$modelName}List = () => {
    const columns = [
        {$columnsString}
    ];

    return (
        <List columns={columns} />
    );
};

export default {$modelName}List;
EOT;

    return $stub;
}

// Generate List.tsx
$listTsxContent = generateListTsxContent($tableName, $columns);
$listTsxFile = "resources/js/src/pages/{$modelName}/List.tsx";
if (!is_dir(dirname($listTsxFile))) {
    mkdir(dirname($listTsxFile), 0777, true); // Buat folder jika belum ada
}
file_put_contents($listTsxFile, $listTsxContent); // Timpa file yang sudah ada
echo "List.tsx file created/updated: {$listTsxFile}\n";