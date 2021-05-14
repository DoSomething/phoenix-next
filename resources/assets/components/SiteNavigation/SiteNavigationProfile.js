import Media from 'react-media';
import { css } from '@emotion/core';
import classNames from 'classnames';
import React, { useState } from 'react';

import { tailwind } from '../../helpers/display';
import MenuCarat from '../artifacts/MenuCarat/MenuCarat';
import ProfileIcon from '../artifacts/ProfileIcon/ProfileIcon';
import { isAuthenticated, buildAuthRedirectUrl } from '../../helpers/auth';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
  getPageContext,
} from '../../helpers/analytics';

const dropdownList = [
  { copy: 'My Campaigns', slug: 'campaigns' },
  { copy: 'My Rewards', slug: 'rewards' },
  { copy: 'Volunteer Credits', slug: 'credits' },
  { copy: 'Refer A Friend', slug: 'refer-friends' },
  { copy: 'My Interests', slug: 'interests' },
  { copy: 'My Subscriptions', slug: 'subscriptions' },
  { copy: 'My Profile', slug: '' },
];

const DropdownMenu = () => (
  <div
    className={classNames(
      'bg-white absolute border-l border-solid border-gray-300 w-48 right-0',
      { 'border-r': !isAuthenticated() },
    )}
    css={css`
      top: ${isAuthenticated() ? '75' : '53'}px;
      ${!isAuthenticated() ? 'right: -1px;' : ''}
    `}
    data-testid="profile-dropdown"
  >
    {/* Top partial-border for dropdown. */}
    <span
      className="absolute top-0 left-0 border-t border-solid border-gray-300"
      css={css`
        width: ${isAuthenticated() ? '72' : '87'}px;
      `}
    />

    <ul className="px-6 py-4">
      {dropdownList.map(({ copy, slug }) => (
        <li key={slug}>
          <a
            data-testid="profile-dropdown-link"
            className="block py-2 text-black no-underline hover:text-black hover:underline"
            href={`/us/account/${slug}`}
            css={css`
              :hover {
                text-decoration-color: ${tailwind('colors.black')};
              }
            `}
          >
            {copy}
          </a>
        </li>
      ))}

      {!isAuthenticated() ? (
        <li>
          <a
            data-testid="profile-dropdown-link"
            className="block py-2 text-black no-underline hover:text-black hover:underline"
            href={buildAuthRedirectUrl({ mode: 'login' })}
            css={css`
              :hover {
                text-decoration-color: ${tailwind('colors.black')};
              }
            `}
          >
            Log In
          </a>
        </li>
      ) : null}
    </ul>
  </div>
);

const SiteNavigationProfile = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return isAuthenticated() ? (
    <>
      <li
        className="utility-nav__account-profile menu-nav__item flex"
        onMouseEnter={() => setIsDropdownActive(true)}
        onMouseLeave={() => setIsDropdownActive(false)}
        data-testid="account-profile-nav"
      >
        <a
          id="utility-nav__account-profile"
          href="/us/account"
          className="utility-nav__account-profile-icon"
          onClick={() =>
            trackAnalyticsEvent('clicked_nav_link_profile', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'profile',
              context: getPageContext(),
            })
          }
        >
          <ProfileIcon />
        </a>

        <Media query={{ minWidth: tailwind('screens.lg') }}>
          <>
            <MenuCarat flipped={isDropdownActive} className="cursor-pointer" />

            {isDropdownActive ? <DropdownMenu /> : null}
          </>
        </Media>
      </li>
    </>
  ) : (
    <>
      <li
        className={classNames(
          'utility-nav__auth menu-nav__item flex lg:pr-3 lg:mr-1 relative',
          { 'border-r border-solid border-gray-300': isDropdownActive },
        )}
        onMouseEnter={() => setIsDropdownActive(true)}
        onMouseLeave={() => setIsDropdownActive(false)}
        data-testid="login-nav"
      >
        <a
          id="utility-nav__auth"
          href={buildAuthRedirectUrl({ mode: 'login' })}
          onClick={() =>
            trackAnalyticsEvent('clicked_nav_link_log_in', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'log_in',
              context: getPageContext(),
            })
          }
          // Prevent the log-in link from shifting when we activate the right hand border for the dropdown.
          css={css`
            ${isDropdownActive ? 'margin-right: -1px;' : ''}
          `}
        >
          Log In
        </a>

        <Media query={{ minWidth: tailwind('screens.lg') }}>
          <>
            <MenuCarat flipped={isDropdownActive} className="cursor-pointer" />

            {isDropdownActive ? <DropdownMenu /> : null}
          </>
        </Media>
      </li>

      <li className="utility-nav__join menu-nav__item">
        <a
          id="utility-nav__join"
          href={buildAuthRedirectUrl()}
          onClick={() =>
            trackAnalyticsEvent('clicked_nav_link_join_now', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'join_now',
              context: getPageContext(),
            })
          }
        >
          Join Now
        </a>
      </li>
    </>
  );
};

export default SiteNavigationProfile;
