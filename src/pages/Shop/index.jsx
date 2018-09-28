// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import { getCategories } from '../../actions/categoryActions';
import Shop from './Shop';
import type { Location, History } from '../../PropTypes/Router';
import type { Category, Product } from '../../PropTypes/Shop';

type Match = {
  isExact: boolean,
  params: {page: string, category: string},
  path: string,
  url: string,
}

type ShopContainerState = {
  curPage: number,
  category: string,
}

type ShopContainerProps = {
  getProducts: (
    category: string,
    page: number,
    callback?: () => void,
  ) => void,
  getCategories: (
    cached: boolean,
    callback?: () => void,
  ) => void,
  products: Array<Product>,
  pages: number,
  categories: Array<Category>,
  category: string,
  showLoading: boolean,
  match: Match,
  history: History,
  location: Location,
}

class ShopContainer extends Component<ShopContainerProps, ShopContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      curPage: 1,
      category: 'all-items',
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.dec = this.dec.bind(this);
    this.inc = this.inc.bind(this);
    this.onClickPage = this.onClickPage.bind(this);
    this.onClickProduct = this.onClickProduct.bind(this);
  }

  componentDidMount() {
    this.props.getCategories(true);
    let page = this.props.match.params.page || 1;
    page = Number(page);
    let category = this.props.match.params.category || 'all-items';
    this.setState({ curPage: page, category });
    this.props.getProducts(category, page);
    this.unlisten = this.props.history.listen((location, action) => {
      if (action === 'POP') {
        const pathname = location.pathname.split('\/');
        page = pathname[3] || 1;
        page = Number(page);
        category = pathname[2] || 'all-items';
        this.props.getProducts(
          category,
          page,
          () => this.setState({ curPage: Number(page) }),
        );
      }
    });
  }

  unlisten: () => void

  componentWillUnmount() { this.unlisten(); }

  handleOptionChange: (event: SyntheticEvent<*>, name: string) => void

  handleOptionChange(event, category) {
    this.setState({ category });
    this.props.getProducts(category, 1);
  }

  dec: () => void;

  dec() {
    const { category } = this.state;
    let curPage = this.state.curPage - 1;
    if (curPage <= 0) {
      curPage = 1;
    }
    this.setState({ curPage });
    this.props.history.push(`/shop/${category}/${curPage}`);
    this.props.getProducts(category, curPage);
  }

  inc: () => void

  inc() {
    const { pages } = this.props;
    let { curPage } = this.state;
    const { category } = this.state;
    if ((curPage + 1) > pages) {
      curPage = pages;
    } else {
      curPage += 1;
    }
    this.setState({ curPage });
    this.props.history.push(`/shop/${category}/${curPage}`);
    this.props.getProducts(this.state.category, curPage);
  }

  onClickPage: (page: number) => void

  onClickPage(page) {
    const { category } = this.state;
    this.setState({ curPage: page });
    this.props.history.push(`/shop/${category}/${page}`);
    this.props.getProducts(category, page);
  }

  onClickProduct: (id: string) => void

  onClickProduct = (name) => {
    this.props.history.push(`/detail/${name}`);
  }

  render() {
    const {
      products,
      pages,
      categories,
      showLoading,
    } = this.props;
    const { curPage, category } = this.state;
    return (
      <Shop
        products={products}
        categories={categories}
        handleOptionChange={this.handleOptionChange}
        category={category}
        dec={this.dec}
        inc={this.inc}
        onClickPage={this.onClickPage}
        curPage={curPage}
        max={pages}
        onClickProduct={this.onClickProduct}
        showLoading={showLoading}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: (
    category,
    page,
    callback,
  ) => dispatch(getProducts(category, page, callback)),
  getCategories: (cached, callback) => dispatch(getCategories(cached, callback)),
});


const mapStateToProps = state => ({
  products: state.products.products,
  pages: state.products.pages,
  categories: state.categories.categories,
  showLoading: state.products.showLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer);
