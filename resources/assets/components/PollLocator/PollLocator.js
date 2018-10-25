/* global window, document, MutationObserver */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { trackPuckEvent } from '../../helpers/analytics';

class PollLocator extends React.Component {
  componentDidMount() {
    this.addObserver();
    this.initVitScript();
  }

  componentWillUnmount() {
    // Disconnect the MutationObserver.
    this.observer.disconnect();
  }

  handleSearchButtonClick = () => {
    trackPuckEvent('phoenix_clicked_poll_locator');
  };

  /**
   * Add a MutationObserver to determine load status of the Voter Information Tool.
   */
  addObserver = () => {
    // Select the node that will be observed for mutations
    const vitNode = document.getElementById('_vit');

    // Create an observer instance linked to the callback function
    this.vitObserver = new MutationObserver(() => {
      const addressNotFoundModal = document
        .getElementById('_vit')
        .querySelector('#address-not-found');
      if (get(addressNotFoundModal, 'style.display') === 'block') {
        trackPuckEvent('phoenix_opened_poll_locator_not_found_modal');
      }

      const searchButton = document.getElementById('submit-address-button');

      if (!searchButton) {
        return;
      }

      searchButton.addEventListener('click', this.handleSearchButtonClick);
    });

    // Start observing the target node for configured mutations
    this.vitObserver.observe(vitNode, { childList: true, subtree: true });

    this.vitModalObserver = new MutationObserver(() => {
      const modal = document.querySelector('html > #_vitModal');
      if (modal) {
        trackPuckEvent('phoenix_opened_poll_locator_modal');
      }
    });

    this.vitModalObserver.observe(document.querySelector('html'), {
      childList: true,
    });
  };

  /**
   * Append the Voter Information Tool to the DOM and add event listener for when it loads.
   */
  initVitScript = () => {
    const script = document.createElement('script');
    script.src = 'https://tool.votinginfoproject.org/app.js';
    document.head.append(script);
    script.addEventListener('load', this.loadVit);
  };

  /**
   * Call the vit.load method if the vit object has been added to the window.
   */
  loadVit = () => {
    if (!window.vit) {
      return;
    }

    let vitConfig = {
      modal: true,
      officialOnly: false,
      title: 'Find Where to Vote',
      width: '640px',
      height: '520px',
      logo:
        'https://user-images.githubusercontent.com/2658867/44488732-7e6fed80-a627-11e8-8d84-866c17144642.png',
      colors: {
        header: '#ad1b1b',
        landscapeBackgroundHeader: '#8d1919',
      },
      language: 'en',
    };

    const electionId = get(this.props.additionalContent, 'electionId');

    if (electionId) {
      vitConfig = {
        ...vitConfig,
        electionId,
      };
    }

    window.vit.load(vitConfig);
  };

  render() {
    return (
      <div id="_vit" className="margin-horizontal-auto">
        {/** this spinner will be auto replaced by the vit content once it loads */}
        <div
          className="spinner -centered"
          style={{ height: 350, width: 640 }}
        />
      </div>
    );
  }
}

PollLocator.propTypes = {
  additionalContent: PropTypes.shape({
    electionId: PropTypes.number,
  }),
};

PollLocator.defaultProps = {
  additionalContent: {
    electionId: null,
  },
};

export default PollLocator;
