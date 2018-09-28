import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { getCart } from '../../actions/cartActions';
import { logoutUser } from '../../actions/authActions';

class DashboardHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCart(() => this.setState({})); // to trigger a render after cart props have loaded
  }

  render() {
    return (
      <Header
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: (callback) => {
    dispatch(getCart(callback));
  },
  logout: () => {
    dispatch(logoutUser());
  },
});

const mapStateToProps = state => ({
  total: state.cart.total,
  numberItems: state.cart.numberItems,
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeaderContainer);
