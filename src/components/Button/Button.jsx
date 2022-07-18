import { Button } from './Button.styled';
import PropTypes from 'prop-types';

const LoadMore = ({ Click }) => {
  return <Button onClick={Click}>Load more</Button>;
};

export default LoadMore;

Button.propTypes = {
  Click: PropTypes.func,
};
