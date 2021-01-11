import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import Order from "./Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

const orders = (props) => {
  const {onFetchOrders} = props;
  useEffect(() => {
    onFetchOrders(props.token, props.userID);
  }, [onFetchOrders]);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ));
  }

  return <div>{orders}</div>;
};

const mapStateToProp = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userID: state.auth.userID
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userID) => dispatch(actions.fetchOrders(token,userID)),
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
