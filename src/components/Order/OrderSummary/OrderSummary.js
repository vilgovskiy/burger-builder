import React from "react";
import Burger from "../../Burger/Burger";
import Button from '../../UI/Button/Button';

import classes from './OrderSummary.css'

const orderSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1> We hope you like it</h1>
            <div style={{width:'300px', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' click={props.checkoutCancel}>CANCEL</Button>
            <Button btnType='Success'click={props.checkoutContinue}>CONTINUE</Button>
        </div>
    )
};

export default orderSummary;
