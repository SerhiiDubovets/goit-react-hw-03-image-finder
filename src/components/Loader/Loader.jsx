import { Rings } from 'react-loader-spinner';
import { Spinner } from './Loader.styled.js';

const Loader = () => {
  return (
    <Spinner>
      <Rings color="#00BFFF" height={120} width={120} ariaLabel="loading" />
    </Spinner>
  );
};

export default Loader;
