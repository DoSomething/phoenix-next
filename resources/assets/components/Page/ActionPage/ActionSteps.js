import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Flex, FlexCell } from '../../Flex';
import SectionHeader from '../../SectionHeader';
import { ActionStepBlock } from '../../Actions';
import { PostGalleryContainer } from '../../Gallery/PostGallery';
import Revealer from '../../Revealer';
import SignupButtonFactory from '../../SignupButton';

/**
 * Render the action page revealer.
 *
 * @param  {String}  callToAction
 * @param  {Boolean} hasPendingSignup
 * @param  {Boolean} isSignedUp
 * @param  {String}  campaignId
 * @return {Component}
 */
export function renderRevealer(callToAction, hasPendingSignup, isSignedUp, campaignId) {
  const SignupRevealer = SignupButtonFactory(({ clickedSignUp }) => (
    <Revealer
      title="Join Us"
      callToAction={callToAction}
      isLoading={hasPendingSignup}
      onReveal={() => clickedSignUp(campaignId)}
      isSignedUp={isSignedUp}
    />
  ), 'action page revealer', { text: 'Join Us', callToAction });

  return (
    <SignupRevealer key="revealer" />
  );
}

/**
 * Render a legacy version of the user submissions gallery.
 *
 * @return {Component}
 */
export function renderLegacyGallery() {
  return (
    <div key="member_gallery" className="content-block">
      <div className="margin-top-xlg margin-bottom-xlg margin-horizontal-md">
        <h2 className="heading -emphasized legacy-step-header margin-top-md margin-bottom-md">
          <span>Member Gallery</span>
        </h2>
        <PostGalleryContainer key="post_gallery" type="reportback" />
      </div>
    </div>
  );
}

const ActionSteps = (props) => {
  const { actionSteps, callToAction, campaignId,
    hasActivityFeed, hasPendingSignup, isSignedUp, template } = props;

  let stepIndex = 0;

  const stepComponents = actionSteps.map((json) => {
    const type = get(json, 'fields.customType', false) || get(json, 'type.sys.id', false) || 'default';

    // Is this a "numbered" step? If so, increment our step index.
    if (['third-party-action', 'campaignActionStep', 'default'].includes(type)) {
      stepIndex += 1;
    }

    // Some components have built-in section headers. For those, append it.
    // @TODO: These should be split out into separate "content" blocks.
    let prefixComponent = null;
    if (['voterRegistrationAction'].includes(type)) {
      const title = get(json, 'fields.title', '');

      // @HACK: We have some blank titles " "... just hide those.
      prefixComponent = title.trim().length ? (
        <SectionHeader
          title={title}
          hideStepNumber={get(json, 'fields.hideStepNumber', true)}
          step={stepIndex}
        />
      ) : null;
    }

    let columnWidth = 'two-thirds';
    if (['photo-uploader', 'photoUploaderAction', 'submission-gallery', 'campaignActionStep', 'default'].includes(type)) {
      columnWidth = 'full';
    }

    return (
      <Flex id={`step-${json.id}`} key={json.id}>
        {prefixComponent}
        <FlexCell width={columnWidth}>
          <ActionStepBlock json={json} stepIndex={stepIndex} isSignedUp={isSignedUp} />
        </FlexCell>
      </Flex>
    );
  });

  if (! isSignedUp) {
    stepComponents.push(renderRevealer(
      callToAction, hasPendingSignup, isSignedUp, campaignId,
    ));
  }

  if (template === 'legacy' || ! hasActivityFeed) {
    stepComponents.push(renderLegacyGallery());
  }

  return (
    <div>
      { stepComponents }
    </div>
  );
};

ActionSteps.propTypes = {
  actionSteps: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  callToAction: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  hasActivityFeed: PropTypes.bool.isRequired,
  hasPendingSignup: PropTypes.bool.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  template: PropTypes.string.isRequired,
};

export default ActionSteps;
