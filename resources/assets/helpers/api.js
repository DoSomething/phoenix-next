/* global window */

import { RestApiClient } from '@dosomething/gateway';

import { PHOENIX_URL } from '../constants';

/**
 * Set properties for request headers object.
 *
 * @param  {Object} options
 * @return {Object}
 */
export function setRequestHeaders(options = {}) {
  const headers = {};

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`; // eslint-disable-line dot-notation
  }

  headers['Content-Type'] = options.contentType
    ? options.contentType
    : 'application/json';

  return headers;
}

/**
 * Send a GET request.
 *
 * @param  {String} url
 * @param  {Object} query
 * @return {Object}
 */
export function getRequest(url, query) {
  const client = new RestApiClient(
    PHOENIX_URL,
    setRequestHeaders({ token: window.AUTH.token }),
  );

  return client.get(url, query);
}

/**
 * Send a POST request.
 *
 * @param  {String} url
 * @param  {Object} query
 * @param  {String} token
 * @return {Object}
 */
export function postRequest(url, query, token) {
  const client = new RestApiClient(PHOENIX_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return client.post(url, query);
}

/**
 * Get campaign signups for a user.
 *
 * @param  {String} userId
 * @param  {String} campaignId
 * @param  {String|Null} campaignRunId
 * @return {Object}
 */
export function getUserCampaignSignups(
  userId,
  campaignId,
  campaignRunId = null,
) {
  return getRequest(
    `${window.location.origin}/api/v2/campaigns/${campaignId}/signups`,
    {
      filter: {
        northstar_id: userId,
        campaign_run_id: campaignRunId,
      },
    },
  );
}
