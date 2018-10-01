import React from 'react';
import { Link } from 'react-router-dom';

const BannerResponsive = () => (
  <div className="banner-resp__caption">
    <h1 className="banner-resp__caption-title">FASHION JEWELLERY</h1>
    <p className="banner-resp__caption-txt">Elegant, charming and beautiful jewellery for your every occasion from wedding to formal
    or casual events. Fast delivery from Sydney, Australia wide.</p>
    <div className="banner-resp__caption-btn">
        <Link to="/shop" className="btn">SHOP NOW</Link>
    </div>
  </div>
);
export default BannerResponsive;
