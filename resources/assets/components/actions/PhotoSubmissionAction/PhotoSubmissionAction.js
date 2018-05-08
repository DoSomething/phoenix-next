import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { camelCase, get, has } from 'lodash';

import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import MediaUploader from '../../utilities/MediaUploader';
import FormValidation from '../../utilities/Form/FormValidation';
import { getFieldErrors, setFormData } from '../../../helpers/forms';

class PhotoSubmissionAction extends React.Component {
  constructor(props) {
    super(props);

    this.defaultFileState = {
      file: null,
      filePreviewUrl: null,
    };

    this.state = {
      textValue: '',
      fileValue: this.defaultFileState,
      quantityValue: '',
      showModal: false,
      whyParticipatedValue: '',
    };
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
  }

  handleChange = event => {
    this.setState({
      [`${camelCase(event.target.name)}Value`]: event.target.value,
    });
  };

  handleFileUpload = media => {
    this.setState({
      fileValue: media,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.clearPostSubmissionItem(this.props.id);

    const type = 'photo';

    const action = get(this.props.additionalContent, 'action', 'default');

    const formData = setFormData(
      {
        action,
        type,
        id: this.props.id,
        file: this.state.fileValue.file || '',
        text: this.state.textValue,
        quantity: this.state.quantityValue,
        why_participated: this.state.whyParticipatedValue,
      },
      this.props,
    );

    // Send request to store the campaign photo submission post.
    this.props.storeCampaignPost(this.props.campaignId, {
      action,
      body: formData,
      id: this.props.id,
      type,
    });
  };

  resetForm = () => {
    this.setState({
      textValue: '',
      fileValue: this.defaultFileState,
      quantityValue: '',
      whyParticipatedValue: '',
    });
  };

  render() {
    const formResponse = this.props.submissions.items[this.props.id] || null;

    const errors = getFieldErrors(formResponse);

    return (
      <React.Fragment>
        <Card
          className={classnames(
            'bordered rounded photo-submission-action',
            this.props.className,
          )}
          title={this.props.title}
        >
          {formResponse ? <FormValidation response={formResponse} /> : null}

          <form onSubmit={this.handleSubmit}>
            <div className="wrapper">
              <div className="form-section">
                <div className="form-item-group padding-md">
                  <MediaUploader
                    label="Add your photo here"
                    media={this.state.fileValue}
                    onChange={this.handleFileUpload}
                    hasError={has(errors, 'file')}
                  />

                  <div className="form-item">
                    <label
                      className={classnames('field-label', {
                        'has-error': has(errors, 'text'),
                      })}
                      htmlFor="text"
                    >
                      {this.props.captionFieldLabel}
                    </label>
                    <input
                      className={classnames('text-field', {
                        'has-error shake': has(errors, 'text'),
                      })}
                      type="text"
                      id="text"
                      name="text"
                      placeholder={this.props.captionFieldPlaceholder}
                      value={this.state.textValue}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-item-group padding-md">
                  <div className="form-item">
                    <label
                      className={classnames('field-label', {
                        'has-error': has(errors, 'quantity'),
                      })}
                      htmlFor="quantity"
                    >
                      {this.props.quantityFieldLabel}
                    </label>
                    <input
                      className={classnames('text-field', {
                        'has-error shake': has(errors, 'quantity'),
                      })}
                      type="text"
                      id="quantity"
                      name="quantity"
                      placeholder={this.props.quantityFieldPlaceholder}
                      value={this.state.quantityValue}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-item">
                    <label
                      className={classnames('field-label', {
                        'has-error': has(errors, 'why_participated'),
                      })}
                      htmlFor="why_participated"
                    >
                      {this.props.whyParticipatedFieldLabel}
                    </label>
                    <textarea
                      className={classnames('text-field', {
                        'has-error shake': has(errors, 'why_participated'),
                      })}
                      id="why_participated"
                      name="why_participated"
                      placeholder={this.props.whyParticipatedFieldPlaceholder}
                      value={this.state.whyParticipatedValue}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              loading={this.props.submissions.isPending}
              attached
            >
              {this.props.buttonText}
            </Button>
          </form>
        </Card>

        {this.state.showModal ? <Modal /> : null}
      </React.Fragment>
    );
  }
}

PhotoSubmissionAction.propTypes = {
  additionalContent: PropTypes.shape({
    action: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  captionFieldLabel: PropTypes.string,
  captionFieldPlaceholder: PropTypes.string,
  className: PropTypes.string,
  clearPostSubmissionItem: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  quantityFieldLabel: PropTypes.string,
  quantityFieldPlaceholder: PropTypes.string,
  storeCampaignPost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    isPending: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  title: PropTypes.string,
  whyParticipatedFieldLabel: PropTypes.string,
  whyParticipatedFieldPlaceholder: PropTypes.string,
};

PhotoSubmissionAction.defaultProps = {
  additionalContent: null,
  buttonText: 'Submit a new photo',
  captionFieldLabel: 'Add a caption to your photo.',
  captionFieldPlaceholder: '60 characters or less',
  className: null,
  quantityFieldLabel: 'How many items are in this photo?',
  quantityFieldPlaceholder: 'Quantity # (300)',
  title: 'Submit your photo',
  whyParticipatedFieldLabel: 'Why is this campaign important to you?',
  whyParticipatedFieldPlaceholder:
    "No need to write an essay, but we'd love to see why this matters to you!",
};

export default PhotoSubmissionAction;
