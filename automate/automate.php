<?php
require __DIR__ . '/../vendor/autoload.php';
use Illuminate\Support\Str;

// Direktori tempat file JSON disimpan
// $jsonDir = 'tables-json/';
$jsonDir = 'entities/';

// Ambil semua file JSON di folder
$jsonFiles = glob($jsonDir . '*.json');

// Urutkan file JSON berdasarkan nama file
sort($jsonFiles);

// Bersihkan file routes sebelum menulis yang baru
$routesFile = '../routes/api.php';
if (file_exists($routesFile)) {
    file_put_contents($routesFile, "<?php\n\nuse Illuminate\Support\Facades\Route;\n\nRoute::apiResource('builders', \App\Http\Controllers\BuilderController::class);\n\n"); // Reset isi file routes
}

// Loop melalui setiap file JSON
foreach ($jsonFiles as $jsonFile) {
    // Baca isi file JSON
    $jsonContent = file_get_contents($jsonFile);
    $data = json_decode($jsonContent, true);

    // Ambil nama tabel dari formName
    $tableName = strtolower($data['formName']);
    $modelName = ucfirst($tableName); // Nama model

    // Generate kolom untuk migration
    $columns = [];
    foreach ($data['sections'] as $section) {
        foreach ($section['columns'] as $column) {
            foreach ($column['elements'] as $element) {
                $columnName = $element['name'];
                $columnType = mapTypeToDatabase($element['type']);
                $columnOptions = [];

                if ($element['mandatory']) {
                    $columnOptions[] = 'nullable(false)';
                }
                if ($element['length'] > 0 && in_array($columnType, ['string', 'text'])) {
                    $columnOptions[] = "length({$element['length']})";
                }

                $columns[] = "\$table->{$columnType}('{$columnName}')" . (!empty($columnOptions) ? '->' . implode('->', $columnOptions) : '') . ';';
            }
        }
    }

    // Generate migration
    $migrationContent = generateMigrationContent($tableName, $columns);
    // $migrationFile = "../database/migrations/create_{$tableName}_table.php";
    // $migrationFile = "../database/migrations/{$jsonFile}_create_table.php";
    // Hapus ekstensi .json dari $jsonFile
    $jsonFileName = pathinfo($jsonFile, PATHINFO_FILENAME);

    // Simpan sebagai migration file
    $migrationFile = "../database/migrations/{$jsonFileName}_create_table.php";
    
    file_put_contents($migrationFile, $migrationContent); // Timpa file yang sudah ada
    echo "Migration file created/updated: {$migrationFile}\n";

    // Generate controller
    $controllerContent = generateControllerContent($tableName, $columns);
    $controllerFile = "../app/Http/Controllers/{$modelName}Controller.php";
    file_put_contents($controllerFile, $controllerContent); // Timpa file yang sudah ada
    echo "Controller file created/updated: {$controllerFile}\n";

    // Generate model
    $modelContent = generateModelContent($tableName, $columns);
    $modelFile = "../app/Models/{$modelName}.php";
    file_put_contents($modelFile, $modelContent); // Timpa file yang sudah ada
    echo "Model file created/updated: {$modelFile}\n";

    // Generate routes
    $routesContent = generateRoutesContent($tableName);
    file_put_contents($routesFile, $routesContent, FILE_APPEND); // Tambahkan route baru
    echo "Routes added to api.php for {$tableName}\n";

    // Generate List.tsx
    $listTsxContent = generateListTsxContent($tableName, $columns);
    $listTsxFile = "../resources/js/src/pages/{$modelName}/List.tsx";
    if (!is_dir(dirname($listTsxFile))) {
        mkdir(dirname($listTsxFile), 0777, true); // Buat folder jika belum ada
    }
    file_put_contents($listTsxFile, $listTsxContent); // Timpa file yang sudah ada
    echo "List.tsx file created/updated: {$listTsxFile}\n";

    // // Generate List.tsx
    // $listTsxContent = generateListTsxContent($tableName, $columns);
    // $listTsxFile = "../resources/js/src/pages/{$modelName}/List.tsx";
    // if (!is_dir(dirname($listTsxFile))) {
    //     mkdir(dirname($listTsxFile), 0777, true); // Buat folder jika belum ada
    // }
    // file_put_contents($listTsxFile, $listTsxContent); // Timpa file yang sudah ada
    // echo "List.tsx file created/updated: {$listTsxFile}\n";

    // // Tambahkan rute ke routes.tsx
    // addRouteToRoutesTsx($tableName);
    // Generate routes.tsx
    $routesTsxContent = generateRoutesTsxContent($jsonFiles);
    $routesTsxFile = "../resources/js/src/router/routes.tsx";
    file_put_contents($routesTsxFile, $routesTsxContent); // Timpa file yang sudah ada
    echo "routes.tsx file created/updated: {$routesTsxFile}\n";
}

/*********************************
 * Fungsi Bantuan
 */

