import {
  REQUESTED_FACEBOOK_SHARE,
  FACEBOOK_SHARE_COMPLETED,
  FACEBOOK_SHARE_CANCELLED,
} from '../actions';

// Action: present the user with the share dialog.
export function requestedFacebookShare() {
  return { type: REQUESTED_FACEBOOK_SHARE };
}

// Action: user sucessfully shared.
export function facebookShareCompleted() {
  return { type: FACEBOOK_SHARE_COMPLETED };
}

// Action: user closed the Facebook share dialog.
export function facebookShareCancelled() {
  return { type: FACEBOOK_SHARE_CANCELLED };
}
