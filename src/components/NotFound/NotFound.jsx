import ww from '../images/square_вектор-08.jpg';
import { NotFoundBlock } from './notFound.styled';
import PropTypes from 'prop-types';

const NotFound = ({ galleryName }) => {
  return (
    <NotFoundBlock>
      <img src={ww} alt="Not Found" />
      <h2>По запросу "{galleryName}" ничего не найдено!!! </h2>
    </NotFoundBlock>
  );
};
export default NotFound;

NotFound.propTypes = {
  galleryName: PropTypes.string.isRequired,
};
