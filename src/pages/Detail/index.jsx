// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCartItem } from '../../actions/cartActions';
import { getProducts } from '../../actions/productActions';
import { getProductByName } from '../../services/productService';
import Detail from './Detail';
import type { History } from '../../PropTypes/Router';
import type { Product } from '../../PropTypes/Shop';

type Match = {
  isExact: boolean,
  params: {name: string},
  path: string,
  url: string,
}

type Item = {
  product: Product,
  qty: number,
  subTotal: number,
};

type DetailContainerState = {
  qty: number,
  product: Product,
  error?: string,
}

type DetailContainerProps = {
  products: Array<Product>,
  showLoading: boolean,
  saveCartItem: (item: Item, () => void) => void,
  match: Match,
  history: History,
}

class DetailContainer extends Component<DetailContainerProps, DetailContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        _id: '',
        name: '',
        sku: '',
        description: '',
        category: '',
        price: 0,
        saleprice: 0,
        img: '',
        inventory: 0,
        onDisplay: false,
      },
      qty: 1,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.qtySub = this.qtySub.bind(this);
    this.qtyAdd = this.qtyAdd.bind(this);
  }

  componentDidMount() {
    const { name } = this.props.match.params;
    const product = this.props.products.find(prod => prod.name === name);
    if (product === undefined) {
      getProductByName(name, false)
        .then((data) => {
          this.setState({ product: data });
        })
        .catch((err) => {
          this.setState({ error: err });
        });
    } else {
      this.setState({ product });
    }
  }

  onSubmit: (event: SyntheticEvent<*>) => void

  onSubmit(event) {
    event.preventDefault();
    const item = {
      product: this.state.product,
      qty: this.state.qty,
      subTotal: this.state.qty * this.state.product.price,
    };
    this.props.saveCartItem(item, () => {
      this.props.history.goBack();
    });
  }

  qtySub: () => void

  qtySub() {
    let { qty } = this.state;
    qty -= 1;
    if (qty < 1) {
      qty = 1;
    }
    this.setState({ qty });
  }

  qtyAdd: () => void

  qtyAdd() {
    let { qty } = this.state;
    qty += 1;
    this.setState({ qty });
  }

  render() {
    const { product, qty } = this.state;
    return <Detail
      name={product.name}
      sku={product.sku}
      price={product.price}
      src={product.img}
      qty={qty}
      onSubmit={this.onSubmit}
      qtySub={this.qtySub}
      qtyAdd={this.qtyAdd}
    />;
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: (category, page, callback) => dispatch(getProducts(category, page, callback)),
  saveCartItem: (item, callback) => dispatch(saveCartItem(item, callback)),
});

const mapStateToProps = state => ({
  products: state.products.products,
  product: state.products.product,
  cart: state.cart,
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
