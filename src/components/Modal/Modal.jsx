import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalBlock, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleModal);
  }

  hendleModal = e => {
    if (e.code === 'Escape') {
      console.log(e.code);
      this.props.closeModal();
    }
  };

  handleBackdrop = event => {
    console.log(event.target);
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { closeModal, modalImg, modalAlt } = this.props;

    return createPortal(
      <Overlay onClick={closeModal}>
        <ModalBlock>
          <img src={modalImg} alt={modalAlt} />
        </ModalBlock>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  modalAlt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
