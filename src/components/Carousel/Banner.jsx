import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => (
  <div className="banner__caption">
    <h1 className="banner__caption-title">FASHION JEWELLERY</h1>
    <p className="banner__caption-txt">Elegant, charming and beautiful jewellery for your every occasion from wedding to formal
    or casual events. Fast delivery from Sydney, Australia wide.</p>
    <div className="banner__caption-btn">
        <Link to="/shop" className="btn">SHOP NOW</Link>
    </div>
  </div>
);
export default Banner;
