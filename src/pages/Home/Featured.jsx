// @flow

import React from 'react';

type FeaturedProps = {
  name: string,
  src: string,
  price: number,
};

const Featured = ({ name, src, price }: FeaturedProps) => (
  <div className="sm-col-span-12 lg-col-span-4">
    <figure className="figure">
      <div className="img">
          <img className="img__content img__content--nav" src={src} alt="none set"/>
      </div>
      <figcaption className="figure__caption">
          <h3 className="figure__caption-name">{name}</h3>
          <p className="figure__caption-price">${price}</p>
      </figcaption>
    </figure>
  </div>
);
export default Featured;
