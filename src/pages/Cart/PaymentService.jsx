import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';

const PaypalButton = paypal.Button.driver('react', { React, ReactDOM });

class PaymentService extends Component {
  render() {
    const { items, total, onPay } = this.props;
    const list = items.map(({ product, qty }) => ({
      price: product.price.toFixed(2),
      quantity: qty,
      name: product.name,
      description: product.description,
      currency: 'AUD',
    }));

    const opts = {
      env: 'sandbox',
      client: {
        sandbox: 'AQRDRUuYuzY5j7SEleryF2xAKFWl2FdDymR8j8qPc9Hdq9vwDf6rdLxiJs-W1U_tbGCa5sceAnuFKrbU',
        production: 'AZsMsMDJH5uQZ07P_3RANNp6Vmj29oqBNccIOU_TD4TtkNyTeIS6W6skQpVF5ejkW4Gq3YJpKirSKKal',
      },
      locale: 'en_AU',
      style: {
        size: 'responsive',
        color: 'gold',
        shape: 'rect',
        label: 'checkout',
      },
      payment() {
        const { env, client } = this.props;
        return paypal.rest.payment.create(env, client, {
          transactions: [
            {
              amount: { total, currency: 'AUD' },
              item_list: { items: list },
            },
          ],
        });
      },
      commit: true, // Optional: show a 'Pay Now' button in the checkout flow
      onAuthorize(data, actions) {
        // Optional: display a confirmation page here
        return actions.payment.execute().then(() => {
        // Show a success page to the buyer
          onPay();
        });
      },
    };
    return (
      <PaypalButton
        env={opts.env}
        client={opts.client}
        style= {opts.style}
        payment={opts.payment}
        commit={opts.commit}
        onAuthorize={opts.onAuthorize}
      />
    );
  }
}

export default PaymentService;
