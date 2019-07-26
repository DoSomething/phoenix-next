<div id="admin-dashboard" class="admin-dashboard">
    <div class="wrapper base-12-grid">
        <h1 class="admin-dashboard-title grid-full font-normal uppercase text-base text-gray-400 margin-bottom-lg">
            <span>Admin Dashboard</span>
        </h1>

        <h2 class="font-normal grid-full margin-bottom-md text-gray-800 uppercase">{{ $admin['page']['type'] }} Settings &amp; Data</h2>

        <section class="panel grid-full-1/2 margin-bottom-lg">
            <div class="wrapper rounded bg-gray-400">
                <h1 class="panel-title font-normal text-m margin-bottom-md">
                    @include('svg.cog-icon', ['class' => 'icon icon-cog']) Configuration
                </h1>

                <ul class="list-reset">
                    <li class="margin-bottom-md">
                        @if ($admin['page']['type'] === 'Page Not Found')
                            <a class="icon-link font-normal" href="{{ $admin['page']['searchUrl'] }}" target="_blank">
                                @include('svg.search-icon', ['class' => 'icon icon-search']) Search for this page on Contentful
                            </a>
                        @else
                            <a class="icon-link font-normal" href="{{ $admin['page']['editUrl'] }}" target="_blank">
                                @include('svg.edit-pencil-icon', ['class' => 'icon icon-edit-pencil']) Edit this content on Contentful
                            </a>
                        @endif
                    </li>
                    <li class="margin-bottom-md">
                        <a class="icon-link font-normal" href="{{ $admin['page']['cacheUrl'] }}">
                            @include('svg.trash-icon', ['class' => 'icon icon-trash']) Clear the cache for this page
                        </a>
                    </li>
                </ul>
            </div>
        </section>

        <section class="panel grid-full-1/2">
            <div class="wrapper rounded bg-gray-400">
                <h1 class="panel-title font-normal text-m margin-bottom-md">
                    @include('svg.chart-bar-icon', ['class' => 'icon icon-chart-bar']) Metrics
                </h1>

                <p class="text-gray-600"><em>What's this? We're not sure yet, but let the tech team know if you have ideas!</em></p>
            </div>
        </section>
    </div>

    <a id="js-admin-dashboard-toggle" class="toggle">@include('svg.bug-icon', ['class' => 'icon icon-bug'])</a>
</div>
