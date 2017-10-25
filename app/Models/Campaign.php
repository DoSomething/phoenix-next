<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'slug'];


    /**
     * Returns the links for this Campaign.
     *
     * @return Collection
     */
    public function links() {
        return $this->belongsToMany(Link::class);
    }

    /**
     * Parse the given campaign data and update any links
     * for this campaign.
     *
     * @param  stdClass  $campaign
     * TODO: Add feature flag.
     * TODO: Investigate why $latestLinks is different for sincerely-us (Pagination?)
     */
    public function parseCampaignData($campaign) {
        $latestLinks = find_identifiers_in_array($campaign)->filter(function ($value, $key) {
            return $value !== $this->id;
        });

        $existingLinks = collect($this->links)->map(function ($link) {
            return $link->id;
        });

        $linksToMake = $latestLinks->diff($existingLinks);
        $linksToRemove = $existingLinks->diff($latestLinks);

        foreach ($linksToMake as $linkId) {
            $link = Link::firstOrCreate(['id' => $linkId]);
            $link->campaigns()->attach($this->id);
        }

        foreach ($linksToRemove as $linkId) {
            $link = Link::find($linkId);

            if ($link) {
                $link->campaigns()->detach($this->id);
            }
        }
    }
}
