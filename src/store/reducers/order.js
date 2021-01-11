import * as ActionTypes from "../actions/actionTypes";

const initState = {
  orders: [],
  loading: false,
  purchased: true,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.PURCASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };
    case ActionTypes.PURCASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case ActionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case ActionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
