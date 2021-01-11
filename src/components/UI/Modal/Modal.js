import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} click={props.modalClose}/>
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                }}>
                {props.children}
            </div>
        </Aux>
    );
};

export default React.memo(modal, (prevProps, nextProps) => {
    return (prevProps.show === nextProps.show && prevProps.children === nextProps.children)
});