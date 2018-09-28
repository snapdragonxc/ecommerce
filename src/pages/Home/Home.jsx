// @flow

import React from 'react';
import Carousel from '../../components/Carousel';
import Featured from './Featured';
import { IMG_URL } from '../../constants';
import type { Product } from '../../PropTypes/Shop';

type HomeProps = {
  width: number,
  height: number,
  imgs: Array<string>,
  products: Array<Product>,
};

const Home = ({
  width,
  height,
  imgs,
  products,
}: HomeProps) => (
  <div className="wrapper">
    <Carousel width={width} height={height} imgs={imgs}/>
    <section className="featured">
      <h2 className="featured__title">FEATURED PRODUCTS</h2>
      <div className="featured__line"></div>
      <div className="row">
        {
          products.map((product, index) => (
            <Featured
              key={index}
              price={product.price}
              name={product.name}
              src={IMG_URL + product.img}
            />))
        }
        <div className="clearfix"></div>
      </div>
    </section>
  </div>
);

export default Home;
