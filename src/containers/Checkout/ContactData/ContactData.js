import React, { useState } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { validateForm } from "../../../shared/utility";

const contactData = (props) => {
  const [formState, formStateSet] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 6,
      },
      valid: false,
      touched: false,
    },
    counntry: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "email",
      elementConfig: {
        type: "text",
        placeholder: "Your E-Mail",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    delivery: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      valid: true,
      touched: false,
    },
  });

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let key in formState) {
      formData[key] = formState[key].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userID: props.userID,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputID) => {
    const updOrderForm = { ...formState };

    const updOrderFormElem = { ...updOrderForm[inputID] };

    updOrderFormElem.value = event.target.value;
    updOrderFormElem.touched = true;
    updOrderFormElem.valid = validateForm(
      updOrderFormElem.value,
      updOrderFormElem.validation
    );
    updOrderForm[inputID] = updOrderFormElem;
    formStateSet(updOrderForm);
  };
  
  const formElems = [];
  for (let key in formState) {
    formElems.push({
      id: key,
      config: formState[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElems.map((elem) => (
        <Input
          key={elem.id}
          elementType={elem.config.elementType}
          elementConfig={elem.config.elementConfig}
          value={elem.config.value}
          changed={(event) => inputChangedHandler(event, elem.id)}
          invalid={!elem.config.valid && elem.config.touched}
        />
      ))}
      <Button btnType="Success">ORDER</Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Contact information</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
