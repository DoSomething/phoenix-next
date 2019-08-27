@extends('layouts.master')

@section('content')
    <div class="chrome -plain">
        <div class="wrapper">
            <section class="container -framed">
                <article class="card rounded bordered">
                    <header class="card__title"><h1>Not Found</h1></header>
                    <div class="markdown with-lists padded">
                        <p>
                            <strong>We searched our site, but couldn't find what you were looking for.</strong>
                            Find ways you can <a href="{{ url('https://www.dosomething.org/us/campaigns') }}">Take Action</a>
                            and join a movement of 5 million young people making an impact in their communities.
                        </p>
                        <p>
                            You can also try <a href="{{ url('/') }}">our homepage</a> or
                            <a href="https://www.dosomething.org/us">
                            reach out</a> to us.
                        </p>
                    </div>
                </article>
            </section>
        </div>
    </div>
@stop
