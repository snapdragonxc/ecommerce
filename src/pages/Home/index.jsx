// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  }

  componentDidMount() {
    this.props.getDisplayProducts();
  }

  render() {
    const { width, height, imgs } = this.state;
    const { products } = this.props;
    return <Home width={width} height={height} imgs={imgs} products={products}/>;
  }
}

const mapDispatchToProps = dispatch => ({
  getDisplayProducts: () => dispatch(getDisplayProducts()),
});

const mapStateToProps = state => ({
  products: state.products.display,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
