<!DOCTYPE html>

<html lang="{{ config('app.locale') }}">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $headTitle ?? 'Let\'s Do This!' }} | DoSomething.org</title>

    @include('partials.metadata')

    <link rel="preload" href="{{ elixir('vendors~app.js', 'next/assets') }}" as="script" />
    <link rel="preload" href="{{ elixir('app.js', 'next/assets') }}" as="script" />

    @include('partials.script_loading')

    <link rel="icon" type="image/ico" href="/favicon.ico?v1">
    <link rel="icon" sizes="144x144" href="/apple-touch-icon-precomposed.png">
    <link rel="stylesheet" href="{{ elixir('app.css', 'next/assets') }}" media="screen, projection" type="text/css">

    @include('partials.google_tag_manager_script')
    @include('partials.snowplow_script')
</head>

<body class="min-h-full">
    @if (has_staff_access() && isset($admin) && data_get($admin, 'page'))
        @include('partials.admin-dashboard')
    @endif

    @if (session('flash_message'))
        @include('partials.flash-message')
    @endif

    <div id="fb-root"></div>
    <div id="popover-portal" class="top-0 left-0 w-full block z-1000" role="presentation"></div>

    <div id="chrome" class="chrome min-h-screen w-full">
        @yield('content')
    </div>

    <div id="modal-portal" class="modal-portal" role="presentation"></div>

    @include('partials.customer_io_script')

    {{ isset($state) ? scriptify($state) : scriptify() }}
    {{ scriptify($env, 'ENV') }}
    {{ scriptify($auth, 'AUTH') }}

    @isset($homePage)
        {{ scriptify($homePage, 'HOMEPAGE') }}
    @endisset

    @stack('scripts')
</body>

</html>
