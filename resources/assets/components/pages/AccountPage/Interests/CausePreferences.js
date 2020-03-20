import React from 'react';

import CausePreferenceItem from './CausePreferenceItem';

const CausePreferences = () => {
  const causeItems = {
    ANIMAL_WELFARE: {
      title: 'Animal Welfare',
      description: 'Some description',
    },
    BULLYING: {
      title: 'Bullying',
      description: 'Some description',
    },
    EDUCATION: {
      title: 'Education',
      description: 'Some description',
    },
    ENVIRONMENT: {
      title: 'Environment',
      description: 'Some description',
    },
    GENDER_RIGHTS_EQUALITY: {
      title: 'Gender Rights & Equality',
      description: 'Some description',
    },
    HOMELESSNESS_POVERTY: {
      title: 'Homelessness & Poverty',
      description: 'Some description',
    },
    IMMIGRATION_REFUGEES: {
      title: 'Immigration & Refugees',
      description: 'Some description',
    },
    LGBTQ_RIGHTS_EQUALITY: {
      title: 'LGBTQ+ Rights & Equality',
      description: 'Some description',
    },
    MENTAL_HEALTH: {
      title: 'Mental Health',
      description: 'Some description',
    },
    PHYSICAL_HEALTH: {
      title: 'Physical Health',
      description: 'Some description',
    },
    RACIAL_JUSTICE_EQUITY: {
      title: 'Racial Justice & Equity',
      description: 'Some description',
    },
    SEXUAL_HARASSMENT_ASSAULT: {
      title: 'Sexual Harassment & Assault',
      description: 'Some description',
    },
  };

  return (
    <div className="gallery-grid gallery-grid-duo">
      {Object.keys(causeItems).map(cause => (
        <CausePreferenceItem
          cause={cause}
          title={causeItems[cause].title}
          description={causeItems[cause].description}
        />
      ))}
    </div>
  );
};

export default CausePreferences;
