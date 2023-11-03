import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar/Searchbar';
import css from './App.module.css';
import fetchPhotos from '../API/pixabay-api';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    error: false,
    perPage: 12,
    btnLoadMore: false,
    isOpenModal: false,
    modalData: null,
  };

  handleSearch = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.search.value.trim().toLowerCase();
    if (query === '') {
      toast.error('Sorry, there are no images matching your search query.');
      return;
    }
    this.setState({ query: query, page: 1, images: null });
    form.reset();
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });
        const { query, page } = this.state;
        const resp = await fetchPhotos(query, page);

        const newImages = resp.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        this.setState(prevState => ({
          images: [...(prevState.images || []), ...newImages],
        }));

        if (resp.totalHits !== 0 && this.state.page === 1) {
          toast.success(`Hooray! We found ${resp.totalHits} images!`);
        }
        const totalPage = Math.ceil(resp.totalHits / this.state.perPage);

        if (totalPage > page) {
          this.setState({ btnLoadMore: true });
        } else if (totalPage === page && resp.totalHits) {
          toast.error("Sorry, but you've reached the end of search results.");
          this.setState({ btnLoadMore: false });
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = someDataToModal => {
    this.setState({
      isOpenModal: true,
      modalData: someDataToModal,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      modalData: null,
    });
  };

  render() {
    const { images, loading } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearch} />
        {loading && <Loader />}

        {images && images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {this.state.btnLoadMore && <Button onClick={this.handleLoadMore} />}
        <Toaster
          autoClose={3000}
          position="top-right"
          containerClassName="text-base"
        />

        {this.state.modalData !== null && (
          <Modal
            closeModal={this.closeModal}
            modalData={this.state.modalData}
          />
        )}
      </div>
    );
  }
}
