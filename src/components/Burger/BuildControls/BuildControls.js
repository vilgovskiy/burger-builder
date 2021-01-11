import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const buildControls = (props) => {
    const controls = [
        { label: 'Salad', type: 'salad' },
        { label: 'Bacon', type: 'bacon' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Meat', type: 'meat' },
    ];


    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    type={ctrl.type}
                    add={() => props.add(ctrl.type)}
                    remove={() => props.remove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            })}
            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.checkout}>{props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}</button>
        </div>
    );
};

export default buildControls;