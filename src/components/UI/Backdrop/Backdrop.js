import React from 'react';
import classes from './Backdrop.module.css';

/* Backdrop: A dark transparent background displayed when a modal or sidedrawer is open,
can be clicked to be dismissed. */
const backdrop = (props) => (
    props.show ? <div
    className={classes.Backdrop}
    onClick={props.clicked}
    ></div> : null
)

export default backdrop;