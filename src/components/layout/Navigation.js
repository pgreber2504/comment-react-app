import React from 'react'
import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                Przemek's Quotes
            </div>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink className={navData => navData.active ? classes.active : ''} to='/quotes'>Quotes</NavLink>
                    </li>
                    <li>
                        <NavLink className={navData => navData.active ? classes.active : ''} to='/new-quote'>New Quote</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navigation