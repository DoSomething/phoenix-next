/* global document */

import React from 'react';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import linkIcon from './linkIcon.svg';
import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import { postRequest } from '../../../helpers/api';
import TotalAcceptedQuantity from './TotalAcceptedQuantity';
import { appendToQuery, dynamicString, withoutTokens } from '../../../helpers';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

import './social-drive.scss';

export const SocialDriveBlockFragment = gql`
  fragment SocialDriveBlockFragment on SocialDriveBlock {
    link
  }
`;

class SocialDriveAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      longUrl: this.getLongUrl(),
      shortUrl: null,
    };

    this.linkInput = React.createRef();

    /**
     * Debounce the API request to shorten our long URL.
     * @see https://gist.github.com/simonw/c29de00c20fde731243cbac8568a3d7f
     */
    this.getShortUrl = debounce(this.getShortUrl, 300);
  }

  componentDidMount() {
    this.getShortUrl(this.state.longUrl);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.longUrl !== prevState.longUrl) {
      this.getShortUrl(this.state.longUrl);
    }
  }

  /**
   * Replaces any userId tokens, and appends query string if given.
   *
   * @param Object query
   * @return String
   */
  getLongUrl(query) {
    const result = dynamicString(this.props.link, {
      userId: this.props.userId,
    });

    return query ? appendToQuery(query, result).href : result;
  }

  /**
   * Executes API request to shorten given longUrl, and saves result to state.shortUrl.
   *
   * @param String longUrl
   */
  getShortUrl(longUrl) {
    this.setState({ loading: true });

    postRequest(
      '/api/v2/links',
      { url: withoutTokens(longUrl) },
      this.props.token,
    )
      .then(apiResponse =>
        this.setState({ loading: false, shortUrl: apiResponse.url }),
      )
      .catch(() =>
        this.setState({
          loading: false,
          // Fallback to the long URL if API request fails.
          shortUrl: longUrl,
        }),
      );
  }

  handleCopyLinkClick = () => {
    this.linkInput.current.select();

    document.execCommand('copy');

    trackAnalyticsEvent('clicked_copy_to_clipboard', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'copy_to_clipboard',
      context: {
        campaignId: this.props.campaignId,
        pageId: this.props.pageId,
        url: this.props.link,
      },
    });
  };

  render() {
    const {
      approvedPostCountActionId,
      approvedPostCountLabel,
      fullWidth,
      link,
      queryOptions,
      shareCardDescription,
      shareCardTitle,
      userId,
    } = this.props;

    const { loading, longUrl, shortUrl } = this.state;

    return (
      <div
        className={classNames('clearfix pb-6', {
          'lg:flex': approvedPostCountActionId !== null,
        })}
      >
        <div
          className={classNames('social-drive-action', {
            'lg:w-2/3 lg:pr-3': !fullWidth,
          })}
        >
          <Card className="rounded bordered" title={shareCardTitle}>
            {shareCardDescription ? (
              <div className="p-3">
                <p>{shareCardDescription}</p>
              </div>
            ) : null}

            {queryOptions
              ? React.cloneElement(queryOptions, {
                  onChange: queryStr =>
                    this.setState({
                      longUrl: this.getLongUrl(queryStr),
                    }),
                })
              : null}

            <div className="p-3">
              {queryOptions ? (
                <a
                  className="font-normal underline text-blurple-500"
                  href={longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preview your custom page
                </a>
              ) : (
                <Embed url={longUrl} />
              )}
            </div>

            <div className="p-3 link-area">
              {!queryOptions ? (
                <div className="share-text">
                  <p>Share your link:</p>
                </div>
              ) : null}

              <div className="link-bar">
                <input
                  readOnly
                  type="text"
                  ref={this.linkInput}
                  className="text-field link"
                  value={loading ? 'Loading...' : shortUrl}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="text-field link-copy-button"
                  onClick={this.handleCopyLinkClick}
                  disabled={loading}
                >
                  <img src={linkIcon} alt="link" />
                  <p>Copy link</p>
                </button>
              </div>
            </div>

            <SocialShareTray
              shareLink={shortUrl}
              trackLink={link}
              title={queryOptions ? null : 'Share on Social Media'}
              responsive
            />
          </Card>
        </div>

        {approvedPostCountActionId ? (
          <TotalAcceptedQuantity
            actionId={approvedPostCountActionId}
            label={approvedPostCountLabel}
            userId={userId}
          />
        ) : null}
      </div>
    );
  }
}

SocialDriveAction.propTypes = {
  approvedPostCountActionId: PropTypes.number,
  approvedPostCountLabel: PropTypes.string,
  campaignId: PropTypes.string,
  /**
   * This prop allows us to force the "main" block to fill the width of the container.
   * @see https://git.io/Jfnqy
   */
  fullWidth: PropTypes.bool,
  link: PropTypes.string.isRequired,
  pageId: PropTypes.string,
  /**
   * This prop expects a React component to allow user customization of link prop's query string.
   * @see /resources/assets/components/pages/VoterRegistrationDrivePage/Alpha/AlphaPage
   */
  queryOptions: PropTypes.element,
  shareCardDescription: PropTypes.string,
  shareCardTitle: PropTypes.string,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

SocialDriveAction.defaultProps = {
  approvedPostCountActionId: null,
  approvedPostCountLabel: null,
  campaignId: null,
  fullWidth: false,
  pageId: null,
  queryOptions: null,
  shareCardDescription: null,
  shareCardTitle: 'Your Online Drive',
};

export default SocialDriveAction;
