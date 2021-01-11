import React, { useEffect, useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { validateForm } from "../../shared/utility";

import classes from "./Auth.css";

const auth = (props) => {
  const [formState, formStateSet] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "email address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignup, setIsSignup] = useState(true);

  const { building, authRedirecctPath, onSetAuthRedirect } = props;

  useEffect(() => {
    if (!building && authRedirecctPath !== "/") {
      onSetAuthRedirect();
    }
  }, [building, authRedirecctPath, onSetAuthRedirect]);

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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(formState.email.value, formState.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElems = [];
  for (let key in formState) {
    formElems.push({
      id: key,
      config: formState[key],
    });
  }

  let form = formElems.map((elem) => (
    <Input
      key={elem.id}
      elementType={elem.config.elementType}
      elementConfig={elem.config.elementConfig}
      value={elem.config.value}
      changed={(event) => inputChangedHandler(event, elem.id)}
      invalid={!elem.config.valid && elem.config.touched}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMsg = null;
  if (props.error) {
    errorMsg = <p>{props.error.message}</p>;
  }

  let redirect = null;
  if (props.isAuth) {
    redirect = <Redirect to={props.authRedirecctPath} />;
  }

  return (
    <div className={classes.Auth}>
      {redirect}
      <form onSubmit={onSubmitHandler}>
        {errorMsg}
        {form}
        <Button btnType="Success">{isSignup ? "SIGN UP" : "SIGN IN"}</Button>
      </form>
      <Button click={switchAuthModeHandler} btnType="Danger">
        SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirecctPath: state.auth.redirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirect: () => dispatch(actions.setAuthRedirect("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
