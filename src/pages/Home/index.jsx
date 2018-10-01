// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router';
import { getDisplayProducts } from '../../actions/productActions';
import Home from './Home';
import type { Product } from '../../PropTypes/Shop';

type HomeContainerState = {
  width: number,
  height: number,
  imgs: Array<string>,
}

type HomeContainerProps = {
  getDisplayProducts: () => void,
  products: Array<Product>,
  history: RouterHistory,
}

class HomeContainer extends Component<HomeContainerProps, HomeContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      width: 938,
      height: 438,
      imgs: ['./images/front/slide1.jpg',
        './images/front/slide2.jpg',
        './images/front/slide3.jpg',
      ],
    };
    this.onClickProduct = this.onClickProduct.bind(this);
  }

  componentDidMount() {
    this.props.getDisplayProducts();
  }

  onClickProduct: (id: string) => void

  onClickProduct = (name) => {
    this.props.history.push(`/detail/${name}`);
  }

  render() {
    const { width, height, imgs } = this.state;
    const { products } = this.props;
    return (
      <Home
        width={width}
        height={height}
        imgs={imgs}
        products={products}
        onClickProduct={this.onClickProduct}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDisplayProducts: () => dispatch(getDisplayProducts()),
});

const mapStateToProps = state => ({
  products: state.products.display,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
