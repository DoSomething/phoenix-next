/* global window, alert */
/* eslint-disable no-alert */

import React from 'react';
import PropTypes from 'prop-types';

const CampaignDashboard = props => {
  const {
    campaignId,
    clickedShowAffirmation,
    clickedRemoveSignUp,
    hasReferralRB,
    signupCreated,
    isAdmin,
    isSignedUp,
  } = props;

  const onSignUpClick = () =>
    !isSignedUp ? signupCreated(campaignId) : clickedRemoveSignUp(campaignId);

  const onReferralExportClick = () => {
    const message =
      'Please confirm your intent to export this data. This will permanently mark the records as already exported and cannot be undone.';
    if (window.confirm(message)) {
      const downloadSizeMessage =
        'Please note: the max export size is 150 records at a time, so if your exported file contains that amount of rows, you may need to repeat the download to receive the rest of the records';
      alert(downloadSizeMessage);
      window.location.href = '/next/referrals/export';
    }
  };

  return (
    <div>
      <button
        type="button"
        className="button -secondary margin-md"
        onClick={clickedShowAffirmation}
      >
        Show Affirmation
      </button>
      <button
        type="button"
        className="button -secondary margin-md"
        onClick={onSignUpClick}
      >
        {`Mock ${isSignedUp ? 'Un-sign Up' : 'Sign Up'}`}
      </button>
      {hasReferralRB && isAdmin ? (
        <button
          type="button"
          className="button -secondary margin-md"
          onClick={onReferralExportClick}
        >
          Download Referrals CSV Export
        </button>
      ) : null}
    </div>
  );
};

CampaignDashboard.propTypes = {
  campaignId: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  clickedShowAffirmation: PropTypes.func.isRequired,
  clickedRemoveSignUp: PropTypes.func.isRequired,
  signupCreated: PropTypes.func.isRequired,
  hasReferralRB: PropTypes.bool.isRequired,
};

export default CampaignDashboard;
