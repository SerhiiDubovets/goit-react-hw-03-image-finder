import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class App extends Component {
  state = {
    galleryName: '',
    page: 1,
  };

  handleSearchGallery = galleryName => {
    this.setState({ galleryName, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { galleryName, page } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchGallery} />
        <ImageGallery
          galleryName={galleryName}
          onLoadMore={this.loadMore}
          numberPage={page}
        />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
