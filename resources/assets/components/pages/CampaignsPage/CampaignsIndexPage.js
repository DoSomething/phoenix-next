import { get } from 'lodash';
import React, { useState } from 'react';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import FilterNavigation from './FilterNavigation/FilterNavigation';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';

import './campaigns-page.scss';

const CampaignsIndexPage = () => {
  const [filters, setFilters] = useState({ causes: [] });

  return (
    <>
      <SiteNavigationContainer />

      <div className="bg-white border-b border-gray-300 border-solid ">
        <div className="md:w-3/4 mx-auto pt-6 md:pt-10 pl-6 md:pl-0">
          <h2 className="w-full mt-6">Explore Campaigns</h2>
        </div>
        <FilterNavigation filters={filters} setFilters={setFilters} />
      </div>

      <main className="md:w-3/4 mx-auto">
        <PaginatedCampaignGallery
          className="grid-full px-6 md:px-0"
          itemsPerRow={4}
          variables={{
            isOpen: true,
            first: 36,
            orderBy: 'start_date,desc',
            // @TODO depending on future implementation of filters in rogue,
            // potentially concatenate all filters to single array 🤔
            causes: get(filters, 'causes', []),
          }}
        />
      </main>

      <SiteFooter />
    </>
  );
};

export default CampaignsIndexPage;
