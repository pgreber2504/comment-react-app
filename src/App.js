import React, { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadSpinner from './components/UI/LoadSpinner';

const SingleQuote = React.lazy(() => import('./pages/SingleQuote'));
const NewQuote = React.lazy(() => import('./pages/NewQuote'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'))

const App = () => {
    return (
        <Layout>
            <Suspense fallback={
                <div className='centered'>
                    <LoadSpinner />
                </div>
            }>
                <Routes>
                    <Route path='/' element={<Navigate to='/quotes' />} />
                    <Route path='/quotes' element={<AllQuotes />} />
                    <Route path='/quotes/:quoteId/*' element={<SingleQuote />} />
                    <Route path='/new-quote' element={<NewQuote />} />
                    <Route from='/*' element={<NotFound />} />
                </Routes>
            </Suspense>
        </Layout>
    )
}

export default App