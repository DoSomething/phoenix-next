/* global window */
import { get } from 'lodash';

/**
 * Contains general constants for the application.
 */
export const MEDIA_MEDIUM_SIZE_MIN = 759;

export const PHOENIX_URL = window.location.origin;

export const PUCK_URL = get(window.ENV, 'PUCK_URL', null);

// Apollo GraphQL loading states:
export const NetworkStatus = {
  LOADING: 1,
  SET_VARIABLES: 2,
  FETCH_MORE: 3,
  REFETCH: 4,
  POLL: 6,
  READY: 7,
  ERROR: 8,
};

// Register CTA copy for specific page categories:
export const REGISTER_CTA_COPY = {
  facts: {
    title: 'Learn Something...Then Do Something!',
    content:
      'Sign up for DoSomething.org. You can make an impact with millions of young people and earn easy scholarships for volunteering!',
    buttonText: 'Join us',
  },
  articles: {
    title: 'Join DoSomething Today!',
    content:
      'Make an impact with millions of young people, and earn easy scholarships for volunteering.',
    buttonText: 'Join us',
  },
};

// Signup Button text for scholarship referrals:
export const SCHOLARSHIP_SIGNUP_BUTTON_TEXT = 'Apply Now!';
