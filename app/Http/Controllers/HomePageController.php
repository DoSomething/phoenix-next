<?php

namespace App\Http\Controllers;

use App\Repositories\HomePageRepository;

class HomePageController extends Controller
{
    /**
     * The home page repository.
     *
     * @var HomePageRepository
     */
    protected $homePageRepository;

    /**
     * Make a new HomePageController, inject dependencies,
     * and set middleware for this controller's methods.
     *
     * @param HomePageRepository $homePageRepository
     */
    public function __construct(HomePageRepository $homePageRepository)
    {
        $this->homePageRepository = $homePageRepository;
    }

    /**
     * Display the homepage.
     *
     * @return \Illuminate\View\View
     */
    public function __invoke()
    {
        $homePage = $this->homePageRepository->getFirst();

        if (! $homePage) {
            return redirect('/us/campaigns');
        }

        return response()->view('app', [
            'headTitle' => $homePage->fields->title,
            'legacyNavigation' => true,
            'homePage' => $homePage,
            'admin' => [
                'page' => get_page_settings($homePage, 'home_pages'),
            ],
        ])->cacheableWhenAnonymous();
    }
}
