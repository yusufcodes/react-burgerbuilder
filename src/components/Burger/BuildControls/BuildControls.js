import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
]

const buildControls = props => {
    return (
    <div className={classes.BuildControls}>
        <p>Total price: <strong>£{props.totalPrice.toFixed(2)}</strong></p>
        {
        controls.map((currentControl) => {
            return <BuildControl
            key={currentControl.label}
            label={currentControl.label}
            added={() => props.ingredientAdded(currentControl.type)}
            removed={() => props.ingredientRemoved(currentControl.type)}
            disabled={props.disabled[currentControl.type]}/>
        })
        }

        <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
        >ORDER NOW</button>
    </div>
    )
}

export default buildControls;