<?php

namespace App\Console\Commands;

use App\Models\Group;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateGroupsUuids extends Command
{
  protected $signature = 'groups:generate-uuids';
  protected $description = 'Generate UUIDs for groups that do not have one';

  public function handle()
  {
    $total = Group::whereNull('uuid')->count();

    if ($total === 0) {
      $this->info('All groups already have UUIDs.');
      return 0;
    }

    $this->info("Generating UUIDs for {$total} groups...");
    $bar = $this->output->createProgressBar($total);

    Group::whereNull('uuid')->chunk(100, function ($groups) use ($bar) {
      foreach ($groups as $group) {
        $group->uuid = (string) Str::uuid();
        $group->save();
        $bar->advance();
      }
    });

    $bar->finish();
    $this->newLine();
    $this->info('Done.');
    return 0;
  }
}
