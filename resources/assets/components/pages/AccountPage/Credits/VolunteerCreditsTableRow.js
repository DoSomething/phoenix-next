import React from 'react';
import tw from 'twin.macro';
import Media from 'react-media';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { tailwind } from '../../../../helpers';
import CampaignPreview from './CampaignPreview';

// A list-item displaying a Post detail and value.
const PostDetail = ({ detail, value }) => (
  <li className="my-2 xs:flex">
    <h4 className="m-0 font-bold text-gray-600 uppercase xs:w-1/2">{detail}</h4>
    <p className="xs:text-right xs:w-1/2">{value}</p>
  </li>
);

PostDetail.propTypes = {
  detail: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

// The certificate PDF Download button with pending/ready state.
const DownloadButton = ({ pending }) => (
  <button
    type="button"
    css={css`
      height: 65px;
    `}
    /* @TODO: Test out using the btn class here instead of the Forge class. */
    className={classNames('button w-full', { 'is-disabled': pending })}
  >
    {pending ? 'Pending' : 'Download'}
  </button>
);

DownloadButton.propTypes = {
  pending: PropTypes.bool,
};

DownloadButton.defaultProps = {
  pending: false,
};

const TableData = tw.td`align-middle p-4 pr-6`;

const VolunteerCreditsTableRow = ({
  campaignWebsite,
  actionLabel,
  dateCompleted,
  volunteerHours,
  pending,
}) => (
  <Media query={`(min-width: ${tailwind('screens.md')})`}>
    {matches =>
      matches ? (
        <>
          <TableData>
            <CampaignPreview campaignWebsite={campaignWebsite} />
          </TableData>
          <TableData>{actionLabel}</TableData>
          <TableData>{dateCompleted}</TableData>
          <TableData>{volunteerHours}</TableData>
          <TableData>
            <DownloadButton pending={pending} />
          </TableData>
        </>
      ) : (
        <TableData>
          <CampaignPreview campaignWebsite={campaignWebsite} />

          <ul className="py-5">
            <PostDetail detail="Action Type" value={actionLabel} />
            <PostDetail detail="Volunteer Hours" value={volunteerHours} />
            <PostDetail detail="Date Completed" value={dateCompleted} />
          </ul>

          <DownloadButton pending={pending} />
        </TableData>
      )
    }
  </Media>
);

VolunteerCreditsTableRow.propTypes = {
  actionLabel: PropTypes.string.isRequired,
  campaignWebsite: PropTypes.object.isRequired,
  dateCompleted: PropTypes.string.isRequired,
  volunteerHours: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
};

export default VolunteerCreditsTableRow;
