import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/OrderSummary/OrderSummary";
import ContactData from "./ContactData/ContactData";

const checkout = (props) => {

  const checkoutCancelHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;

  if (props.ingredients) {
    const purchasedRedir = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedir}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancel={checkoutCancelHandler}
          checkoutContinue={checkoutContinueHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(checkout);
