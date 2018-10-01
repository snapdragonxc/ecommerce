// @flow

import React from 'react';
import Carousel from '../../components/Carousel';
import Featured from './Featured';
import BannerResponsive from '../../components/Carousel/BannerResponsive';
import { IMG_URL } from '../../constants';
import type { Product } from '../../PropTypes/Shop';

type HomeProps = {
  width: number,
  height: number,
  imgs: Array<string>,
  products: Array<Product>,
  onClickProduct: (string) => void,
};

const Home = ({
  width,
  height,
  imgs,
  products,
  onClickProduct,
}: HomeProps) => (
  <div className="wrapper">
    <div className="home__truncate">
      <Carousel width={width} height={height} imgs={imgs}/>
    </div>
    <BannerResponsive/>
    <section className="featured">
      <h2 className="featured__title">FEATURED PRODUCTS</h2>
      <div className="featured__line"></div>
      <div className="row">
        {
          products.map((product, index) => (
            <div key={index} className="featured__product">
              <Featured
                price={product.price}
                name={product.name}
                src={IMG_URL + product.img}
                onClickProduct={onClickProduct}
              />
            </div>
          ))
        }
        <div className="clearfix"></div>
      </div>
    </section>
  </div>
);

export default Home;
