// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type NavProps = {
  numberItems: number,
};

const Nav = ({ numberItems }: NavProps) => (
  <ul className="nav">
    <li className="nav__item"><Link to="/" className="nav__link">HOME</Link></li>
    <li className="nav__item"><Link to="/shop" className="nav__link">SHOP</Link></li>
    <li className="nav__item"><Link to="/about" className="nav__link">ABOUT</Link></li>
    <li className="nav__item"><Link to="/faq" className="nav__link">FAQ</Link></li>
    <li className="nav__item"><Link to="/contact" className="nav__link">CONTACT</Link></li>
    <li className="nav__item"><Link to="/cart" className="nav__link">
      <i className="fa fa-shopping-cart navigation__cart" aria-hidden="true"></i> ({numberItems})</Link></li>
  </ul>
);
export default Nav;
