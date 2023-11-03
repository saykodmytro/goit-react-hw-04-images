import css from './Modal.module.css';
import React, { Component } from 'react';

export default class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleOverlayClick = evt => {
    if (evt.target !== evt.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { modalData } = this.props;
    return (
      <div onClick={this.handleOverlayClick} className={css.overlay}>
        <div className={css.modal}>
          <img
            className={css.imgModal}
            src={modalData.largeImageURL}
            alt={modalData.tags}
            width="800"
          />
        </div>
      </div>
    );
  }
}
