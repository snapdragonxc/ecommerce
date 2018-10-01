// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type NavState = {
  navClass: string,
}

type NavProps = {
  numberItems: number,
}

class Nav extends Component<NavProps, NavState> {
  constructor(props: NavProps) {
    super(props);
    this.state = { navClass: 'site-nav' };
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu: () => void;

  openMenu() {
    let { navClass } = this.state;
    if (navClass === 'site-nav') {
      navClass += ' responsive';
    } else {
      navClass = 'site-nav';
    }
    this.setState({ navClass });
  }

  closeMenu: () => void;

  closeMenu() {
    this.setState({ navClass: 'site-nav' });
  }

  render() {
    const { navClass } = this.state;
    const { numberItems } = this.props;
    return (
      <ul className={navClass}>
        <li className="site-nav-icon" onClick={() => this.openMenu()} >
          <a className="site-nav-icon-link">&#9776;</a></li>
        <li><Link to="/" onClick={this.closeMenu}>HOME</Link></li>
        <li><Link to="/shop" onClick={this.closeMenu}>SHOP</Link></li>
        <li><Link to="/about" onClick={this.closeMenu}>ABOUT</Link></li>
        <li><Link to="/faq" onClick={this.closeMenu}>FAQ</Link></li>
        <li><Link to="/contact" onClick={this.closeMenu}>CONTACT</Link></li>
        <li><Link to="/cart">
          <i className="fa fa-shopping-cart navigation__cart" aria-hidden="true"></i>
           {
             numberItems > 0
             && ` (${numberItems})`
           }
         </Link>
        </li>
      </ul>
    );
  }
}

export default Nav;
