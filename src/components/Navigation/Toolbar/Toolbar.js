import React from 'react';
import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggler from '../../Navigation/SideDrawer/Toggler/Toggler';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Toggler click={props.click}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar