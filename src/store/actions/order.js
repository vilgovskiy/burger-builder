import * as ActionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: ActionTypes.PURCASE_BURGER_SUCCESS,
    orderId: id,
    orderDate: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: ActionTypes.PURCASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: ActionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (order, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, order)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, order.data));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail());
      });
  };
};

export const purchaseInit = () => {
  return {
    type: ActionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: ActionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: ActionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: ActionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userID) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    let queryParams = "?auth=" + token + '&orderBy="userID"&equalTo="' + userID + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((resp) => {
        let ordersFetched = [];
        for (let key in resp.data) {
          ordersFetched.push({ ...resp.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(ordersFetched));
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
