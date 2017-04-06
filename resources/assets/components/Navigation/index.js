import React from 'react';
import { Link } from 'react-router';
import FeedEnclosure from '../FeedEnclosure';
import './navigation.scss';

export const Navigation = ({children}) => (
  <FeedEnclosure>
    { children }
  </FeedEnclosure>
);

export const NavigationLink = props => (
  <Link {...props} className="nav-link" activeClassName="is-active" />
);
