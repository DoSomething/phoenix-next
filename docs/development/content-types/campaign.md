# Campaign

## Overview

Configures a [campaign](https://github.com/DoSomething/rogue/blob/master/docs/endpoints/campaigns.md) for the web.

## Content Type Fields

- **Internal Title**: This is for our internal Contentful organization and will be how the entry shows up in search results, etc.

- **Campaign ID** : The ID of the [campaign](https://github.com/DoSomething/rogue/blob/master/docs/endpoints/campaigns.md) to create signups and posts for.

- **Display Referral Page** : Whether to display the [Referral Page Banner](development/features/referral-pages.md) in the signup Affirmation.

- **Blurb** : Long text displayed in the CampaignBanner.

- **Landing Page** : Reference to a [Landing Page](development/content-types/landing-page.md) or Sixpack Experiment entry ([currently broken](https://www.pivotaltracker.com/n/projects/2401401/stories/170964251)), displayed when the current user has not signed up for the campaign.

- **Additional Content** : A JSON field, which may contain the following properties:

  - `featureFlags` - (Deprecated). Expects an object property. This was only ever used with a `showVoterRegistrationModal` key, and support was removed in [#2073](https://github.com/DoSomething/phoenix-next/pull/2073).
