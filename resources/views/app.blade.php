<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- <title inertia>{{ config('app.name', 'Laravel') }}</title> -->
  <!-- <title inertia></title> -->
  <title>Chatter</title>
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <meta name="csrf-token" content="{{ csrf_token() }}">
   <title>Chatter</title>
    <meta name="description" content="Chatter is a chat web app where you can ...">
    <meta name="keywords" content="chatter, chat app, messaging, laravel">
    <meta name="robots" content="index, follow">

  <!-- <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> -->
  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" /> -->
  <!-- Scripts -->
  @routes
  @viteReactRefresh
  @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
  @inertiaHead
</head>

<body class="font-sans antialiased min-h-full overflow-hidden">
  @inertia
</body>

</html>