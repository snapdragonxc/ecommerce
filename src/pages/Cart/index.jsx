// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router';
import {
  getCart,
  updateCartItem,
  deleteCartItem,
  deleteCartAll,
} from '../../actions/cartActions';
import Cart from './Cart';
import CartMessage from './CartMessage';
import type { Product } from '../../PropTypes/Shop';


type Item = {
  product: Product,
  subTotal: number,
  qty: number,
}

type CartContainerState = {
  items: Array<Item>,
  total: number,
  numberItems: number,
  message: string,
};

type CartContainerProps = {
  imgs: Array<string>,
  width: number,
  height: number,
  cart: { items: Array<Item>, total: number, numberItems: number },
  getCart: (callback: () => void) => void,
  updateCartItem: (item: Item, callback: () => void) => void,
  deleteCartItem: (item: Item, callback: () => void) => void,
  deleteCartAll: (callback?: () => void) => void,
  history: RouterHistory,
};

class CartContainer extends Component<CartContainerProps, CartContainerState> {
  constructor(props: CartContainerProps) {
    super(props);
    this.state = {
      items: [],
      total: 0,
      numberItems: 0,
      message: '',
    };
    this.addQty = this.addQty.bind(this);
    this.subQty = this.subQty.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onPay = this.onPay.bind(this);
  }

  componentDidMount() {
    if (this.props.cart.items.length === 0) {
      this.props.getCart(() => {
        const { items, total, numberItems } = this.props.cart;
        this.setState({
          items,
          total,
          numberItems,
          message: '',
        });
      });
    } else {
      const { items, total, numberItems } = this.props.cart;
      this.setState({
        items,
        total,
        numberItems,
        message: '',
      });
    }
  }

  onDelete: (index: number) => void

  onDelete(index) {
    const item = this.state.items[index];
    this.props.deleteCartItem(item, () => {
      const { items, total, numberItems } = this.props.cart;
      this.setState({ items, total, numberItems });
    });
  }

  addQty: (index: number) => void

  addQty(index) {
    const item = this.state.items[index];
    item.qty += 1;
    item.subTotal += item.product.price;
    this.props.updateCartItem(item, () => {
      const { items, total, numberItems } = this.props.cart;
      this.setState({ items, total, numberItems });
    });
  }

  subQty: (index: number) => void

  subQty(index) {
    const item = this.state.items[index];
    if ((item.qty - 1) > 0) {
      item.qty -= 1;
      item.subTotal -= item.product.price;
      this.props.updateCartItem(item, () => {
        const { items, total, numberItems } = this.props.cart;
        this.setState({ items, total, numberItems });
      });
    }
  }

  onPay: () => void

  onPay() {
    this.props.deleteCartAll();
    this.setState({ message: 'Payment successful' });
  }

  goBack: () => void

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const {
      items,
      total,
      numberItems,
      message,
    } = this.state;
    if (message !== '') {
      return <CartMessage goBack={this.goBack} message={message}/>;
    }
    if (numberItems === 0) {
      return <CartMessage goBack={this.goBack} message='Your cart is empty'/>;
    }
    return (
      <Cart
        items={items}
        total={total}
        numberItems={numberItems}
        addQty={this.addQty}
        subQty={this.subQty}
        onDelete={this.onDelete}
        onPay={this.onPay}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: callback => dispatch(getCart(callback)),
  updateCartItem: (item, callback) => dispatch(updateCartItem(item, callback)),
  deleteCartItem: (item, callback) => dispatch(deleteCartItem(item, callback)),
  deleteCartAll: callback => dispatch(deleteCartAll(callback)),
});

const mapStateToProps = state => ({ cart: state.cart });

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
