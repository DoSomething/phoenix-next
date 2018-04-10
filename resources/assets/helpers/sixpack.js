/* global window */

import client from 'sixpack-client';
import experiments from '../experiments.json';

export function sixpack() {
  const env = window.ENV || {};

  if (!env.SIXPACK_BASE_URL) {
    throw new Error('Missing Sixpack configuration settings.');
  }

  return new client.Session({
    base_url: env.SIXPACK_BASE_URL,
    cookie_name: env.SIXPACK_COOKIE_PREFIX || 'sixpack',
  });
}

/**
 * Check if experiment should be converted when user expresses Signup intent.
 *
 * @param  {String} name
 * @return {Boolean}
 */
export function convertOnSignupIntent(name) {
  return experiments[name].meta.convertOnSignupIntent;
}

/**
 * Participate current client to specified experiment.
 *
 * @param  {String} name
 * @return {Promise}
 */
export function participate(name) {
  return new Promise((resolve, reject) => {
    const alternatives = Object.values(experiments[name].alternatives);
    const trafficFraction = experiments[name].trafficFraction;

    sixpack().participate(
      name,
      alternatives,
      trafficFraction,
      (error, response) => {
        if (error) {
          reject(error);
        }

        resolve(response.alternative.name);
      },
    );
  });
}

/**
 * Convert current client on specified experiment.
 *
 * @param  {String} name
 * @return {Promise}
 */
export function convert(name) {
  return new Promise((resolve, reject) => {
    sixpack().convert(name, (error, response) => {
      console.groupCollapsed(
        '%c Sixpack: %c Triggered event "%s"',
        'background-color: #e2ccff; display: block; font-weight: bold; line-height: 1.5;',
        'background-color: transparent; font-weight: normal; line-height: 1.5;',
      );
      console.log('Error:', error);
      console.log('Response:', response);
      console.groupEnd();

      if (error) {
        reject(error);
      }

      resolve(response);
    });
  });
}
