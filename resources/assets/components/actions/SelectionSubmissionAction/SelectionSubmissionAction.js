import React from 'react';
import gql from 'graphql-tag';
import { get, has } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Query } from 'react-apollo';

import PostForm from '../PostForm';
import Card from '../../utilities/Card/Card';
import { getUserId } from '../../../helpers/auth';
import Spinner from '../../artifacts/Spinner/Spinner';
import FormValidation from '../../utilities/Form/FormValidation';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import TextContent from '../../utilities/TextContent/TextContent';
import { formatPostPayload, getFieldErrors } from '../../../helpers/forms';

export const SelectionSubmissionBlockFragment = gql`
  fragment SelectionSubmissionBlockFragment on SelectionSubmissionBlock {
    actionId
    title
    richText
    selectionFieldLabel
    selectionOptions
    selectionPlaceholderOption
    buttonText
    postSubmissionLabel
  }
`;

const SELECTION_SUBMISSION_BLOCK_QUERY = gql`
  query SelectionSubmissionBlockQuery($userId: String!, $actionIds: [Int]!) {
    posts(userId: $userId, actionIds: $actionIds) {
      text
    }
  }
`;

class SelectionSubmissionAction extends PostForm {
  constructor(props) {
    super(props);

    this.state = {
      selection: this.props.selectionPlaceholderOption,
      submitted: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const response = nextProps.submissions.items[nextProps.id] || null;

    if (has(response, 'status.success')) {
      // Resetting the submission item so that this won't be triggered continually for further renders.
      nextProps.resetPostSubmissionItem(nextProps.id);

      return {
        submitted: true,
      };
    }

    return null;
  }

  // Is the current user selection one of the defined selection options?
  isSelectionValid = () =>
    this.props.selectionOptions.indexOf(this.state.selection) !== -1;

  handleChange = event => this.setState({ selection: event.target.value });

  handleSubmit = async event => {
    event.preventDefault();

    // Run a validation as an edge case measure (e.g. to prevent submitting custom data via dom manipulation).
    if (!this.isSelectionValid()) {
      return;
    }

    const { actionId, campaignId, id, pageId, storePost } = this.props;

    // Reset any straggling post submission data for this action.
    this.props.resetPostSubmissionItem(id);

    const type = 'text';

    // Trigger request to store the selection submission post.
    storePost({
      actionId,
      blockId: id,
      body: formatPostPayload({
        action_id: actionId,
        school_id: await this.getUserActionSchoolId(),
        text: this.state.selection,
        type,
      }),
      campaignId,
      pageId,
      type,
    });
  };

  render() {
    const {
      actionId,
      buttonText,
      id,
      title,
      richText,
      postSubmissionLabel,
      selectionFieldLabel,
      selectionPlaceholderOption,
      selectionOptions,
      submissions,
    } = this.props;

    const userId = getUserId();

    const submissionItem = submissions.items[id];

    const formResponse = has(submissionItem, 'status') ? submissionItem : null;

    const formErrors = getFieldErrors(formResponse);

    const isSelectionInvalid = !this.isSelectionValid();

    return (
      <Card
        className="selection-submission-action bordered rounded"
        title={title}
      >
        <div className="p-3">
          {formResponse ? <FormValidation response={formResponse} /> : null}

          <TextContent className="">{richText}</TextContent>

          <Query
            query={SELECTION_SUBMISSION_BLOCK_QUERY}
            variables={{ userId, actionIds: [actionId] }}
          >
            {({ loading, data }) => {
              if (loading) {
                return <Spinner className="flex justify-center p-3 pb-8" />;
              }

              const post = get(data, 'posts', [])[0];
              const selection = get(post, 'text');

              // If the user successfuly submitted the form, or a pre-existing submission is found,
              // display the post-submission state.
              if (selection || this.state.submitted) {
                return (
                  <div className="mt-3">
                    <p className="font-league-gothic leading-none text-4xl uppercase">
                      {selection || this.state.selection}
                    </p>
                    <p className="uppercase color-gray font-bold mt-0">
                      {postSubmissionLabel}
                    </p>
                  </div>
                );
              }

              return (
                <form className="mt-3" onSubmit={this.handleSubmit}>
                  <div>
                    <label
                      className={classNames('field-label mb-2', {
                        'has-error': has(formErrors, 'text'),
                      })}
                      htmlFor="selections"
                    >
                      {selectionFieldLabel}
                    </label>

                    <div className="select">
                      <select
                        id="selections"
                        className={classNames('text-field', {
                          'color-gray': isSelectionInvalid,
                          'has-error shake': has(formErrors, 'text'),
                        })}
                        value={this.state.selection}
                        onChange={this.handleChange}
                      >
                        <option disabled>{selectionPlaceholderOption}</option>
                        {selectionOptions.map(selectionOption => (
                          <option key={selectionOption} value={selectionOption}>
                            {selectionOption}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <PrimaryButton
                    className="block mt-3 text-lg w-full"
                    isDisabled={isSelectionInvalid}
                    isLoading={submissionItem && submissionItem.isPending}
                    text={buttonText}
                    type="submit"
                  />
                </form>
              );
            }}
          </Query>
        </div>
      </Card>
    );
  }
}

SelectionSubmissionAction.propTypes = {
  actionId: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
  campaignId: PropTypes.string.isRequired,
  richText: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired, // @TODO: rename property to blockId
  pageId: PropTypes.string.isRequired,
  postSubmissionLabel: PropTypes.string.isRequired,
  resetPostSubmissionItem: PropTypes.func.isRequired,
  selectionFieldLabel: PropTypes.string,
  selectionOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectionPlaceholderOption: PropTypes.string,
  storePost: PropTypes.func.isRequired,
  submissions: PropTypes.shape({
    items: PropTypes.object,
  }).isRequired,
  title: PropTypes.string,
};

SelectionSubmissionAction.defaultProps = {
  buttonText: 'Submit',
  selectionFieldLabel: 'Make your selection below',
  selectionPlaceholderOption: '---',
  title: 'Make a selection',
};

export default SelectionSubmissionAction;
