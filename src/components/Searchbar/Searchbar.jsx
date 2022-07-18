import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchButton,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    galleryName: '',
  };

  handleNameChange = event => {
    this.setState({ galleryName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { galleryName } = this.state;

    if (galleryName.trim() === '') {
      toast.error('Введите название поиска');
      return;
    }

    this.props.onSubmit(galleryName);
    this.setState({ galleryName: '' });
  };

  render() {
    const { galleryName } = this.state;

    return (
      <Header>
        <SearchForm
          onSubmit={this.handleSubmit}
          onChange={this.handleNameChange}
        >
          <SearchButton type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>

          <SearchInput
            onChange={this.handleNameChange}
            value={galleryName}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
