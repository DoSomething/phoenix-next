<?php

namespace App\Entities;

use JsonSerializable;
use Illuminate\Support\Arr;

/**
 * The Campaign entity.
 */
class Campaign extends Entity implements JsonSerializable
{
    /**
     * Parse and extract data for affiliates (either affiliateSponser or affiliatePartner).
     *
     * @param  array $affiliates
     * @return array
     */
    public function parseAffiliates($affiliates)
    {
        return collect($affiliates)->map(function ($affiliate) {
            return new Affiliate($affiliate->entry);
        });
    }

    /**
     * Parse the campaign dashboard entry.
     *
     * @param  Entry $campaignDashboard
     * @return array
     */
    public function parseCampaignDashboard($campaignDashboard)
    {
        if (! $campaignDashboard) {
            return null;
        }

        if ($campaignDashboard->getContentType() === 'sixpackExperiment') {
            return new SixpackExperiment($campaignDashboard->entry);
        }

        return new CampaignDashboard($campaignDashboard->entry);
    }

    /**
     * Parse the campaign lead
     *
     * @param  Entry $campaignlead
     * @return array
     */
    public function parseCampaignLead($campaignlead)
    {
        if ($campaignlead) {
            // @TODO (2018-09-13): We should make the CampaignLead field required and thus
            // no longer need a conditional check here.
            return  new Person($campaignlead->entry);
        }
    }

    /**
     * Parse and extract data for quizzes.
     *
     * @param  array $quizzes
     * @return array
     */
    public function parseQuizzes($quizzes)
    {
        return collect($quizzes)->map(function ($quiz) {
            return new Quiz($quiz->entry);
        });
    }

    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'campaignId' => $this->legacyCampaignId,
            'type' => $this->entry->getContentType()->getId(),
            'title' => $this->title,
            'slug' => $this->slug,
            'metadata' => $this->metadata ? new Metadata($this->metadata->entry) : null,
            'status' => null, // @TODO: calculate status based on the endDate!
            'endDate' => $this->endDate,
            'callToAction' => $this->callToAction, //@TODO: deprecate in favor of tagline.
            'tagline' => $this->callToAction,
            'blurb' => trim($this->blurb),
            'coverImage' => [
                'description' => $this->coverImage ? $this->coverImage->getDescription() : '',
                'url' => get_image_url($this->coverImage),
                'landscapeUrl' => get_image_url($this->coverImage, 'landscape'),
            ],
            'campaignLead' => $this->parseCampaignLead($this->campaignLead),
            'affiliateSponsors' => $this->parseAffiliates($this->affiliateSponsors),
            'affiliatePartners' => $this->parseAffiliates($this->affiliatePartners),
            'quizzes' => $this->parseQuizzes($this->quizzes),
            'dashboard' => $this->parseCampaignDashboard($this->dashboard),
            'affirmation' => $this->affirmation ? $this->parseBlock($this->affirmation) : null,
            'pages' => $this->parseBlocks($this->pages),
            'landingPage' => $this->landingPage ? $this->parseBlock($this->landingPage) : null,
            'additionalContent' => $this->additionalContent,
            'allowExperiments' => $this->campaignSettings ? $this->campaignSettings->allowExperiments : null,
            'actionText' => Arr::get($this->campaignSettings, 'actionText') ?: 'Join Us',
            'staffPick' => $this->staffPick,
            'cause' => $this->cause,
            'scholarshipAmount' => $this->scholarshipAmount,
            'scholarshipCallToAction' => $this->scholarshipCallToAction,
            'scholarshipDeadline' => $this->scholarshipDeadline,
            'scholarshipDescription' => $this->scholarshipDescription,
            'affiliateOptInContent' => $this->affiliateOptInContent,
            'displayReferralPage' => $this->displayReferralPage,
        ];
    }
}
