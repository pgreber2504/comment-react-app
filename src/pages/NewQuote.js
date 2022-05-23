import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/useHttp';
import { addQuote as addQuoteRequest } from '../lib/api';

const NewQuote = () => {
    const { sendRequest, status } = useHttp(addQuoteRequest)
    const navigate = useNavigate()

    useEffect(() => {
        if (status === 'completed') {
            console.log(status);
            navigate('/quotes')

        }
    }, [status, navigate])

    const addQuote = data => {
        sendRequest(data)
    }

    return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuote} />
}

export default NewQuote