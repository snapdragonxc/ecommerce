// @flow

import React from 'react';
import { Spinner } from '../../components/Spinner';
import { IMG_URL } from '../../constants';

type DetailProps = {
  src: string,
  name: string,
  sku: string,
  price: number,
  qty: number,
  onSubmit: (event: SyntheticEvent<*>) => void,
  qtySub: () => void,
  qtyAdd: () => void,
  onClickBack: () => void,
};

const Detail = ({
  src,
  name,
  sku,
  price,
  qty,
  onSubmit,
  qtySub,
  qtyAdd,
  onClickBack,
}: DetailProps) => (
  <div className="wrapper">
    <section className="detail">
      <div className="detail__back">
        <a className="detail__back-link" onClick={() => onClickBack()}><i className="fa fa-angle-left" aria-hidden="true"></i> Go Back</a>
      </div>
      <div className="row">
          <div className="sm-col-span-12 lg-col-span-7">
            <div className="img">
              {
                src
                && <img className="img__content" src={IMG_URL + src}/>
              }
            </div>
          </div>
          <div className="sm-col-span-12 lg-col-span-5">
            <div className="detail__heading">
              <h2 className="detail__heading-name">{name}</h2>
              <h3 className="detail__heading-sku"> Sku: {sku} </h3>
              <h4 className="detail__heading-price">${price}</h4>
            </div>
            <form className="detail__form" onSubmit={onSubmit}>
              <h3 className="detail__form-qty">Quantity</h3>
                <Spinner
                  value={qty}
                  sub={qtySub}
                  add={qtyAdd}
                />
              <button className="detail__form-submit" type="submit">
                Add to cart
              </button>
            </form>
            <article className="detail__info">
              <h3 className="detail__info-heading">PRODUCT INFO</h3>
              <p className="detail__info-txt">Charm Accessories jewellery
                are made from either
                 Silver or Gold plated brass with
                Rhinestone crystals. To care for the
                crystals, wash in warm water and then pat dry
                with a soft, clean cloth. Avoid using chemicals
                and soaps as these will leave a residue on the cystals,
                causing them to become duller more quickly. On the silver
                plated metal, use a high-quality jewellery cleaner and tarnish
                remover. Gold plated jewellery requires less frequent
                cleaning. Jewellery should be stored away from natural
                sunlight. Use the protective jewellery box or tarnish-resistant
                pouch purchased with the jewellery. Do not use
                plastic bags as these can make silver tarnish faster.
              </p>
            </article>
            <article className="detail__info">
              <h3 className="detail__info-heading">RETURN AND REFUND POLICY</h3>
              <p className="detail__info-txt">If you wish to return an item
                simply because you change your mind, we will gladly
                exchange or refund, provided that the item is in original
                condition, unworn and with tags still attached. In the interests
                of hygiene and for your protection we do not accept returns of,
                or provide refunds for pierced earrings, packs containing
                earrings, body jewellery and hair accessories unless the items
                are of unsatisfactory quality. If you’d like a refund or exchange
                then you will be expected to pay for shipping the item back to us.
                We do not cover postage costs for returning items.
              </p>
            </article>
          </div>
      </div>
      <div className="clearfix"></div>
    </section>
  </div>
);
export default Detail;
