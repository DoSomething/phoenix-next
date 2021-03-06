<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReferralPageController extends Controller
{
    /**
     * Display the beta Referral page.
     *
     * @return \Illuminate\View\View
     */
    public function show(Request $request)
    {
        /**
         * Note: We avoid querying Northstar to display user's first name because the Cypress tests
         * for this page time out.
         * @see https://github.com/DoSomething/phoenix-next/pull/1932#issuecomment-587720454
         */
        $title = 'Do Something Good With Your Friend!';
        $incentiveSuffix = config('feature-flags.refer_friends_incentive') ? ' (You\'ll both enter for a chance to win a $10 gift card!)' : '';

        return response()->view('app', [
            'headTitle' => $title,
            // @TODO: Create an $entity object to pass to the get_metadata helper
            // (and refactor get_metadata helper to expect an $entity instead of $campaign)
            'metadata' => [
                'title' => $title,
                'description' => 'Make an impact by signing up for a DoSomething volunteer campaign.'.$incentiveSuffix,
                'facebook_app_id' =>  config('services.analytics.facebook_id'),
                'image' => [
                    'url' => asset('images/gift-card-hand.png'),
                    'width' => '1200',
                    'height' => '1200',
                ],
                'url' => $request->fullUrl(),
            ],
        ])->cacheableWhenAnonymous();
    }
}
