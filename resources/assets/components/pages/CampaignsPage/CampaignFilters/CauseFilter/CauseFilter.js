import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

const CauseInput = ({ causeChecked, causeName, causeValue, handleSelect }) => (
  <label className="flex justify-start pb-2" htmlFor={causeValue}>
    <input
      name={causeValue}
      id={causeValue}
      type="checkbox"
      value={causeValue}
      onClick={handleSelect}
      checked={causeChecked}
    />
    <span className="pl-4">{causeName}</span>
  </label>
);

CauseInput.propTypes = {
  causeChecked: PropTypes.bool,
  causeName: PropTypes.string.isRequired,
  causeValue: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

CauseInput.defaultProps = {
  causeChecked: false,
};

const CauseFilter = ({ filters, setFilters }) => {
  const causes = get(filters, 'causes', []);

  const causeLabels = {
    'animal-welfare': 'Animal Welfare',
    bullying: 'Bullying',
    education: 'Education',
    environment: 'Environment',
    'gender-rights': 'Gender Rights & Equality',
    'homelessness-and-poverty': 'Homelessness & Poverty',
    immigration: 'Immigration & Refugees',
    'lgbtq-rights': 'LGBTQ+ Rights & Equality',
    'mental-health': 'Mental Health',
    'physical-health': 'Physical Health',
    'racial-justice': 'Racial Justice & Equity',
    'sexual-harassment': 'Sexual Harassment & Assault',
  };

  const handleCauseSelect = event => {
    if (causes.includes(event.target.value)) {
      const newCauses = causes.filter(cause => {
        return cause !== event.target.value;
      });
      setFilters({ causes: [...newCauses] });
    } else {
      setFilters({ causes: [...causes, event.target.value] });
    }
  };

  const clearAllSelected = () => {
    if (causes) {
      setFilters({ causes: [] });
    }
  };

  return (
    <form>
      <div className="cause-filter w-full p-4 flex flex-col flex-wrap">
        {Object.keys(causeLabels).map(cause => {
          return (
            <CauseInput
              key={cause}
              handleSelect={handleCauseSelect}
              causeName={causeLabels[cause]}
              causeValue={cause}
              causeChecked={causes.includes(cause)}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-start py-2 px-4">
        <button
          className="pr-6 focus:outline-none"
          onClick={clearAllSelected}
          type="button"
        >
          <p className="font-bold text-blue-500">clear</p>
        </button>
      </div>
    </form>
  );
};

CauseFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default CauseFilter;
