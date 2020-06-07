import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = props => (
    <div className={classes.Logo} style={{
        height: props.height,
        margin: '32px'}}>
        <img src={burgerLogo} alt="Website logo"></img>
    </div>
);

export default logo;