import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from 'lodash';

import ContentfulEntry from '../../ContentfulEntry';
import Placeholder from '../../utilities/Placeholder';
import { participateBeta } from '../../../helpers/experiments';

class SixpackExperiment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAlternative: null,
    };
  }

  componentDidMount() {
    const { alternatives, title } = this.props;

    const alternativeOptions = alternatives.map(item =>
      snakeCase(item.fields.title),
    );

    const selectedAlternative = participateBeta(snakeCase(title));

    selectedAlternative
      .then(response => {
        this.setState({
          selectedAlternative:
            alternatives[alternativeOptions.indexOf(response)],
        });
      })
      .catch(error => {
        // @TODO: Log this error somewhere so we know if a Sixpack Experiment
        // is having issues.
        this.setState({
          selectedAlternative: alternatives[0],
        });
      });
  }

  render() {
    return this.state.selectedAlternative ? (
      <ContentfulEntry json={this.state.selectedAlternative} />
    ) : (
      <Placeholder />
    );
  }
}

SixpackExperiment.propTypes = {
  title: PropTypes.string.isRequired,
  alternatives: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SixpackExperiment;
