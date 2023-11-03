import React from 'react';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={css.buttonLoadMore} type="button" onClick={onClick}>
      Load More
    </button>
  );
};

export default Button;
