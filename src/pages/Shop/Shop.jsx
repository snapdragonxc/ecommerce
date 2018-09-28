// @flow

import React from 'react';
import ProductItem from './ProductItem';
import CategoryOption from './CategoryOption';
import Paginator from '../../components/Paginator';
import { IMG_URL } from '../../constants';
import type { Category, Product } from '../../PropTypes/Shop';

type ShopProps = {
  products: Array<Product>,
  categories: Array<Category>,
  handleOptionChange: (event: SyntheticEvent<*>, name: string) => void,
  category: string,
  dec: () => void,
  inc: () => void,
  onClickPage: (page: number) => void,
  curPage: number,
  max: number,
  onClickProduct: (string) => void,
  showLoading: boolean,
};

const Shop = ({
  products,
  categories,
  handleOptionChange,
  category,
  dec,
  inc,
  onClickPage,
  curPage,
  max,
  onClickProduct,
  showLoading,
}: ShopProps) => {
  let loading = 'products__loading products__loading--hide';
  if (showLoading) {
    loading = 'products__loading products__loading--show';
  }
  return (
    <div className="wrapper">
      <section className="shop">
        <div className="row">
            <div className="sm-col-span-12 lg-col-span-3">
              <h2 className="menu-title">SHOP</h2>
              <div className="menu-line"></div>
                <ul className="category">
                  <li key={0} className="category__item">
                    <CategoryOption name={'all-items'} handleOptionChange={handleOptionChange} category={category}/>
                  </li>
                  {
                    categories.map(({ name }, index) => (
                    <li key={index + 1} className="category__item">
                      <CategoryOption
                        name={name}
                        handleOptionChange={handleOptionChange}
                        category={category}
                      />
                    </li>))
                  }
                  <div className="clearfix"></div>
                </ul>
              <div className="menu-line"></div>
            </div>
            <div className="products__ref sm-col-span-12 lg-col-span-9">
              <ul className="products">
                <p className={loading}></p>
                {
                  products.map(({
                    price,
                    name,
                    img,
                  }, index) => (
                    <li key={index} className="products__item">
                      <ProductItem
                        price={price}
                        name={name}
                        src={ `${IMG_URL + img.slice(0, -4)}_thb.jpg`}
                        onClickProduct={onClickProduct}
                      />
                    </li>))
                }
                <div className="clearfix"></div>
              </ul>
              <Paginator
                dec={dec}
                inc={inc}
                onClickPage={onClickPage}
                curPage={curPage}
                max={max}
              />
            </div>
            <div className="clearfix"></div>
        </div>
      </section>
    </div>);
};
export default Shop;
