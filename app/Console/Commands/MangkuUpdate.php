<?php

// namespace App\Console\Commands;

// use Illuminate\Console\Command;
// use Symfony\Component\Process\Process;
// use Symfony\Component\Process\Exception\ProcessFailedException;

// class MangkuUpdate extends Command
// {
//     /**
//      * The name and signature of the console command.
//      *
//      * @var string
//      */
//     protected $signature = 'mangku:update';

//     /**
//      * The console command description.
//      *
//      * @var string
//      */
//     protected $description = 'Run automate.php in the automate folder';

//     /**
//      * Execute the console command.
//      */
//     public function handle()
//     {
//         // Path ke file automate.php
//         $automatePath = base_path('automate/automate.php');

//         // Periksa apakah file automate.php ada
//         if (!file_exists($automatePath)) {
//             $this->error("File automate.php tidak ditemukan di folder automate.");
//             return;
//         }

//         // Jalankan file automate.php menggunakan PHP CLI
//         $process = new Process(['php', $automatePath]);
//         $process->run();

//         // Tangani jika proses gagal
//         if (!$process->isSuccessful()) {
//             throw new ProcessFailedException($process);
//         }

//         // Tampilkan output dari proses
//         $this->info($process->getOutput());
//     }
// }

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class MangkuUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mangku:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run automate.php in the automate folder';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Path ke file automate.php (relatif dari root project)
        $automatePath = base_path('automate/automate.php');

        // Periksa apakah file automate.php ada
        if (!file_exists($automatePath)) {
            $this->error("File automate.php tidak ditemukan di folder automate.");
            return;
        }

        // Ubah direktori kerja ke folder automate
        $originalDirectory = getcwd(); // Simpan direktori kerja saat ini
        chdir(base_path('automate')); // Ubah direktori kerja ke folder automate

        // Jalankan file automate.php menggunakan PHP CLI
        $process = new Process(['php', 'automate.php']);
        $process->run();

        // Kembalikan direktori kerja ke semula
        chdir($originalDirectory);

        // Tangani jika proses gagal
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        // Tampilkan output dari proses
        $this->info($process->getOutput());
    }
}