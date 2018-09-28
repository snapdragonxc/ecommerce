// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct, deleteProduct, getEditProducts } from '../../services/productService';
import ProductsMng from './ProductsMng';
import type { Location, History } from '../../PropTypes/Router';
import type { Product } from '../../PropTypes/Shop';

type Match = {
  isExact: boolean,
  params: {page: string, category: string},
  path: string,
  url: string,
}

type ProductsMngContainerState = {
  products: Array<Product>,
  page: number,
  pages: number,
}

type ProductsMngContainerProps = {
  getEditProducts: (
    page: number,
    callback: () => void,
  ) => void,
  products: Array<Product>,
  pages: number,
  match: Match,
  history: History,
  location: Location,
}

class ProductsMngContainer extends Component<ProductsMngContainerProps, ProductsMngContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      page: 1,
      pages: 1,
    };
    this.decPage = this.decPage.bind(this);
    this.incPage = this.incPage.bind(this);
    this.onClickPage = this.onClickPage.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addQty = this.addQty.bind(this);
    this.subQty = this.subQty.bind(this);
    this.onDisplayChange = this.onDisplayChange.bind(this);
  }

  componentDidMount() {
    let page = this.props.match.params.page || 1;
    page = Number(page);
    getEditProducts(page, data => this.setState({
      products: data.products,
      pages: data.pages,
      page: Number(page),
    }));
    this.unlisten = this.props.history.listen((location, action) => {
      if (action === 'POP') {
        const { pathname } = this.props.location;
        page = Number(pathname.substr(pathname.lastIndexOf('/') + 1));
        page = (Number.isNaN(page)) ? 1 : page;
        getEditProducts(page, data => this.setState({
          products: data.products,
          pages: data.pages,
          page: Number(page),
        }));
      }
    });
  }

  unlisten: () => void

  componentWillUnmount() { this.unlisten(); }

  decPage: () => void

  decPage() {
    let page = this.state.page - 1;
    if (page <= 0) {
      page = 1;
    } else {
      getEditProducts(page, (data) => {
        this.setState({
          products: data.products,
          pages: data.pages,
          page,
        });
        this.props.history.push(`/dashboard/products/${page}`);
      });
    }
  }

  incPage: () => void

  incPage() {
    let page = this.state.page + 1;
    if (page > this.state.pages) {
      page = this.state.pages;
      this.setState({ page });
    } else {
      getEditProducts(page, (data) => {
        this.setState({
          products: data.products,
          pages: data.pages,
          page,
        });
        this.props.history.push(`/dashboard/products/${page}`);
      });
    }
  }

  editProduct: (event: SyntheticEvent<*>, _id: string) => void

  editProduct(event, _id) {
    event.preventDefault();
    this.props.history.push(`/dashboard/edit/${_id}`);
  }

  deleteProduct: (event: SyntheticEvent<*>, _id: string) => void

  deleteProduct(event, _id) {
    event.preventDefault();
    deleteProduct(_id).then(() => {
      getEditProducts(this.state.page, data => this.setState({
        products: data.products,
        pages: data.pages,
        page: this.state.page,
      }));
    }).catch((err) => {
      throw (err);
    });
  }

  onClickPage: (page: number) => void

  onClickPage(page) {
    const curPage = Number(page);
    getEditProducts(curPage, (data) => {
      this.setState({
        products: data.products,
        pages: data.pages,
        page: curPage,
      });
      this.props.history.push(`/dashboard/products/${curPage}`);
    });
  }

  addQty: (index: number) => void

  addQty(index) {
    const products = [].concat(this.state.products);
    products[index].inventory += 1;
    updateProduct(products[index]._id, products[index]).then(() => this.setState({ products }));
  }

  subQty: (index: number) => void

  subQty(index) {
    const products = [].concat(this.state.products);
    products[index].inventory -= 1;
    updateProduct(products[index]._id, products[index]).then(() => this.setState({ products }));
  }

  onDisplayChange: (index: number) => void

  onDisplayChange(index) {
    const products = [].concat(this.state.products);
    products[index].onDisplay = !products[index].onDisplay;
    updateProduct(products[index]._id, products[index]).then(() => this.setState({ products }));
  }

  render() {
    const { products, pages, page } = this.state;
    return (
      <ProductsMng
        products={products}
        decPage={this.decPage}
        incPage={this.incPage}
        onClickPage={this.onClickPage}
        curPage={page}
        max={pages}
        editProduct={this.editProduct}
        deleteProduct={this.deleteProduct}
        addQty={this.addQty}
        subQty={this.subQty}
        onDisplayChange={this.onDisplayChange}
      />
    );
  }
}


const mapStateToProps = state => ({
  products: state.products.products,
  pages: state.products.pages,
});
export default connect(mapStateToProps)(ProductsMngContainer);
