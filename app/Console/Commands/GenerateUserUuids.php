<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Str;

class GenerateUserUuids extends Command
{
  protected $signature = 'users:generate-uuids';
  protected $description = 'Generate UUIDs for users that do not have one';

  public function handle()
  {
    $total = User::whereNull('uuid')->count();

    if ($total === 0) {
      $this->info('All users already have UUIDs.');
      return 0;
    }

    $this->info("Generating UUIDs for {$total} users...");
    $bar = $this->output->createProgressBar($total);

    User::whereNull('uuid')->chunk(100, function ($users) use ($bar) {
      foreach ($users as $user) {
        // generate and ensure uniqueness just in case
        $uuid = (string) Str::uuid();
        while (User::where('uuid', $uuid)->exists()) {
          $uuid = (string) Str::uuid();
        }
        $user->uuid = $uuid;
        $user->save();
        $bar->advance();
      }
    });

    $bar->finish();
    $this->newLine();
    $this->info('Done.');
    return 0;
  }
}
