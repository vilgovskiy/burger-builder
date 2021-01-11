import React from 'react';
import classes from './Toggler.css';


const toggler = (props) => {
    return (
       <div onClick={props.click} className={classes.Toggler}>
           <div></div>
           <div></div>
           <div></div>
       </div>
    );

};

export default toggler;