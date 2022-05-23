import React, { Fragment, useEffect } from 'react'
import { Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import LoadSpinner from '../components/UI/LoadSpinner';
import useHttp from '../hooks/useHttp';
import { getSingleQuote } from '../lib/api';

const SingleQuote = () => {
    const routeMatch = useRouteMatch();
    const params = useParams();
    const { sendRequest, status, data, error } = useHttp(getSingleQuote);
    const path = routeMatch.path + '/comments';
    const url = routeMatch.url + '/comments';

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
                <Route path={routeMatch.path} exact>
                    <div className="centered">
                        <Link className='btn--flat' to={url}>Add Comments</Link>
                    </div>
                </Route>
                <Route path={path}>
                    <Comments id={params.quoteId} />
                </Route>
            </Fragment>
        )
    }

    return quote
}

export default SingleQuote