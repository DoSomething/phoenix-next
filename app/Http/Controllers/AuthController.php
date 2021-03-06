<?php

namespace App\Http\Controllers;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class AuthController extends Controller
{
    /**
     * Where to redirect users after login, if their "intended"
     * destination can't be guessed.
     *
     * @var string
     */
    protected $redirectTo = '/campaigns';

    /**
     * Where to redirect users after logout.
     *
     * @var string
     */
    protected $redirectAfterLogout;

    /**
     * Make a new AuthController, inject dependencies,
     * and set middleware for this controller's methods.
     */
    public function __construct()
    {
        $this->redirectAfterLogout = config('app.url');
    }

    /**
     * Handle a logout request to the application.
     *
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function getDeauthorization(ResponseInterface $response)
    {
        return gateway('northstar')->logout($response, $this->redirectAfterLogout);
    }

    /**
     * Handle an auth request to the application.
     *
     * @param  ServerRequestInterface $request
     * @param  ResponseInterface      $response
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getAuthorization(ServerRequestInterface $request, ResponseInterface $response)
    {
        $queryParams = $request->getQueryParams();

        $this->setSessionData($queryParams);

        $url = $this->getUrl();

        $options = $this->getOptions($queryParams);

        $destination = $this->getDestination($queryParams, $options);

        return gateway('northstar')->authorize($request, $response, $url, $destination, $options);
    }

    /**
     * Get destination metadata for Northstar login.
     * Defaults to "title" in $options or null.
     *
     * @param  array  $queryParams
     * @param  array  $options
     * @return string
     */
    protected function getDestination($queryParams, $options = [])
    {
        return Arr::get($queryParams, 'destination', Arr::get($options, 'title'));
    }

    /**
     * Get options containing metadata for Northstar login.
     *
     * @param  array $queryParams
     * @return array
     */
    protected function getOptions($queryParams)
    {
        $options = Arr::get($queryParams, 'options', []);

        $mode = Arr::get($queryParams, 'mode', null);

        if (is_string($options)) {
            $options = (array) json_decode($options);
        }

        if ($mode) {
            $options['mode'] = $mode;
        }

        return $options;
    }

    /**
     * Get the destination URL to redirect to on a successful login.
     *
     * @return string
     */
    protected function getUrl()
    {
        $url = session('login.intended', $this->redirectTo);

        // If there is an actionId in the session, set it as a query param on to the intended URL.
        if (session('actionId')) {
            $actionIdParam = 'actionId='.urlencode(session('actionId'));

            $url .= Str::contains($url, '?') ? '&'.$actionIdParam : '?'.$actionIdParam;
        }

        return $url;
    }

    /**
     * Set session data used post-login and once user returns, redirected back to intended page.
     *
     * @param array $queryParams
     */
    protected function setSessionData($queryParams = [])
    {
        // @see Northstar Authorization Code Grant: https://git.io/fjd8N
        if (Arr::has($queryParams, 'code')) {
            return;
        }

        // The default post-login redirect will be to the previous page (if the user clicked
        // "Log In" in the top navigation), or to the path defined in the $redirectTo property.
        $defaultIntended = is_same_domain(url()->previous()) ? url()->previous() : $this->redirectTo;

        // The post-login redirect will be to the intended page (if logging in to view a page
        // protected by the 'auth' middleware), or to the default path determined above.
        $intended = session()->pull('url.intended', $defaultIntended);

        session(['login.intended' => $intended]);

        // If starting the login process, see if we have a "queued" action.
        $actionId = Arr::get($queryParams, 'actionId');

        session()->flash('actionId', $actionId);
    }
}
