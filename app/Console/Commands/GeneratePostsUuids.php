<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GeneratePostsUuids extends Command
{
  protected $signature = 'posts:generate-uuids';
  protected $description = 'Generate UUIDs for posts that do not have one';

  public function handle()
  {
    $total = Post::whereNull('uuid')->count();

    if ($total === 0) {
      $this->info('All posts already have UUIDs.');
      return 0;
    }

    $this->info("Generating UUIDs for {$total} posts...");
    $bar = $this->output->createProgressBar($total);

    Post::whereNull('uuid')->orWhere('uuid', '')->chunk(100, function ($posts) use ($bar) {
      foreach ($posts as $post) {
        $post->uuid = (string) Str::uuid();
        $post->save();
        $bar->advance();
      }
    });



    $bar->finish();
    $this->newLine();
    $this->info('Done.');
    return 0;
  }
}