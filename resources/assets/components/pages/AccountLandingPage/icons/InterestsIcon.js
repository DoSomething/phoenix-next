import React from 'react';
import PropTypes from 'prop-types';

const InterestsIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 800"
    className={className}
    width="50"
    height="50"
  >
    <g fill="currentColor">
      <path d="M462.09,314.78a121.14,121.14,0,0,0-114.93,11.45C335,334.41,325,344.6,315.36,354.46l-.83.85a206.34,206.34,0,0,0-19.3-19.77,122.3,122.3,0,0,0-175.35,15.6C90.7,387.68,91.77,429.22,96.66,465c5.58,40.74,25,76.71,57.87,106.93,34.89,32.11,70.77,64.2,105.46,95.24,14.51,13,29.52,26.4,44.23,39.63a15.5,15.5,0,0,0,20.72,0l19.11-17.14c13.77-12.34,28-25.1,41.93-37.72,9.45-8.57,19.18-17.21,28.58-25.57,23.06-20.5,46.91-41.7,69.27-63.95C527,519.52,543.79,464,532.36,402A117.53,117.53,0,0,0,462.09,314.78Zm37.09,164.55C492.55,502,480,522.52,462,540.48c-21.75,21.64-45.26,42.54-68,62.76-9.46,8.41-19.24,17.1-28.8,25.76-13.87,12.57-28.07,25.3-41.81,37.61l-8.78,7.87c-11.36-10.19-22.78-20.42-33.92-30.38-34.61-31-70.41-63-105.13-94.94-27.77-25.56-43.52-54.45-48.15-88.32-4.21-30.78-5.09-63,16.72-90.36A89.69,89.69,0,0,1,206.66,337q4.31-.39,8.57-.39a90.38,90.38,0,0,1,59.67,22.33c6.79,5.91,13,13.05,19.08,20,2.77,3.17,5.64,6.44,8.46,9.49a15.51,15.51,0,0,0,22,.76c4.51-4.23,8.88-8.68,13.1-13,9-9.16,17.44-17.8,27-24.22a90.23,90.23,0,0,1,85.6-8.58,85.47,85.47,0,0,1,51.8,64.29C506.57,433.12,505.66,457.24,499.18,479.33Z" />
      <path d="M704,146.65a70,70,0,0,0-41.87-51.87,71.86,71.86,0,0,0-68.16,6.85,93.54,93.54,0,0,0-13.15,11.05c-1.8-1.86-3.72-3.73-5.78-5.52a72.5,72.5,0,0,0-104,9.39c-17.35,21.77-16.5,46.86-13.83,66.29,3.24,23.45,14.41,44.09,33.22,61.37s37.84,34.26,56.39,50.81q11.84,10.56,23.64,21.13a15.49,15.49,0,0,0,20.72,0l10.12-9.1c7.37-6.62,15-13.47,22.45-20.24,5-4.56,10.19-9.17,15.19-13.62,12.37-11,25.15-22.41,37.22-34.44C700.93,214,710.55,182.19,704,146.65Z" />
    </g>
  </svg>
);

InterestsIcon.propTypes = {
  className: PropTypes.string,
};

InterestsIcon.defaultProps = {
  className: null,
};

export default InterestsIcon;
