import { GalleryItem } from './ImageGalleryItem.styled';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  id,
  webformatURL,
  handleModalImg,
  largeImg,
  imgAlt,
  modalOpen,
}) => {
  return (
    <GalleryItem
      id={id}
      onClick={() => {
        handleModalImg(largeImg, imgAlt);
        modalOpen();
      }}
    >
      <img src={webformatURL} alt={imgAlt} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  handleModalImg: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
