import React from 'react';
import PropTypes from 'prop-types';

import errorIcon from './errorIcon.svg';
import { report } from '../../../helpers';
import Card from '../../utilities/Card/Card';

const HELP_LINK = 'https://help.dosomething.org/hc/en-us/requests/new';
const DEBUGGING = process.env.NODE_ENV !== 'production';

const ErrorBlock = ({ error }) => {
  // Print error to console & report to New Relic:
  if (error) {
    console.error(`[ErrorBlock] ${error}`);
    report(error);
  }

  return (
    <Card className="rounded bordered p-3">
      <img src={errorIcon} alt="Error" className="mx-auto my-8" />
      <p className="text-center my-4">
        <strong>Something went wrong!</strong> Try refreshing the page or{' '}
        <a href={HELP_LINK}>reach out</a> to us.
      </p>
      {DEBUGGING && error ? (
        <p className="color-error text-center my-4">
          <code>{JSON.stringify(error)}</code>
        </p>
      ) : null}
    </Card>
  );
};

ErrorBlock.propTypes = {
  error: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
};

ErrorBlock.defaultProps = {
  error: null,
};

export default ErrorBlock;
