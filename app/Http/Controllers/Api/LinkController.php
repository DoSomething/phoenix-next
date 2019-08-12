<?php

namespace App\Http\Controllers\Api;

use App\Services\Bertly;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LinkController extends Controller
{
    /**
     * LinkController constructor.
     *
     * @param Bertly $bertly
     */
    public function __construct(Bertly $bertly)
    {
        $this->bertly = $bertly;

        $this->middleware('auth:api');
    }

    /**
     * Store a new shortened link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'url' => 'required|url',
        ]);

        // Only allow users to create short-links for
        // whitelisted "safe" sites:
        $whitelist = [
//            'phoenix.test',
            'www.dosomething.org',
            'vote.dosomething.org',
            'www.dosomething.vote',
            'dosomething.turbovote.com',
        ];

        $url = $request->input('url');
        $host = parse_url($url, PHP_URL_HOST);
        if (! in_array($host, $whitelist)) {
            return ['url' => $url, 'count' => '0'];
        }

        return $this->bertly->shorten($url);
    }
}
