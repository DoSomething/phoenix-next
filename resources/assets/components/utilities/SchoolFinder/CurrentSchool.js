import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../../Query';

const SCHOOL_QUERY = gql`
  query SchoolByIdQuery($schoolId: String!) {
    school(id: $schoolId) {
      name
      city
      state
    }
  }
`;

const CurrentSchool = ({ schoolId }) => {
  if (!schoolId) {
    return null;
  }

  if (schoolId === 'school-not-available') {
    return (
      <React.Fragment>
        <h3>No School Selected</h3>
        <p>
          No school copy goes here, please email Saraha with information about
          your school.
        </p>
      </React.Fragment>
    );
  }

  return (
    <Query query={SCHOOL_QUERY} variables={{ schoolId }}>
      {res => (
        <React.Fragment>
          <h3>{res.school.name}</h3>
          <small className="uppercase">
            {res.school.city}, {res.school.state}
          </small>
        </React.Fragment>
      )}
    </Query>
  );
};

CurrentSchool.propTypes = {
  schoolId: PropTypes.string.isRequired,
};

export default CurrentSchool;
