import React, { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar/Searchbar';
import css from './App.module.css';
import fetchPhotos from '../API/pixabay-api';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleSearch = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.search.value.trim().toLowerCase();
    if (searchQuery === '') {
      toast.error('Sorry, there are no images matching your search query.');
      return;
    } else setQuery(searchQuery);
    setPage(1);
    setImages([]);
    if (searchQuery === query) {
      toast.error('Please enter a new search.');
      setBtnLoadMore(false);
    }

    form.reset();
  };

  useEffect(() => {
    if (!query) return;
    async function fetchImages() {
      try {
        setLoading(true);
        const resp = await fetchPhotos(query, page);
        const newImages = resp.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        setImages(prevImages => [...prevImages, ...newImages]);

        if (resp.totalHits !== 0 && page === 1) {
          toast.success(`Hooray! We found ${resp.totalHits} images!`);
        }
        const totalPage = Math.ceil(resp.totalHits / 12);

        if (totalPage > page) {
          setBtnLoadMore(true);
        } else if (totalPage === page && resp.totalHits) {
          toast.error("Sorry, but you've reached the end of search results.");
          setBtnLoadMore(false);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = someDataToModal => {
    setIsOpenModal(true);
    setModalData(someDataToModal);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalData(null);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearch} />
      {loading && <Loader />}

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {btnLoadMore && <Button onClick={handleLoadMore} />}
      <Toaster
        autoClose={3000}
        position="top-right"
        containerClassName="text-base"
      />

      {(modalData !== null || isOpenModal) && (
        <Modal closeModal={closeModal} modalData={modalData} />
      )}
    </div>
  );
};

export default App;
