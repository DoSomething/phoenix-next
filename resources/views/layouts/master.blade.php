<!DOCTYPE html>

<html lang="{{ config('app.locale') }}">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>DoSomething.org</title>

    <link rel="preload" href="{{ elixir('vendors~app.js', 'next/assets') }}" as="script" />
    <link rel="preload" href="{{ elixir('app.js', 'next/assets') }}" as="script" />

    @include('partials.script_loading')

    <link rel="icon" type="image/ico" href={{config('app.url') . "/favicon.ico?v1" }}>
    <link rel="stylesheet" href="{{ elixir('app.css', 'next/assets') }}" media="screen, projection" type="text/css">

    @if(isset($socialFields))
        @include('partials.social')
    @endif

    @if(config('services.analytics.google_tag_manager_id'))
        @include('partials.google_tag_manager_script')
    @endif

    @if(config('services.analytics.facebook_pixel_id'))
        @include('partials.facebook_pixel_script')
    @endif
</head>

<body>
    @if (session('flash_message'))
        <div class="{{session('flash_message')['class']}}">
            <em>{{ session('flash_message')['text'] }}</em>
        </div>
    @endif

    <div id="fb-root"></div>
    <div id="chrome" class="chrome">
        <div class="wrapper">
            @include('partials.navigation')
            @yield('content')
            @include('partials.footer')
        </div>
    </div>

    <div id="modal-portal" class="modal-portal" role="presentation"></div>

    @include('partials.analytics')
    {{ isset($state) ? scriptify($state) : scriptify() }}
    {{ scriptify($env, 'ENV') }}
    {{ scriptify($auth, 'AUTH') }}

    @stack('scripts')
</body>

</html>
