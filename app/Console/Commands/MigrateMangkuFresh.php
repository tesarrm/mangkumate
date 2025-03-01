<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class MigrateMangkuFresh extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mangku:fresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run migrate:fresh but exclude the builders table';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Daftar tabel yang akan dihapus, kecuali tabel builders
        $tables = DB::select('SHOW TABLES');
        $tables = array_map('current', $tables); // Ambil nama tabel

        // Hapus semua tabel kecuali tabel builders
        foreach ($tables as $table) {
            if ($table !== 'builders') {
                Schema::dropIfExists($table);
                $this->info("Dropped table: {$table}");
            }
        }

        // Jalankan migrasi, kecuali migrasi untuk tabel builders
        $migrationsPath = database_path('migrations');
        $migrationFiles = File::files($migrationsPath);

        foreach ($migrationFiles as $file) {
            $fileName = $file->getFilename();

            // Skip migrasi yang terkait dengan tabel builders
            if (strpos($fileName, 'create_builders_table') === false) {
                Artisan::call('migrate', [
                    '--path' => 'database/migrations/' . $fileName,
                ]);
                $this->info("Migrated: {$fileName}");
            } else {
                $this->info("Skipped: {$fileName} (builders table migration)");
            }
        }

        $this->info('Migrate fresh completed, except for the builders table.');
    }
}