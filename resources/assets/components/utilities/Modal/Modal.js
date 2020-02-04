/* global window, document */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

import ModalContent from './ModalContent';
import { trackAnalyticsEvent } from '../../../helpers/analytics';

import './modal.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalPortal = document.getElementById('modal-portal');

    this.chrome = document.getElementById('chrome');
    this.el = document.createElement('div');
    this.el.className = 'wrapper';
    this.scrollOffset = window.scrollY;
  }

  componentDidMount() {
    this.chrome.classList.add('-lock');
    this.chrome.setAttribute(
      'style',
      `transform: translateY(-${this.scrollOffset}px)`,
    );
    this.modalPortal.classList.add('is-active');
    this.modalPortal.appendChild(this.el);

    // Track in analytics that the modal opened:
    // @TODO: See if this conflicts with the DissmissableElement analytics events.
    if (this.props.trackingId) {
      trackAnalyticsEvent('opened_modal', {
        action: 'modal_opened',
        category: 'modal',
        label: this.props.trackingId || 'modal',
        context: {
          ...this.props.context,
          modalType: this.props.trackingId,
        },
      });
    }
  }

  componentWillUnmount() {
    this.chrome.classList.remove('-lock');
    this.chrome.removeAttribute('style');
    window.scroll(0, this.scrollOffset);
    this.modalPortal.classList.remove('is-active');
    this.modalPortal.removeChild(this.el);

    // Track in analytics that the modal closed:
    if (this.props.trackingId) {
      trackAnalyticsEvent('closed_modal', {
        action: 'modal_closed',
        category: 'modal',
        label: this.props.trackingId || 'modal',
        context: {
          ...this.props.context,
          modalType: this.props.trackingId,
        },
      });
    }
  }

  render() {
    const children = (
      <ModalContent
        onClose={this.props.onClose}
        className={this.props.className}
      >
        {this.props.children}
      </ModalContent>
    );

    return ReactDom.createPortal(children, this.el);
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  context: PropTypes.object,
  trackingId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Modal.defaultProps = {
  context: {},
  trackingId: null,
  className: null,
};

export default Modal;
