// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import DashboardNav from './DashboardNav';

type Location = {
  pathname: string
}

type HeaderProps = {
  location: Location,
  total: number,
  numberItems: number,
  logout: () => void,
};

const Header = ({
  location: { pathname },
  total,
  numberItems,
  logout,
}: HeaderProps) => (
  <div>
    <section className="splash">
        <span className="splash__email"><i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;charm.accessories.au@gmail.com&nbsp;&nbsp;</span>
        <span className="splash__phone"><i className="fa fa-phone" aria-hidden="true"></i>&nbsp;040310 6523</span>
    </section>
    <div className="wrapper">
      <header>
        <div className="logo">
          <Link to="/" ><img className="logo__img" src="/images/front/logo.png" /></Link>
        </div>
        {
          (pathname.match(/dashboard\/\w/) !== null)
            ? <DashboardNav logout={logout}/>
            : <Nav total={total} numberItems={numberItems} />
        }
        <div className="clearfix"></div>
      </header>
      <h2 className="message">FREE SHIPPING AUSTRALIA WIDE ON ALL ITEMS</h2>
    </div>
  </div>
);
export default Header;
