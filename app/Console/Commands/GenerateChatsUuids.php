<?php

namespace App\Console\Commands;

use App\Models\Chat;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateChatsUuids extends Command
{
  protected $signature = 'chats:generate-uuids';
  protected $description = 'Generate UUIDs for chats that do not have one';

  public function handle()
  {
    $total = Chat::whereNull('uuid')->count();

    if ($total === 0) {
      $this->info('All chats already have UUIDs.');
      return 0;
    }

    $this->info("Generating UUIDs for {$total} chats...");
    $bar = $this->output->createProgressBar($total);

    Chat::whereNull('uuid')->chunk(100, function ($chats) use ($bar) {
      foreach ($chats as $chat) {
        $chat->uuid = (string) Str::uuid();
        $chat->save();
        $bar->advance();
      }
    });

    $bar->finish();
    $this->newLine();
    $this->info('Done.');
    return 0;
  }

}