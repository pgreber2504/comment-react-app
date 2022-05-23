import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
    return quotes.sort((a, b) => {
        if (ascending) {
            return a.author > b.author ? 1 : -1
        } else {
            return b.author > a.author ? 1 : -1
        }

    })
}

const QuoteList = (props) => {
    const history = useHistory();
    const location = useLocation()

    const queryString = new URLSearchParams(location.search);
    const sortingString = queryString.get('sort') === 'asc';
    const sortedQuotes = sortQuotes(props.quotes, sortingString);

    const sortingHandler = e => {
        history.push(`${location.pathname}?sort=${sortingString ? 'desc' : 'asc'}`);
        console.log(sortingString);
        console.log(sortedQuotes);
    }
    return (
        <Fragment>
            <div className={classes.sorting}>
                <button onClick={sortingHandler}>Sort{sortingString ? ' descending' : ' ascending'} by author</button>
            </div>
            <ul className={classes.list}>
                {sortedQuotes ? sortedQuotes.map((quote) => (
                    <QuoteItem
                        key={quote.id}
                        id={quote.id}
                        author={quote.author}
                        text={quote.text}
                    />
                )) :
                    props.quotes.map((quote) => (
                        <QuoteItem
                            key={quote.id}
                            id={quote.id}
                            author={quote.author}
                            text={quote.quote}
                        />
                    ))
                }
            </ul>
        </Fragment>
    );
};

export default QuoteList;