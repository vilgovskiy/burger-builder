import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorhandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

import { useDispatch, useSelector } from "react-redux";

const burgerBuilder = (props) => {
  // Setting states --------------------------------------------------------------------------------------------------------------------

  const [checkoutState, checkoutStateSet] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });

  const totalPrice = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });

  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });

  const isAuth = useSelector((state) => {
    return state.auth.token;
  });

  const onAddIngredient = (ingredientName) =>
    dispatch(actions.addIngredient(ingredientName));
  const onRemoveIngredient = (ingredientName) =>
    dispatch(actions.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirect(path));

  //   Done setting states ---------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const disableInfo = {
    ...ingredients,
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  const checkOrderButtonState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  //   Creating handlers -----------------------------------------------------------------------------------------------------------------------

  const checkoutHandler = () => {
    if (isAuth) {
      checkoutStateSet(true);
    } else {
      onInitPurchase();
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const checkoutCloseHandler = () => {
    checkoutStateSet(false);
  };

  const checkoutContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  //   Done creating Handlers ----------------------------------------------------------------------------------------------------

  let orderSummary = null;

  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          isAuth={isAuth}
          price={totalPrice}
          add={onAddIngredient}
          remove={onRemoveIngredient}
          checkout={checkoutHandler}
          disabled={disableInfo}
          purchasable={checkOrderButtonState(ingredients)}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        totalPrice={totalPrice}
        cancelCheckout={checkoutCloseHandler}
        continueCheckout={checkoutContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={checkoutState} modalClose={checkoutCloseHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default WithErrorhandler(burgerBuilder, axios);
