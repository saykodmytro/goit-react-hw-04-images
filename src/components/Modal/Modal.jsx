import css from './Modal.module.css';
import React, { useEffect } from 'react';

const Modal = ({ closeModal, modalData }) => {
  const handleOverlayClick = evt => {
    if (evt.target !== evt.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div onClick={handleOverlayClick} className={css.overlay}>
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
};

export default Modal;
