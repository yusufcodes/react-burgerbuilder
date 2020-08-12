import React from 'react';
import classes from './Input.module.css';

/* Input: Custom input component, which analyses an element type (elementType) and creates the corresponding element for this type. */
const input = (props) => {
    let inputElement = null;

    // Dynamic classes
    const inputClasses = [classes.InputElement];

    if (!props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    // Determining the input to create, passing in any props that are passed in using spread
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
            <select className={inputClasses.join(' ')}
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
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
    }

    // Validation message
    let validationError = null;
    if (props.invalid && props.touched) {
    validationError = <p>Please enter a valid {props.type}!</p>;
    }
    
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
    
};

export default input;