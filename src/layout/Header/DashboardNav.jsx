// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type DashboardNavProps = {
  logout: () => void,
};

const DashboardNav = ({ logout }: DashboardNavProps) => (
  <ul className="nav">
    <li className="nav__item"><Link to="/dashboard/products/1" className="nav__link nav__link--left">PRODUCTS</Link></li>
    <li className="nav__item"><Link to="/dashboard/categories" className="nav__link nav__link--left">CATEGORIES</Link></li>
    <li className="nav__item">
      <Link to="/" className="nav__link" onClick={logout}>
      <i className="fa fa-sign-out navigation__cart" aria-hidden="true"></i> SIGNOUT
    </Link></li>
  </ul>
);
export default DashboardNav;
