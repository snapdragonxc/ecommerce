// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/categoryActions';
import Verify from '../../services/verify';
import CategoriesMng from './CategoriesMng';
import type { Category } from '../../PropTypes/Shop';

type CategoriesMngContainerState = {
  categories: Array<Category>,
  name: string,
  error: {name?: string},
}

type CategoriesMngContainerProps = {
  getCategories: (cached: boolean, callback: () => void) => void,
  deleteCategory: (_id: string, callback: () => void) => void,
  addCategory: (name: string, callback: () => void) => void,
  categories: Array<Category>,
}

class CategoriesMngContainer extends
  Component<CategoriesMngContainerProps, CategoriesMngContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      name: '',
      error: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount() {
    this.props.getCategories(false, () => {
      const { categories } = this.props;
      this.setState({ categories });
    });
  }

  handleChange: (event: SyntheticEvent<*>) => void

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  remove: (_id: string) => void

  remove(_id) {
    this.props.deleteCategory(_id, () => {
      const { categories } = this.props;
      this.setState({ categories });
    });
  }

  add: () => void

  add() {
    const error = CategoriesMngContainer.validate(this.state.name);
    if (Verify.isEmptyObject(error)) {
      this.props.addCategory(this.state.name, () => {
        const { categories } = this.props;
        this.setState({ categories, name: '' });
      });
    } else {
      this.setState({ error });
    }
  }

  onFocus: () => void

  onFocus() {
    this.setState({ error: {} });
  }

  static validate(name) {
    const error = {};
    if (!Verify.isEmpty(name)) {
      error.name = 'A name must be given';
    }
    return error;
  }

  render() {
    const { categories, name, error } = this.state;
    return (
      <CategoriesMng
        categories={categories}
        category={name}
        handleChange={this.handleChange}
        remove={this.remove}
        add={this.add}
        error={error}
        onFocus={this.onFocus}
      />
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
});
export default connect(mapStateToProps, actions)(CategoriesMngContainer);
