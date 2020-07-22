import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

/* Layout: Handles the functionality of the toolbar (nav) and sidebar */
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    // Boolean to close the side drawer (mobile)
    sideDrawerClosedHandler = () => this.setState({showSideDrawer: false});

    // Boolean toggle method, setting showSideDrawer to the opposite of what it was previously
    sideDrawerToggleHandler = () => {
        /* Setting state depending on old state - less optimal way:
        const currentSideDrawerState = this.state.showSideDrawer;
        const newState = !currentSideDrawerState;
        this.setState({showSideDrawer: newState});
        */

        this.setState( (prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
        <React.Fragment>
            <Toolbar 
            drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}/>
            
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </React.Fragment>
        )
    }
}

export default Layout;