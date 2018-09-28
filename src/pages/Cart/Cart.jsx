// @flow
import React from 'react';
import { IMG_URL } from '../../constants';
import { Spinner } from '../../components/Spinner';

type Product = {
  _id: string,
  name: string,
  sku: string,
  description: string,
  category: string,
  price: number,
  saleprice: number,
  img: string,
  inventory: number,
  onDisplay: boolean
}

type Item = {
  product: Product,
  subTotal: number,
  qty: number,
}

type CartProps = {
  items: Array<Item>,
  total: number,
  numberItems: number,
  addQty: (index: number) => void,
  subQty: (index: number) => void,
  onDelete: (index: number) => void,
};

const Cart = ({
  items,
  total,
  numberItems,
  addQty,
  subQty,
  onDelete,
}: CartProps) => {
  let list = [];
  if (numberItems !== 0) {
    list = items.map(({ product, subTotal, qty }, index) => (
      <div key={index} className="table__r">
        <div className="row">
          <div className="sm-col-span-5 lg-col-span-3">
            <div className="table__d">
              <div className="img img--thb">
                <img className="img__content" src={IMG_URL + product.img} />
              </div>
            </div>
          </div>
          <div className="sm-col-span-7 lg-col-span-4">
            <div className="table__d">
              <div className="cart__item">
                <h3 className="cart__item-name">{product.name}</h3>
                <h4 className="cart__item-sku">Sku: {product.sku}</h4>
                <h4 className="cart__item-price">Price: {product.price}</h4>
                <a className="cart__item-delete"
                  onClick={() => onDelete(index)}>
                  Remove Item
                </a>
                <a className="cart__item-delete-mobile">X</a>
              </div>
            </div>
          </div>
          <div className="sm-col-span-6 lg-col-span-3">
            <div className="table__d table__d--center">
              <Spinner
                value={qty}
                add={() => addQty(index)}
                sub={() => subQty(index)}
             />
            </div>
          </div>
          <div className="sm-col-span-6 lg-col-span-2">
              <div className="table__d table__d--center">
                <p className="cart__item-price--big">{subTotal}</p>
              </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    ));
  }

  return (
    <div className="wrapper">
      <section className="cart">

        <form className="table">
          <div className="table__head">
            <div className="row">
              <div className="lg-col-span-3"><h3 className="table__h">PRODUCT</h3></div>
              <div className="lg-col-span-4"><h3 className="table__h">ITEM</h3></div>
              <div className="lg-col-span-3"><h3 className="table__h table__h--center">QUANTITY</h3></div>
              <div className="lg-col-span-2"><h3 className="table__h table__h--center">TOTAL</h3>
            </div>
            <div className="clearfix"></div>
            </div>
          </div>
          {list}
          <div className="table__foot">
            <h3 className="table__foot-subtotal">Subtotal:&nbsp;&nbsp;${total}</h3>
            <h4 className="table__foot-shipping">GST and shipping are included in total.</h4>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Cart;
