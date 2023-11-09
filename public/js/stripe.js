/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51O85KBBXLMG1jSxgZkjftn00Lr0Cu5NYNmRER1ow7eYKDAo456SvnsIcnAmwpyhgC3Q15xuA3EKOWB1rbMAgxauQ00tpZzAyvP',
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
