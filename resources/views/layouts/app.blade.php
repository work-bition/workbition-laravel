<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

  <head>
    <title>@yield('title', '优拾课堂 · 办公与数字生活指南')</title>
    <link rel="stylesheet" href="{{ mix('css/main.css') }}">

    @yield('styles')

    <meta charset="utf-8">
    <meta name="description" content="@yield('description', '办公与数字生活指南')" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0,viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Start favicon in different devices -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
    <link rel="shortcut icon" type="image/x-icon" href="/favicons/favicon.ico">
    <link rel="manifest" href="/favicons/site.webmanifest">
    <meta name="msapplication-TileColor" content="#2b5797">
    <meta name="theme-color" content="#ffffff">
    <!-- End -->
  </head>

  <body class="{{ route_class() }}-page">

    @include('layouts._account-modal')

    @include('layouts._main-sidebar')

    <div class="pusher">

          @include('layouts._header')

          @include('layouts._main-navigation')

          <div id="main_content">

              @include('shared._messages')

              @yield('content')

          </div>

          @include('layouts._footer')

    </div>

    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/main.js') }}"></script>

    @yield('scripts')

  </body>

</html>
