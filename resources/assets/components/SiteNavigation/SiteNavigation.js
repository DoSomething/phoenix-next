/* global document */
/* eslint-disable id-length, jsx-a11y/interactive-supports-focus, jsx-a11y/no-autofocus */

import React from 'react';
import { get } from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import SearchIcon from '../artifacts/SearchIcon/SearchIcon';
import CloseButton from '../artifacts/CloseButton/CloseButton';
import ProfileIcon from '../artifacts/ProfileIcon/ProfileIcon';
import DoSomethingLogo from '../utilities/DoSomethingLogo/DoSomethingLogo';
import {
  trackAnalyticsEvent,
  getUtmContext,
  getPageContext,
} from '../../helpers/analytics';

import './site-navigation.scss';

class SiteNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      activeSubNav: null,
      isSubNavFixed: false,
    };
  }

  analyzeEvent = (event, analytics = {}) => {
    const targets = {
      A: 'link',
      BUTTON: 'button',
    };

    const inferredTarget = get(targets, event.target.tagName, 'element');

    const target = get(analytics, 'target', inferredTarget);

    const context = get(analytics, 'context', {});

    trackAnalyticsEvent({
      context: {
        ...getPageContext(),
        ...getUtmContext(),
        referrer: document.referrer,
        ...context,
      },
      metadata: {
        adjective: get(analytics, 'adjective', null),
        category: get(analytics, 'category', 'navigation'),
        label: get(analytics, 'label', null),
        noun: get(analytics, 'noun', 'nav_link'),
        target,
        verb: get(analytics, 'verb', 'clicked'),
      },
    });
  };

  handleMouseEnter = subNavName => {
    const { isSubNavFixed } = this.state;

    if (isSubNavFixed) {
      return;
    }

    this.setState({
      activeSubNav: subNavName,
    });
  };

  handleMouseLeave = () => {
    const { isSubNavFixed } = this.state;

    if (isSubNavFixed) {
      return;
    }

    this.setState({
      activeSubNav: null,
    });
  };

  handleOnChange = event => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  handleOnClickLink = (event, analytics = {}) => {
    this.analyzeEvent(event, analytics);

    this.setState({
      activeSubNav: null,
      isSubNavFixed: false,
    });
  };

  handleOnClickToggle = (event, subNavName, analytics = {}) => {
    event.preventDefault();

    this.analyzeEvent(event, analytics);

    const { activeSubNav, isSubNavFixed } = this.state;

    if (activeSubNav === subNavName && isSubNavFixed) {
      this.setState({
        activeSubNav: null,
        isSubNavFixed: false,
      });

      return;
    }

    if (activeSubNav === subNavName && !isSubNavFixed) {
      this.setState({
        isSubNavFixed: true,
      });

      return;
    }

    this.setState({
      activeSubNav: subNavName,
      isSubNavFixed: true,
    });
  };

  handleOnClickClose = (event, analytics = {}) => {
    this.analyzeEvent(event, analytics);

    this.setState({
      activeSubNav: null,
      isSubNavFixed: false,
    });
  };

  handleOnSubmit = (event, analytics = {}) => {
    this.analyzeEvent(event, {
      ...analytics,
      context: { searchQuery: this.state.searchInput },
    });
  };

  render() {
    return (
      <nav role="navigation" id="nav" className="nav">
        <div className="wrapper base-12-grid">
          <div className="logo-nav">
            <a
              href="/"
              onClick={e => this.handleOnClickLink(e, { label: 'homepage' })}
            >
              <DoSomethingLogo />
            </a>
          </div>

          <ul className="main-nav menu-nav">
            <li className="menu-nav__item">
              <a
                href="/us/campaigns"
                onClick={e => this.handleOnClickLink(e, { label: 'campaigns' })}
              >
                Campaigns
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="/us/about/easy-scholarships"
                onClick={e =>
                  this.handleOnClickLink(e, { label: 'scholarships' })
                }
              >
                Scholarships
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="https://lets.dosomething.org"
                onClick={e => this.handleOnClickLink(e, { label: 'articles' })}
              >
                Articles
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="/us/about/who-we-are"
                onClick={e => this.handleOnClickLink(e, { label: 'about' })}
              >
                About
              </a>
            </li>
          </ul>

          <ul className="utility-nav menu-nav">
            <li className="utility-nav__search menu-nav__item">
              <a
                href="#search"
                className={classnames('utility-nav__search-icon', {
                  'is-active': this.state.activeSubNav === 'SearchSubNav',
                })}
                onClick={e =>
                  this.handleOnClickToggle(e, 'SearchSubNav', {
                    label: 'search_form_toggle',
                    noun: 'nav_button',
                  })
                }
              >
                <div className="wrapper">
                  <SearchIcon />
                </div>
              </a>

              {this.state.activeSubNav === 'SearchSubNav' ? (
                <div className="utility-subnav menu-subnav" name="search">
                  <div className="wrapper base-12-grid">
                    <form
                      className="search"
                      id="utility-subnav__search"
                      acceptCharset="UTF-8"
                      action="/us/search"
                      method="GET"
                      onSubmit={e =>
                        this.handleOnSubmit(e, {
                          category: 'search',
                          label: 'search_subnav',
                          noun: 'nav_form',
                          target: 'form',
                          verb: 'submitted',
                        })
                      }
                    >
                      <SearchIcon />
                      <input
                        type="search"
                        placeholder="Search"
                        name="query"
                        autoFocus
                        onChange={this.handleOnChange}
                        onClick={e =>
                          this.analyzeEvent(e, {
                            category: 'search',
                            label: 'search_subnav',
                            noun: 'nav_form',
                            target: 'form',
                            verb: 'clicked',
                          })
                        }
                        value={this.state.searchInput}
                      />
                    </form>

                    <div className="top-searches">
                      <h1>Top Searches</h1>
                      <ul className="top-searches__link-list">
                        <li>
                          <a
                            href="/us/about/easy-scholarships"
                            onClick={e =>
                              this.analyzeEvent(e, {
                                label: 'scholarships_top_search',
                                noun: 'subnav_link',
                              })
                            }
                          >
                            scholarships
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/search?query=bullying"
                            onClick={e =>
                              this.analyzeEvent(e, {
                                label: 'bullying_top_search',
                                noun: 'subnav_link',
                              })
                            }
                          >
                            bullying
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/search?query=animals"
                            onClick={e =>
                              this.analyzeEvent(e, {
                                label: 'animals_top_search',
                                noun: 'subnav_link',
                              })
                            }
                          >
                            animals
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/facts/11-facts-about-cyber-bullying"
                            onClick={e =>
                              this.analyzeEvent(e, {
                                label: 'cyberbullying_top_search',
                                noun: 'subnav_link',
                              })
                            }
                          >
                            cyberbullying
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/articles/volunteer-opportunities-for-teens"
                            onClick={e =>
                              this.analyzeEvent(e, {
                                label: 'volunteering_top_search',
                                noun: 'subnav_link',
                              })
                            }
                          >
                            volunteering
                          </a>
                        </li>
                      </ul>
                    </div>

                    <CloseButton
                      callback={e =>
                        this.handleOnClickClose(e, {
                          label: 'close_search_subnav',
                          noun: 'nav_button',
                        })
                      }
                      className="btn__close--subnav btn__close--search-subnav block"
                      size="22px"
                    />
                  </div>
                </div>
              ) : null}
            </li>

            {this.props.isAuthenticated ? (
              <>
                <li className="utility-nav__account-profile menu-nav__item">
                  <a
                    href="/us/account/profile"
                    className="utility-nav__account-profile-icon"
                    onClick={e => this.analyzeEvent(e, { label: 'profile' })}
                  >
                    <ProfileIcon />
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="utility-nav__auth menu-nav__item">
                  <a
                    href={this.props.authLoginUrl}
                    onClick={e => this.analyzeEvent(e, { label: 'log_in' })}
                  >
                    Log In
                  </a>
                </li>

                <li className="utility-nav__join menu-nav__item">
                  <a
                    href={this.props.authRegisterUrl}
                    onClick={e => this.analyzeEvent(e, { label: 'join_now' })}
                  >
                    Join Now
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        {this.state.activeSubNav ? (
          <div
            className="underlay"
            onClick={e =>
              this.handleOnClickClose(e, {
                label: 'underlay_close_subnav',
                noun: 'nav_element',
              })
            }
            role="button"
          />
        ) : null}
      </nav>
    );
  }
}

SiteNavigation.propTypes = {
  authLoginUrl: PropTypes.string.isRequired,
  authRegisterUrl: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default SiteNavigation;
