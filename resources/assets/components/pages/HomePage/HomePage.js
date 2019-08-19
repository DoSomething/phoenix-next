/* global window */

import React from 'react';
import { get } from 'lodash';

import sponsorList from './sponsor-list';
import Modal from '../../utilities/Modal/Modal';
import { contentfulImageUrl } from '../../../helpers';
import TypeFormSurvey from '../../utilities/TypeFormSurvey/TypeFormSurvey';
import FeatureLauncher from '../../utilities/FeatureLauncher/FeatureLauncher';
import TrafficDistribution from '../../utilities/TrafficDistribution/TrafficDistribution';

import './home-page.scss';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = get(window.HOMEPAGE, 'fields', {});
  }

  renderGalleryBlock = (block, index) => {
    const { id, type, staffPick } = block;

    const isCampaign = type === 'campaign';

    const fields = isCampaign ? block : block.fields;
    const { slug, title, coverImage } = fields;

    // Set more generous crop dimensions for 'featured' (first) homepage tile.
    const imageCrop = index === 0 ? '1600' : '800';

    return (
      <article className="tile" key={id}>
        <a
          className="wrapper"
          href={`/us/${isCampaign ? 'campaigns/' : ''}${slug}`}
        >
          {staffPick ? (
            <div className="tile__flag -staff-pick">STAFF PICK</div>
          ) : null}

          <div className="tile__meta">
            <h1 className="tile__title">{title}</h1>
            <p className="tile__tagline">{fields.tagline || fields.subTitle}</p>
          </div>

          <img
            src={contentfulImageUrl(
              coverImage.url,
              imageCrop,
              imageCrop,
              'fill',
            )}
            alt={coverImage.description || `${title} cover image`}
          />
        </a>
      </article>
    );
  };

  render() {
    const { blocks, title, subTitle } = this.state;

    if (!blocks) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="home-page">
          <header role="banner" className="header header--home">
            <div className="wrapper">
              <h1 className="header__title">{title}</h1>
              <h2 className="header__subtitle">{subTitle}</h2>
            </div>
          </header>

          <section className="home-page__gallery">
            {blocks.map(this.renderGalleryBlock)}
          </section>

          <section className="container container--sponsors">
            <div className="wrapper">
              <div className="container__block">
                <h4>Sponsors</h4>
                <ul>
                  {sponsorList.map(sponsor => (
                    <li key={sponsor.name}>
                      <img
                        src={contentfulImageUrl(sponsor.image, '125', '40')}
                        title={sponsor.name}
                        alt={sponsor.name}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        <TrafficDistribution percentage={5} feature="nps_survey">
          <FeatureLauncher
            type="nps_survey"
            countdown={30}
            render={handleClose => (
              <Modal onClose={handleClose} trackingId="SURVEY_MODAL">
                <TypeFormSurvey
                  typeformUrl="https://dosomething.typeform.com/to/iEdy7C"
                  queryParameters={{
                    northstar_id: get(window.AUTH, 'id', null),
                  }}
                  redirectParameters={{
                    hide_nps_survey: 1,
                  }}
                />
              </Modal>
            )}
          />
        </TrafficDistribution>
      </React.Fragment>
    );
  }
}

export default HomePage;