function mapTypeToDatabase($type) {
    $mapping = [
        'input' => 'string',
        'textarea' => 'text',
        'checkbox' => 'boolean',
        'date' => 'date',
        'datetime' => 'datetime',
        'integer' => 'integer',
        'float' => 'float',
        'long-text' => 'longText',
        'small-text' => 'string',
        'password' => 'string',
        'select' => 'string',
        'time' => 'time',
        'code' => 'text',
        'color' => 'string',
        'image' => 'string',
        'markdown-editor' => 'text',
        'text-editor' => 'text',
        // 'multiple-select' => 'json',
        'multiple-select' => 'string',
    ];
    return $mapping[$type] ?? 'string';
}

function generateMigrationContent($tableName, $columns) {
    // Ubah nama tabel menjadi format jamak
    $pluralTableName = Str::plural($tableName);

    $stub = <<<EOT
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('{$pluralTableName}', function (Blueprint \$table) {
            \$table->id();
            {columns}
            \$table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('{$pluralTableName}');
    }
};
EOT;

    return str_replace('{columns}', implode("\n            ", $columns), $stub);
}

// function generateControllerContent($tableName) {
//     $modelName = ucfirst($tableName);
//     $stub = <<<EOT
// <?php

// namespace App\Http\Controllers;

// use App\Models\\{$modelName};
// use Illuminate\Http\Request;

// class {$modelName}Controller extends Controller
// {
//     public function index()
//     {
//         return {$modelName}::all();
//     }

//     public function store(Request \$request)
//     {
//         return {$modelName}::create(\$request->all());
//     }

//     public function show({$modelName} \${$tableName})
//     {
//         return \${$tableName};
//     }

//     public function update(Request \$request, {$modelName} \${$tableName})
//     {
//         \${$tableName}->update(\$request->all());
//         return \${$tableName};
//     }

//     public function destroy({$modelName} \${$tableName})
//     {
//         \${$tableName}->delete();
//         return response()->noContent();
//     }
// }
// EOT;

//     return $stub;
// }

function generateControllerContent($tableName, $columns) {
    $modelName = ucfirst($tableName);
    $pluralTableName = Str::plural($tableName);

    // Generate aturan validasi
    $validationRules = [];
    foreach ($columns as $column) {
        // preg_match("/'\w+'/", $column, $matches);
        preg_match("/'[\w-]+'/", $column, $matches);
        if (!empty($matches)) {
            $columnName = trim($matches[0], "'"); // Ambil nama kolom
            $columnType = getColumnType($column); // Ambil tipe kolom

            // Buat aturan validasi berdasarkan tipe kolom
            $validationRules[$columnName] = generateValidationRule($columnType, $columnName, $pluralTableName);
        }
    }

    // Format aturan validasi ke dalam string PHP
    $validationRulesString = "[\n";
    foreach ($validationRules as $field => $rule) {
        $validationRulesString .= "            '$field' => '$rule',\n";
    }
    $validationRulesString .= "        ]";

    $stub = <<<EOT
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\\{$modelName};

class {$modelName}Controller extends BaseController
{
    protected \$model;
    protected \$table = '{$pluralTableName}';

    public function __construct({$modelName} \$model)
    {
        parent::__construct(\$model, \$this->table, [], [], []);
    }

    protected function getValidationRules(\$id = null)
    {
        \$rules = {$validationRulesString};

        return \$rules;
    }
}
EOT;

    return $stub;
}

/**
 * Ambil tipe kolom dari string kolom migration.
 */
function getColumnType($column) {
    preg_match("/\\\$table->(\w+)\(/", $column, $matches);
    // preg_match("/\\\$table->([\w-]+)\(/", $column, $matches);
    return $matches[1] ?? 'string';
}

/**
 * Generate aturan validasi berdasarkan tipe kolom.
 */
function generateValidationRule($columnType, $columnName, $tableName) {
    $rules = [];

    switch ($columnType) {
        case 'string':
            $rules[] = 'nullable';
            $rules[] = 'string';
            $rules[] = 'max:255';
            break;
        case 'text':
        case 'longText':
            $rules[] = 'nullable';
            $rules[] = 'string';
            break;
        case 'boolean':
            $rules[] = 'boolean';
            break;
        case 'date':
        case 'datetime':
            $rules[] = 'nullable';
            $rules[] = 'date';
            break;
        case 'integer':
            $rules[] = 'nullable';
            $rules[] = 'integer';
            break;
        case 'float':
            $rules[] = 'nullable';
            $rules[] = 'numeric';
            break;
        case 'json':
            $rules[] = 'nullable';
            $rules[] = 'json';
            break;
        default:
            $rules[] = 'nullable';
            $rules[] = 'string';
            break;
    }

    // Jika kolom wajib diisi, tambahkan aturan required
    if (strpos($columnName, 'required') !== false) {
        array_unshift($rules, 'required');
    }

    return implode('|', $rules);
}

