import React from 'react';

const CartMessage = ({ goBack, message }) => (
  <div className="wrapper">
    <section className="cart">
      <div className="row">
        <div className="sm-col-span-12 lg-col-span-12">
            <div className="cart__empty">
                <h3>{message}</h3>
                <h3><a onClick={() => goBack()}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>&nbsp;Return</a>
                </h3>
            </div>
        </div>
    </div>
  </section>
</div>
);
export default CartMessage;
