import React from 'react';
import { HiSearch } from 'react-icons/hi';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmit}>
        <button type="submit" className={css.button}>
          <HiSearch size={24} />
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          name="search"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
