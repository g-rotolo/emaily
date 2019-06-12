import React, { Component } from 'react';
import StripeChekout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return(
      <StripeChekout
        name="Emaily"
        description="Buy 5 email credits"
        amount={500} //cents
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeChekout>
    );
  }
}

export default connect(null, actions)(Payments);