function generateModelContent($tableName, $columns) {
    $modelName = ucfirst($tableName);

    // Ekstrak nama kolom dari array $columns
    $fillableColumns = ["'id'"]; // Tambahkan 'id' secara manual
    foreach ($columns as $column) {
        // Ambil nama kolom dengan menangkap string dalam tanda petik
        preg_match("/'([\w-]+)'/", $column, $matches);
        if (!empty($matches)) {
            $columnName = trim($matches[1]); // Ambil nama tanpa tanda petik
            $fillableColumns[] = "'$columnName'";
        }
    }

    // Format array fillable
    $fillableString = implode(",\n        ", $fillableColumns);

//     $stub = <<<EOT
// <?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class {$modelName} extends Model
// {
//     use HasFactory;

//     protected \$fillable = [
//         {$fillableString}
//     ];
// }
// EOT;

//     return $stub;
// }

// function generateRoutesContent($tableName) {
//     $pluralTableName = Str::plural($tableName);
//     $modelName = ucfirst($tableName);
//     return <<<EOT
// Route::apiResource('{$pluralTableName}', \\App\\Http\\Controllers\\{$modelName}Controller::class);
// EOT . PHP_EOL;
// }


    $stub = <<<EOT
<?php

namespace App\Models;

class {$modelName} extends BaseModel
{
}
EOT;

    return $stub;
}

function generateRoutesContent($tableName) {
    $pluralTableName = Str::plural($tableName);
    $modelName = ucfirst($tableName);
    return <<<EOT
Route::apiResource('{$pluralTableName}', \\App\\Http\\Controllers\\{$modelName}Controller::class);
EOT . PHP_EOL;
}

/********************************
 * TSX
 */

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

// function addRouteToRoutesTsx($tableName) {
//     $modelName = ucfirst($tableName);
//     $pluralTableName = Str::plural($tableName);

//     // Path ke file routes.tsx
//     $routesFile = "../resources/js/src/router/routes.tsx";

//     // Baca isi file routes.tsx
//     $routesContent = file_get_contents($routesFile);

//     // Cari posisi terakhir dari array `routes`
//     $lastRoutePosition = strrpos($routesContent, '},');

//     // Jika tidak ditemukan, cari posisi terakhir dari array `routes` tanpa koma
//     if ($lastRoutePosition === false) {
//         $lastRoutePosition = strrpos($routesContent, '}');
//     }

//     // Jika masih tidak ditemukan, beri pesan error
//     if ($lastRoutePosition === false) {
//         echo "Error: Tidak dapat menemukan posisi terakhir dari array routes.\n";
//         return;
//     }

//     // Tambahkan rute baru setelah posisi terakhir
//     $newRoute = <<<EOT
//     {
//         path: '/{$pluralTableName}',
//         element: <{$modelName}List />,
//         layout: 'default',
//     },
// EOT;

//     // Sisipkan rute baru ke dalam konten
//     $routesContent = substr_replace($routesContent, $newRoute, $lastRoutePosition + 2, 0);

//     // Tambahkan import untuk komponen List
//     $importStatement = "const {$modelName}List = lazy(() => import('../pages/{$modelName}/List'));\n";
//     $routesContent = preg_replace("/(import React from 'react';\nimport \{ lazy \} from 'react';)/", "$1\n$importStatement", $routesContent);

//     // Simpan perubahan ke file routes.tsx
//     file_put_contents($routesFile, $routesContent);

//     echo "Route added to routes.tsx for {$modelName}List\n";
// }

function generateRoutesTsxContent($jsonFiles) {
    $imports = [];
    $routes = [];

    // Import default untuk Index
    $imports[] = "const Index = lazy(() => import('../pages/Index'));";
    // $imports[] = "import App from '../components/FormBuilder/App';";

    // Loop melalui setiap file JSON
    foreach ($jsonFiles as $jsonFile) {
        // Baca isi file JSON
        $jsonContent = file_get_contents($jsonFile);
        $data = json_decode($jsonContent, true);

        // Ambil nama tabel dari formName
        $tableName = strtolower($data['formName']);
        $modelName = ucfirst($tableName);
        $pluralTableName = Str::plural($tableName);

        // Tambahkan import untuk komponen List
        $imports[] = "const {$modelName}List = lazy(() => import('../pages/{$modelName}/List'));";

        // Tambahkan rute untuk tabel ini
        $routes[] = "    {
        path: '/{$pluralTableName}',
        element: <{$modelName}List />,
        layout: 'default',
    },";
    }

    // Gabungkan impor dan rute ke dalam konten file routes.tsx
    $importsString = implode("\n", $imports);
    $routesString = implode("\n", $routes);

    $stub = <<<EOT
import React from 'react';
import { lazy } from 'react';

const App = lazy(() => import('../components/FormBuilder/App'));
const BuilderList = lazy(() => import('../pages/Builder/BuilderList'));

{$importsString}

const routes = [
    // Dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/builders/:form_name',
        element: <App />,
        layout: 'default',
    },
    {
        path: '/builders',
        element: <BuilderList />,
        layout: 'default',
    },

    // Rute untuk setiap tabel
{$routesString}
];

export { routes };
EOT;

    return $stub;
}