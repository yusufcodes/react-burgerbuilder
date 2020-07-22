import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

/* SideDrawer: Mobile only displayed sidedrawer */
const sideDrawer = props => {
    // Using CSS classes to control whether or not sidedrawer is open
    // Note: Class names are assigned and formatted using 'join' with a space
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <React.Fragment>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </React.Fragment>
    )
};

export default sideDrawer;

