import React from 'react'
import classes from './NoQuotesFound.module.css'
import { Link } from 'react-router-dom'

const NoQuotesFound = () => {
    return (
        <div className={classes['no-quote']}>
            <p>No quotes found!</p>
            <Link to='new-quote'>Add quote</Link>
        </div>
    )
}

export default NoQuotesFound