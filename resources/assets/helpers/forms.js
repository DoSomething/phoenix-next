/* global FormData */

import { get } from 'lodash';

/**
 * Get the status error/success message for a form response.
 *
 * @param  {Object} response
 * @return {String}
 */
export function getStatusMessage(response) {
  const status = response.status.error || response.status.success;

  return status.message;
}

/**
 * Get the errors for all fields in a form response.
 *
 * @param  {Object} response
 * @return {Object|null}
 */
export function getFieldErrors(response) {
  return get(response, 'status.error.fields', null);
}

/**
 * Get all the error messages for each field in a form response.
 *
 * @param  {Object} response
 * @return {Array|null}
 */
export function getFieldErrorMessages(response) {
  const errorFields = getFieldErrors(response);

  if (!errorFields) {
    return null;
  }

  const messages = [];

  // Collect all error messages for every field
  Object.keys(errorFields).map(field =>
    errorFields[field].map(message => messages.push(message)),
  );

  return messages;
}

/**
 * Set form data for the provided values.
 *
 * @param {Object} values
 * @param {Object} props
 */
export function setFormData(values, props = {}) {
  const formData = new FormData();

  Object.keys(values).map(key => formData.append(key, values[key]));

  // Append additional campaign details.
  if (props.legacyCampaignId && props.legacyCampaignRunId) {
    formData.append(
      'details',
      JSON.stringify({
        campaign_id: props.campaignId,
        legacy_campaign_id: props.legacyCampaignId,
        legacy_campaign_run_id: props.legacyCampaignRunId,
      }),
    );
  }

  return formData;
}
