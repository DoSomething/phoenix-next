import React from 'react';

import TikTokIcon from './TikTokIcon';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';
import { query } from '../../../helpers/url';

const SiteFooter = () => {
  // Hide footer if we're in "chromeless" mode, e.g. for an embed:
  if (query('chromeless')) {
    return null;
  }

  const handleFooterTracking = (linkName, url) => {
    trackAnalyticsEvent(`clicked_footer_link_${linkName}`, {
      action: 'link_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: `footer_${linkName}`,
      context: {
        url,
      },
    });
  };

  return (
    <footer className="footer site-footer pb-32 md:pb-3">
      <div className="footer__columns">
        <div className="footer__column -social">
          <ul>
            <li>
              <a
                href="https://www.tiktok.com/@dosomething"
                title="dosomething on Tik Tok"
                className="hover:text-white"
                style={{ padding: 0 }}
                onClick={event =>
                  handleFooterTracking('tiktok', event.target.href)
                }
              >
                <TikTokIcon />
              </a>
            </li>
            <li>
              <a
                href="http://instagram.com/dosomething"
                className="social-icon -instagram"
                title="@dosomething on Instagram"
                onClick={event =>
                  handleFooterTracking('instagram', event.target.href)
                }
              >
                <span>@dosomething on Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/dosomething"
                className="social-icon -twitter"
                title="@dosomething on Twitter"
                onClick={event =>
                  handleFooterTracking('twitter', event.target.href)
                }
              >
                <span>@dosomething on Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/dosomething"
                className="social-icon -facebook"
                title="dosomething on Facebook"
                onClick={event =>
                  handleFooterTracking('facebook', event.target.href)
                }
              >
                <span>dosomething on Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.snapchat.com/add/dosomething"
                className="social-icon -snapchat"
                title="dosomething on Snapchat"
                onClick={event =>
                  handleFooterTracking('snapchat', event.target.href)
                }
              >
                <span>dosomething on Snapchat</span>
              </a>
            </li>
            <li>
              <a
                href="http://www.youtube.com/user/DoSomething1"
                className="social-icon -youtube"
                title="dosomething1 on YouTube"
                onClick={event =>
                  handleFooterTracking('youtube', event.target.href)
                }
              >
                <span>dosomething1 on YouTube</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__column -links">
          <h4>Who We Are</h4>
          <ul>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about"
                onClick={event =>
                  handleFooterTracking('who_we_are', event.target.href)
                }
              >
                What is DoSomething.org?
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about/our-people"
                onClick={event =>
                  handleFooterTracking('our_team', event.target.href)
                }
              >
                Our Team
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about/our-financials"
                onClick={event =>
                  handleFooterTracking('our_financials', event.target.href)
                }
              >
                Our Financials
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about/our-press"
                onClick={event =>
                  handleFooterTracking('our_press', event.target.href)
                }
              >
                Press
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/articles"
                onClick={event =>
                  handleFooterTracking('articles', event.target.href)
                }
              >
                Articles
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about/contact-us"
                onClick={event =>
                  handleFooterTracking('contact_us', event.target.href)
                }
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__column -links">
          <h4>Our Friends</h4>
          <ul>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="http://dosomethingstrategic.org/"
                onClick={event =>
                  handleFooterTracking('our_friends', event.target.href)
                }
              >
                DoSomethingStrategic.org
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about/our-partners"
                onClick={event =>
                  handleFooterTracking('our_partners', event.target.href)
                }
              >
                Partners
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about/hotline-list"
                onClick={event =>
                  handleFooterTracking('crisis_hotlines', event.target.href)
                }
              >
                Crisis Hotlines
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__column -links">
          <h4>Get Involved</h4>
          <ul>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about/volunteer-hours"
                onClick={event =>
                  handleFooterTracking('volunteer_hours', event.target.href)
                }
              >
                Volunteer Hours
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about/join-our-team"
                onClick={event =>
                  handleFooterTracking('jobs', event.target.href)
                }
              >
                Jobs
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about/internships"
                onClick={event =>
                  handleFooterTracking('internships', event.target.href)
                }
              >
                Internships
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="/us/about/donate"
                onClick={event =>
                  handleFooterTracking('donate', event.target.href)
                }
              >
                Donate
              </a>
            </li>
            <li>
              <a
                className="font-bold no-underline hover:underline"
                href="https://help.dosomething.org/hc/en-us"
                onClick={event =>
                  handleFooterTracking('help_center', event.target.href)
                }
              >
                Help Center
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__subfooter border-gray-700">
        <ul>
          <li>
            <a
              className="font-bold no-underline hover:underline"
              href="/us/about/terms-service"
              onClick={event =>
                handleFooterTracking('terms_of_service', event.target.href)
              }
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              className="font-bold no-underline hover:underline"
              href="/us/about/privacy-policy"
              onClick={event =>
                handleFooterTracking('privacy_policy', event.target.href)
              }
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default SiteFooter;
