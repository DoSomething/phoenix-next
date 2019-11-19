import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Enclosure from '../../../Enclosure';
import TextContent from '../../../utilities/TextContent/TextContent';
import { SCHOLARSHIP_SIGNUP_BUTTON_TEXT } from '../../../../constants';
import SignupButtonContainer from '../../../SignupButton/SignupButtonContainer';
import AffiliatePromotion from '../../../utilities/AffiliatePromotion/AffiliatePromotion';
import CampaignInfoBlock from '../../../blocks/CampaignInfoBlock/CampaignInfoBlock';
import AffiliateOptInToggleContainer from '../../../AffiliateOptInToggle/AffiliateOptInToggleContainer';
import AffiliateScholarshipBlockQuery from '../../../blocks/AffiliateScholarshipBlock/AffiliateScholarshipBlockQuery';
import {
  contentfulImageUrl,
  isScholarshipAffiliateReferral,
  getScholarshipAffiliateLabel,
} from '../../../../helpers';

const MarqueeTemplate = ({
  additionalContent,
  affiliateCreditText,
  affiliateSponsors,
  affiliateOptInContent,
  campaignId,
  content,
  coverImage,
  isAffiliated,
  scholarshipAmount,
  scholarshipDeadline,
  subtitle,
  title,
}) => {
  const numCampaignId = Number(campaignId);
  // @TODO: If this experiment is successful we should turn generating the series urls for
  // the cover image photo at different sizes into a helper function!
  const coverImageUrls = {
    extraLarge: contentfulImageUrl(coverImage.url, '2232', '1000', 'fill'),
    large: contentfulImageUrl(coverImage.url, '1116', '500', 'fill'),
    medium: contentfulImageUrl(coverImage.url, '720', '350', 'fill'),
    small: contentfulImageUrl(coverImage.url, '360', '200', 'fill'),
  };
  const scholarshipAffiliateLabel = getScholarshipAffiliateLabel();
  const displayAffiliateScholarshipBlock =
    scholarshipAffiliateLabel && scholarshipAmount && scholarshipDeadline;
  return (
    <React.Fragment>
      <article className="marquee-landing-page">
        <div className="base-12-grid bg-white cover-image">
          <img
            className="grid-wide"
            alt={coverImage.description || `cover photo for ${title}`}
            srcSet={`${coverImageUrls.small} 360w, ${coverImageUrls.medium} 720w, ${coverImageUrls.large} 1440w, ${coverImageUrls.extraLarge} 2880w`}
            src={coverImageUrls.small}
          />
        </div>

        <div className="clearfix bg-white">
          <Enclosure className="base-12-grid">
            <header role="banner" className="marquee-banner">
              <h1 className="marquee-banner__headline-title">{title}</h1>
              <h2 className="marquee-banner__headline-subtitle">{subtitle}</h2>
            </header>

            <div className="grid-wide-7/10 primary">
              <TextContent>{content}</TextContent>
            </div>

            <div className="grid-wide-3/10 secondary">
              <div className="marquee-signup-button">
                {isAffiliated ? null : (
                  <SignupButtonContainer
                    className="w-full"
                    text={
                      isScholarshipAffiliateReferral()
                        ? SCHOLARSHIP_SIGNUP_BUTTON_TEXT
                        : undefined
                    }
                  />
                )}
                {isAffiliated === false && affiliateOptInContent ? (
                  <AffiliateOptInToggleContainer
                    affiliateOptInContent={affiliateOptInContent}
                  />
                ) : null}
              </div>

              {displayAffiliateScholarshipBlock ? (
                <AffiliateScholarshipBlockQuery
                  campaignId={numCampaignId}
                  utmLabel={scholarshipAffiliateLabel.toLowerCase()}
                  scholarshipAmount={scholarshipAmount}
                  scholarshipDeadline={scholarshipDeadline}
                  isScholarshipBeta
                />
              ) : (
                <CampaignInfoBlock
                  campaignId={numCampaignId}
                  scholarshipAmount={scholarshipAmount}
                />
              )}

              {affiliateSponsors.length ? (
                <AffiliatePromotion
                  className="margin-top-md"
                  imgUrl={
                    get(
                      additionalContent,
                      'campaignSponsorLogoAlternativeUrl',
                      null,
                    ) || affiliateSponsors[0].fields.logo.url
                  }
                  text={affiliateCreditText}
                  textClassName="text-gray-400"
                  title={affiliateSponsors[0].fields.logo.title}
                />
              ) : null}
            </div>
          </Enclosure>
        </div>
      </article>
    </React.Fragment>
  );
};

MarqueeTemplate.propTypes = {
  additionalContent: PropTypes.object,
  affiliateCreditText: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliateOptInContent: PropTypes.object,
  campaignId: PropTypes.string,
  content: PropTypes.string,
  coverImage: PropTypes.object.isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

MarqueeTemplate.defaultProps = {
  additionalContent: null,
  affiliateCreditText: undefined,
  affiliateSponsors: [],
  content: 'Hello World',
  affiliateOptInContent: null,
  campaignId: null,
  scholarshipAmount: null,
  scholarshipDeadline: null,
};

export default MarqueeTemplate;
