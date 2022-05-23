import React, { useEffect } from 'react'
import useHttp from '../hooks/useHttp';
import { getAllQuotes } from '../lib/api';
import QuoteList from '../components/quotes/QuoteList'
import LoadSpinner from '../components/UI/LoadSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const AllQuotes = () => {
    const { sendRequest, status, data, error } = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest])

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadSpinner />
            </div>
        )
    }
    if (error) {
        return <p className='centered focused'>{error}</p>
    }
    if (status === 'completed' && data.length === 0) {
        return <NoQuotesFound />
    }

    const quoteList = <QuoteList quotes={data} />

    return quoteList
}

export default AllQuotes