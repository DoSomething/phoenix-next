/* @flow */

import React from 'react';

import NotFound from '../NotFound';
import Loader from '../utilities/Loader';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { ContentfulEntryJson } from '../../types';
import PollLocator from '../PollLocator/PollLocator';
import CardBlock from '../blocks/CardBlock/CardBlock';
import { CampaignUpdateContainer } from '../CampaignUpdate';
import ImagesBlock from '../blocks/ImagesBlock/ImagesBlock';
import GalleryBlock from '../blocks/GalleryBlock/GalleryBlock';
import { parseContentfulType, report, withoutNulls } from '../../helpers';
import CallToActionContainer from '../CallToAction/CallToActionContainer';
import LandingPageContainer from '../pages/LandingPage/LandingPageContainer';
import SocialDriveActionContainer from '../actions/SocialDriveAction/SocialDriveActionContainer';
import SixpackExperimentContainer from '../utilities/SixpackExperiment/SixpackExperimentContainer';
import CampaignGalleryBlockContainer from '../blocks/CampaignGalleryBlock/CampaignGalleryBlockContainer';
import {
  renderLinkAction,
  renderAffirmation,
  renderShareAction,
  renderContentBlock,
  renderPhotoSubmissionAction,
  renderTextSubmissionAction,
  renderVoterRegistrationAction,
  renderReferralSubmissionAction,
} from './renderers';

// If no block is passed, just render an empty "placeholder".
const DEFAULT_BLOCK: ContentfulEntryJson = { fields: { type: null } };

type Props = {
  json: ContentfulEntryJson,
};
type State = { hasError: boolean };

class ContentfulEntry extends React.Component<Props, State> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });
    report(error);
  }

  render() {
    // Did we hit an error? :(
    if (this.state.hasError) {
      return <ErrorBlock />;
    }

    // Otherwise, find the corresponding component & render it!
    const { json = DEFAULT_BLOCK } = this.props;
    const type = parseContentfulType(json);

    switch (type) {
      case 'affirmation':
        return renderAffirmation(json);

      case 'callToAction':
        return (
          <CallToActionContainer
            actionText={json.fields.actionText}
            content={json.fields.content}
            impactPrefix={json.fields.impactPrefix}
            impactSuffix={json.fields.impactSuffix}
            impactValue={json.fields.impactValue}
            visualStyle={json.fields.visualStyle}
            useCampaignTagline={json.fields.useCampaignTagline}
          />
        );

      case 'cardBlock':
        return (
          <CardBlock
            id={json.id}
            title={json.fields.title}
            content={json.fields.content}
            author={json.fields.author}
            link={json.fields.link}
          />
        );

      case 'campaignUpdate':
        return (
          <CampaignUpdateContainer
            id={json.id}
            affiliateLogo={json.fields.affiliateLogo}
            author={json.fields.author}
            content={json.fields.content}
            displayOptions={json.fields.displayOptions}
            link={json.fields.link}
          />
        );

      case 'contentBlock':
        return renderContentBlock(json);

      case 'gallery':
        return (
          <div className="margin-horizontal-md">
            <CampaignGalleryBlockContainer />
          </div>
        );

      case 'galleryBlock':
        return <GalleryBlock {...json.fields} />;

      case 'imagesBlock':
        return <ImagesBlock images={json.fields.images} />;

      case 'landingPage':
        return <LandingPageContainer {...json.fields} />;

      case 'linkAction':
        return renderLinkAction(json);

      case 'page':
        return (
          <CardBlock content={json.fields.content} title={json.fields.title} />
        );

      case 'photoSubmissionAction':
        return renderPhotoSubmissionAction(json);

      case 'poll_locator':
        return (
          <div className="margin-horizontal-md">
            <PollLocator {...withoutNulls(json.fields)} />
          </div>
        );

      case 'quiz': {
        const QuizContainer = Loader(import('../Quiz/QuizContainer'));
        return <QuizContainer {...json.fields} />;
      }

      case 'quizBeta': {
        const LegacyQuiz = Loader(import('../LegacyQuiz/LegacyQuizContainer'));
        return <LegacyQuiz quizContent={json} />;
      }

      case 'referralSubmissionAction':
        return renderReferralSubmissionAction(json);

      case 'shareAction':
        return renderShareAction(json);

      case 'sixpackExperiment':
        return (
          <SixpackExperimentContainer
            id={json.id}
            {...withoutNulls(json.fields)}
          />
        );

      case 'socialDriveAction':
        return (
          <div className="margin-horizontal-md margin-bottom-lg">
            <SocialDriveActionContainer {...json.fields} />
          </div>
        );

      case 'static':
        return (
          <CardBlock title={json.fields.title} content={json.fields.content} />
        );

      case 'textSubmissionAction':
        return renderTextSubmissionAction(json);

      case 'voterRegistrationAction':
        return renderVoterRegistrationAction(json);

      default:
        return <NotFound />;
    }
  }
}

export default ContentfulEntry;
