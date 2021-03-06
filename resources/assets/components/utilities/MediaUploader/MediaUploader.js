/* global URL, Blob */

import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from '@emotion/core';
import React, { useState } from 'react';

import { report } from '../../../helpers/monitoring';
import plusSign from '../../../images/plus_sign.svg';

const MediaUploader = ({ label, onChange, hasError, media }) => {
  const [internalError, setInternalError] = useState(null);

  const supportedFileTypes = ['image/png', 'image/jpeg'];

  const readFile = file => {
    try {
      if (!supportedFileTypes.includes(file.type)) {
        throw new Error('Unsupported file type.');
      }

      const MEGABYTE_IN_BYTES = 1000000;
      if (file.size > 10 * MEGABYTE_IN_BYTES) {
        throw new Error('File must be no larger than 10MB.');
      }

      onChange({
        file,
        filePreviewUrl: URL.createObjectURL(file),
      });
    } catch (error) {
      report(error);

      setInternalError(error.message);

      onChange({
        file: null,
        filePreviewUrl: null,
      });
    }
  };

  const handleChange = event => {
    event.preventDefault();

    setInternalError(null);

    const file = event.target.files[0];

    return file ? readFile(file) : null;
  };

  const { filePreviewUrl } = media;

  return (
    <label
      data-testid="media-uploader"
      htmlFor="media-uploader"
      className={classnames(
        'cursor-pointer block h-0 overflow-hidden relative bg-gray-200 text-gray-600 my-auto w-full hover:bg-gray-300 focus:bg-gray-300',
        {
          'border border-solid border-red-500 shake': hasError || internalError,
        },
      )}
      css={css`
        padding-bottom: 100%;
      `}
    >
      <div
        className={classnames(
          'items-center flex h-full justify-center left-0 absolute top-0 w-full align-middle',
          {
            'bg-gray-100': filePreviewUrl,
            'flex-col': !filePreviewUrl,
          },
        )}
      >
        {filePreviewUrl ? (
          <img
            data-testid="media-uploader-file-preview"
            src={filePreviewUrl}
            alt="uploaded file"
            className="max-h-full"
          />
        ) : (
          <>
            <img src={plusSign} alt="plus symbol" className="mb-2" />

            <span
              className="underline font-semibold leading-normal text-center"
              css={css`
                max-width: 170px;
              `}
            >
              {label}
            </span>
            <p className="text-gray-600 pt-2 italic">{'must be <10MB'}</p>

            {internalError ? (
              <p
                data-testid="media-uploader-error"
                className="text-red-300 p-3 mt-0"
              >
                {internalError}
              </p>
            ) : null}
          </>
        )}
      </div>

      <input
        data-testid="media-uploader-input"
        className="w-0"
        type="file"
        id="media-uploader"
        name="media-uploader"
        onChange={handleChange}
        required
        accept={supportedFileTypes.join(', ')}
        onInvalid={event => {
          if (!event.target.value) {
            setInternalError('Please add a photo.');
          }
        }}
      />
    </label>
  );
};

MediaUploader.propTypes = {
  hasError: PropTypes.bool,
  label: PropTypes.string,
  media: PropTypes.shape({
    file: PropTypes.instanceOf(Blob),
    filePreviewUrl: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

MediaUploader.defaultProps = {
  hasError: false,
  label: 'Upload Media',
  media: {
    file: null,
    filePreviewUrl: null,
  },
};

export default MediaUploader;
