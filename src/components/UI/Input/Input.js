import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    // Determining the input to create, passing in any props that are passed in using spread
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>
            break;
        case('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
            default:
                inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
    
};

export default input;