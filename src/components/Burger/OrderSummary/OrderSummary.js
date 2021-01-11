import React from 'react';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

const ordrerSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (<li key={key}>
                <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
            </li>
            );
        });

    return (
        <Aux>
            <h3>Your order</h3>
            <p> Burger with ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" click={props.cancelCheckout}>CANCEL</Button>
            <Button btnType="Success" click={props.continueCheckout}>CONTINUE</Button>
        </Aux>
    );
};

export default ordrerSummary;