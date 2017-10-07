<?php

namespace App\Services;

use Log;
use DoSomething\Gateway\Common\RestApiClient;

class Rogue extends RestApiClient
{
    // use AuthorizesWithDrupal;

    /**
     * Mintues to retain data in cache.
     *
     * @var \DateTime|float|int
     */
    private $cacheExpiration = 30;

    /**
     * Rogue constructor.
     */
    public function __construct()
    {
        $base_url = config('services.rogue.url');

        parent::__construct($base_url . '/api/');
    }

    /**
     * Get an index of (optionally filtered) campaign signups from Phoenix.
     * @see: https://github.com/DoSomething/phoenix/wiki/API#retrieve-a-signup-collection
     *
     * @param array $query - query string, for filtering results
     * @return array - JSON response
     */
    public function getAllSignups(array $query = [])
    {
        // $path = 'v1/signups';

        // return $this->get($path, $query);
    }

    /**
     * Get a cached index of (optionally filtered) campaign signups from Phoenix.
     * @see: https://github.com/DoSomething/phoenix/wiki/API#retrieve-a-signup-collection
     *
     * @param array $query - query string, for filtering results
     * @return array - JSON response
     */
    public function getAllSignupsCached(array $query = [])
    {
        // $path = 'v1/signups';

        // // Use a lower expiration on this.
        // $customCacheExpiration = 10;
        // $cacheKey = 'legacy-' . $path . '-' . implode($query);

        // return remember(make_cache_key($cacheKey), $customCacheExpiration, function () use ($path, $query) {
        //     return $this->get($path, $query);
        // });
    }

    /**
     * Get details for a particular campaign signup from Phoenix.
     * @see: https://github.com/DoSomething/phoenix/wiki/API#retrieve-a-specific-signup
     *
     * @return array - JSON response
     */
    public function getSignup($signup_id)
    {
        // $path = 'v1/signups/'.$signup_id;

        // return remember(make_cache_key('legacy-'.$path), $this->cacheExpiration, function () use ($path) {
        //     return $this->get($path);
        // });
    }

    /**
     * Store a new campaign signup in Rogue
     * @see: https://github.com/DoSomething/rogue/blob/master/documentation/endpoints/signups.md#signups
     *
     * @param string $user_id - Northstar ID of user
     * @param string $campaign_id - NID of campaign on the Drupal site
     * @param string $source - Sign up source (e.g. web, iPhone, etc.)
     * @param string $details - Details to be added to the signup
     *
     * @return string - Signup ID
     */
    public function storeSignup($userId, $legacyCampaignId, $legacyCampaignRunId, $source, $details = NULL )
    {
        Log::info('Signing up for: ', ['legacyCampaignId' => $legacyCampaignId, 'legacyCampaignRunId' => $legacyCampaignRunId]);

        $response = $this->post('v2/signups', [
            'northstar_id' => $userId,
            'campaign_id' => $legacyCampaignId,
            'campaign_run_id' => $legacyCampaignRunId,
            'source' => $source,
            'details' => $details,
        ]);

        return $response;
    }
}
