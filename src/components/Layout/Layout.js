import React, { useState } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxillary/Auxillary";
import classes from "./Layout.css";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  const [sideDrawerActive, setSideDrawerActive] = useState(false);

  const sideDrawerCloseHandler = () => {
    setSideDrawerActive(false);
  };

  const sideDrawerOpenHandler = () => {
    setSideDrawerActive(!sideDrawerActive);
  };

  return (
    <Aux>
      <Toolbar isAuth={props.isAuth} click={sideDrawerOpenHandler} />
      <SideDrawer
        isAuth={props.isAuth}
        show={sideDrawerActive}
        click={sideDrawerCloseHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(layout);
