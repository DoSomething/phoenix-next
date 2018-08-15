import React from 'react';
import PropTypes from 'prop-types';
import { get, snakeCase } from 'lodash';

import { sixpack } from '../../../helpers';
import ContentfulEntry from '../../ContentfulEntry';
import Placeholder from '../../utilities/Placeholder';

class SixpackExperiment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAlternative: null,
    };

    const { campaignSlug, title } = this.props;

    this.experimentName = campaignSlug
      ? `${snakeCase(campaignSlug)}_${snakeCase(title)}`
      : `${snakeCase(title)}`;
  }

  componentDidMount() {
    const {
      alternatives,
      convertableActions,
      kpi,
      trafficFraction,
    } = this.props;

    const alternativeOptions = alternatives.map((item, index) => {
      let testAlternativeName;
      const fallbackName = `Test Alternative ${index + 1}`;

      if (React.isValidElement(item)) {
        testAlternativeName = get(item.props, 'testName', fallbackName);
      } else {
        // @TODO: probably want to use internalTitle but not all entities expose that.
        // Defaults to title field, but we should aim to start exposing internalTitle on entities!
        testAlternativeName =
          get(item, 'fields.internalTitle') ||
          get(item, 'fields.title') ||
          fallbackName;
      }

      return snakeCase(testAlternativeName);
    });

    const selectedAlternative = sixpack().participate(
      this.experimentName,
      alternativeOptions,
      {
        convertableActions,
        kpi,
        trafficFraction,
      },
    );

    selectedAlternative
      .then(response => {
        this.setState({
          selectedAlternative:
            alternatives[alternativeOptions.indexOf(response)],
        });
      })
      .catch(() => {
        // @TODO: Log this error somewhere so we know if a Sixpack Experiment
        // is having issues.
        this.setState({
          selectedAlternative: alternatives[0],
        });
      });
  }

  componentWillUnmount() {
    sixpack().removeExperiment(this.experimentName);
  }

  render() {
    const selectedAlternative = this.state.selectedAlternative;

    if (!selectedAlternative) {
      return <Placeholder />;
    }

    return React.isValidElement(selectedAlternative) ? (
      selectedAlternative
    ) : (
      <ContentfulEntry json={selectedAlternative} />
    );
  }
}

SixpackExperiment.propTypes = {
  alternatives: PropTypes.arrayOf(PropTypes.object).isRequired,
  campaignSlug: PropTypes.string,
  convertableActions: PropTypes.arrayOf(PropTypes.string).isRequired,
  kpi: PropTypes.string,
  title: PropTypes.string.isRequired,
  trafficFraction: PropTypes.number,
};

SixpackExperiment.defaultProps = {
  campaignSlug: null,
  kpi: null,
  trafficFraction: 1,
};

export default SixpackExperiment;
