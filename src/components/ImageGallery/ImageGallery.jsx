import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadMore from '../Button';
import Loader from '../Loader';
import Modal from '../Modal';
import { Gallery } from './ImageGallery.styled';
import { getGallery } from '../Services/Api.js';
import NotFound from '../NotFound';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    error: null,
    status: 'idle',
    resolve: null,
    errors: '',
    galleryName: '',
    showModal: false,
    modalImg: '',
    modalAlt: '',
    isLoader: false,
  };

  // idle - запроса ещё нет
  // pending - пошел запрос
  // resolved - успешный запрос
  // rejected - запрос с ошибкой

  // -----Fetch случайные картинки-----
  async componentDidMount() {
    try {
      this.setState({ status: 'pending' });
      const resolve = await getGallery(
        this.props.galleryName,
        this.props.numberPage
      );
      this.setState({ status: 'resolved' });
      this.setState({
        gallery: resolve.data.hits,
        resolve: resolve.data.hits.length,
      });
    } catch (error) {
      this.setState({ status: 'rejected', errors: error.message });
      console.log(error.message);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.galleryName !== this.props.galleryName) {
      this.setState({ page: 1, gallery: [], isLoader: true });
    }

    if (
      prevProps.galleryName !== this.props.galleryName ||
      prevProps.numberPage !== this.props.numberPage
    ) {
      try {
        const resolve = await getGallery(
          this.props.galleryName,
          this.props.numberPage
        );
        this.setState({ status: 'resolved', isLoader: false });
        if (prevState.galleryName !== this.state.galleryName) {
          this.setState({
            gallery: [...resolve.data.hits],
          });
        }
        this.setState(prevProps => ({
          resolve: resolve.data.hits.length,
          gallery: [...prevProps.gallery, ...resolve.data.hits],
          status: 'resolved',
        }));
        if (resolve.data.hits.length === 0) {
          toast.error('Что-то пашло не так (: ');
          return;
        }
      } catch (error) {
        this.setState({ status: 'rejected', errors: error.message });
      }
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModalImg = (img, imgAlt) => {
    this.setState({ modalImg: img, modalAlt: imgAlt });
  };

  render() {
    const {
      gallery,
      status,
      resolve,
      errors,
      showModal,
      modalImg,
      modalAlt,
      isLoader,
    } = this.state;
    const { galleryName, onLoadMore } = this.props;

    if (resolve === 0) {
      return <NotFound galleryName={galleryName} />;
    }

    if (status === 'pending' || isLoader) {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h2>{errors}</h2>;
    }

    if (status === 'resolved') {
      return (
        <>
          <Gallery>
            {gallery.map(image => (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                modalOpen={this.toggleModal}
                handleModalImg={this.handleModalImg}
                largeImg={image.largeImageURL}
                imgAlt={image.tags}
              />
            ))}
            {showModal && (
              <Modal
                modalAlt={modalAlt}
                modalImg={modalImg}
                closeModal={this.toggleModal}
              />
            )}
          </Gallery>
          {resolve >= 12 && <LoadMore Click={onLoadMore} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  galleryName: PropTypes.string.isRequired,
};
