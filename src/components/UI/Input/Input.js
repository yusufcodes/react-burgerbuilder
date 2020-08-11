import React from 'react';
import classes from './Input.module.css';

/* Input: Custom input component, which analyses an element type (elementType) and creates the corresponding element for this type. */
const input = (props) => {
    let inputElement = null;

    // Determining the input to create, passing in any props that are passed in using spread
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
            <select className={classes.InputElement}
            value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        )
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