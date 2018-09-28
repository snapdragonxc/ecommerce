// @flow

import React from 'react';

type ProductItemProps = {
  src: string,
  name: string,
  price: number,
  onClickProduct: (name: string) => void,
};

const ProductItem = ({
  src,
  name,
  price,
  onClickProduct,
}: ProductItemProps) => (
  <figure>
    <div className="img" onClick={() => onClickProduct(name)}>
      <img className="img__content img__content--nav" src={src}/>
    </div>
    <figcaption className="figure__caption figure__caption--left">
      <h3 className="figure__caption-name">{name}</h3>
      <p className="figure__caption-price">${price}</p>
    </figcaption>
  </figure>
);
export default ProductItem;
