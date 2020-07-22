import React from 'react';
import classes from './NavigationItem.module.css';

/* NavigationItem: Outputting an individual nav link based on props passed in */
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a href={props.link}
        className={props.active ? classes.active : null}
        >
        {props.children}</a>
    </li>
);

export default navigationItem;