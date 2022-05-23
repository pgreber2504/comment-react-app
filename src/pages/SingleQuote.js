import React, { Fragment, useEffect } from 'react'
import { Routes, Route, Link, useParams, } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import LoadSpinner from '../components/UI/LoadSpinner';
import useHttp from '../hooks/useHttp';
import { getSingleQuote } from '../lib/api';

const SingleQuote = () => {
    const params = useParams();
    const { sendRequest, status, data, error } = useHttp(getSingleQuote);

    useEffect(() => {
        sendRequest(params.quoteId);
    }, [sendRequest, params.quoteId])

    let quote;

    if (status === 'pending') {
        quote = (
            <div className="centered">
                <LoadSpinner />
            </div>
        )
    }

    if (error) {
        quote = (
            <div className="centered focused">
                <h2>{error}</h2>
            </div>
        )
    }

    if (status === 'completed' && data.length === 0) {
        quote = <NoQuotesFound />
    }

    if (status === 'completed') {
        quote = (
            <Fragment>
                <HighlightedQuote text={data.text} author={data.author} />
                <div className="centered">
                    <Link className='btn--flat' to='comments'>Add Comments</Link>
                </div>
                <Routes>
                    <Route path='comments' element={<Comments id={params.quoteId} />} />
                </Routes>
            </Fragment>
        )
    }

    return quote
}

export default SingleQuote