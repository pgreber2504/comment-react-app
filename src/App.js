import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AllQuotes from './pages/AllQuotes';
import NewQuote from './pages/NewQuote';
import NotFound from './pages/NotFound';
import SingleQuote from './pages/SingleQuote';

const App = () => {
    return (
        <Layout>
            <Switch>
                <Redirect from='/' to='/quotes' exact />
                <Route path='/quotes' component={AllQuotes} exact />
                <Route path='/quotes/:quoteId' component={SingleQuote} />
                <Route path='/new-quote' component={NewQuote} />
                <Route from='/*' component={NotFound} />
            </Switch>
        </Layout>
    )
}

export default App