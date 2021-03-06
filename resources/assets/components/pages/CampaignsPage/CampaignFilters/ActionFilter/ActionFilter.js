import React, { useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import FilterInput, {
  trackClickedFilterOptionsAnalyticsEvent,
  trackClickedFilterClearOptionsAnalyticsEvent,
} from '../FilterInput';
import ElementButton from '../../../../utilities/Button/ElementButton';

const actionLocationLabels = {
  'in-person': 'In Person',
  online: 'Online',
};

const actionTypeLabels = {
  'attend-event': 'Attend an Event',
  'collect-something': 'Collect Something',
  'contact-decisionmaker': 'Contact a Decision-Maker',
  'donate-something': 'Donate Something',
  'flag-content': 'Flag Content',
  'have-a-conversation': 'Have A Conversation',
  'host-event': 'Host An Event',
  'make-something': 'Make Something',
  'share-something': 'Share Something',
  'sign-petition': 'Sign A Petition',
};

/**
 * Filter menu form with series of checkbox inputs.
 *
 * @param {Object}
 */
const ActionFilter = ({ filters, setFilters }) => {
  const actionTypes = get(filters, 'actions.actionTypes', []);

  const [actionLocation, setActionLocation] = useState('');

  const handleActionTypeSelect = event => {
    trackClickedFilterOptionsAnalyticsEvent('action_type', event.target.value);

    if (actionTypes.includes(event.target.value)) {
      const newActionTypes = actionTypes.filter(actionType => {
        return actionType !== event.target.value;
      });
      const actionsRemoved = {
        ...filters.actions,
        actionTypes: [...newActionTypes],
      };

      setFilters({
        ...filters,
        actions: { ...actionsRemoved },
      });
    } else {
      const actionsAdded = {
        ...filters.actions,
        actionTypes: [...actionTypes, event.target.value],
      };

      setFilters({
        ...filters,
        actions: {
          ...actionsAdded,
        },
      });
    }
  };

  const handleActionLocationSelect = event => {
    trackClickedFilterOptionsAnalyticsEvent(
      'action_location',
      event.target.value,
    );

    const selection = event.target.value;

    if (actionLocation === selection) {
      setFilters({
        ...filters,
        actions: { ...filters.actions, isOnline: null },
      });

      setActionLocation('');

      return;
    }

    setFilters({
      ...filters,
      actions: { ...filters.actions, isOnline: selection === 'online' },
    });

    setActionLocation(selection);
  };

  const clearAllSelected = () => {
    trackClickedFilterClearOptionsAnalyticsEvent('action');

    if (actionTypes) {
      setFilters({
        ...filters,
        actions: { actionTypes: [], isOnline: null },
      });
    }
    setActionLocation('');
  };

  return (
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-4">
        <div className="mb-6 lg:mb-0">
          <h2 className="font-bold text-base pb-3">Location</h2>

          {Object.keys(actionLocationLabels).map(actionLocationLabel => {
            return (
              <FilterInput
                key={actionLocationLabel}
                handleSelect={handleActionLocationSelect}
                filterName={actionLocationLabels[actionLocationLabel]}
                filterValue={actionLocationLabel}
                isChecked={actionLocationLabel === actionLocation}
              />
            );
          })}
        </div>

        <div className="col-span-2">
          <h2 className="font-bold text-base pb-3">Type</h2>

          <div className="lg:grid lg:grid-cols-2">
            {Object.keys(actionTypeLabels).map(actionType => {
              return (
                <FilterInput
                  key={actionType}
                  handleSelect={handleActionTypeSelect}
                  filterName={actionTypeLabels[actionType]}
                  filterValue={actionType}
                  isChecked={actionTypes.includes(actionType)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-start py-2">
        <ElementButton
          className="font-bold p-2 text-blue-500 hover:text-blue-300"
          text="clear"
          onClick={clearAllSelected}
        />
      </div>
    </form>
  );
};

ActionFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default ActionFilter;
