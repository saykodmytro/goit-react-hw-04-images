import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, openModal }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItem}
        src={src}
        alt={alt}
        onClick={() => openModal({ largeImageURL: src, tags: alt })}
      />
    </li>
  );
};

export default ImageGalleryItem;
