import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AllQuotes from './pages/AllQuotes';
import NewQuote from './pages/NewQuote';
import NotFound from './pages/NotFound';
import SingleQuote from './pages/SingleQuote';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Navigate to='/quotes' />} />
                <Route path='/quotes' element={<AllQuotes />} />
                <Route path='/quotes/:quoteId/*' element={<SingleQuote />} />
                <Route path='/new-quote' element={<NewQuote />} />
                <Route from='/*' element={<NotFound />} />
            </Routes>
        </Layout>
    )
}

export default App