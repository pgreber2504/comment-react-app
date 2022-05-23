import { useEffect, useRef } from 'react';

import useHttp from '../../hooks/useHttp';
import { addComment } from '../../lib/api';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
    const commentTextRef = useRef();
    const { sendRequest, status, error } = useHttp(addComment);

    const { onAddHandler, id } = props;
    useEffect(() => {
        if (status === 'completed' && !error) {
            onAddHandler()
        }
    }, [onAddHandler, status, error])

    const submitFormHandler = (event) => {
        event.preventDefault();

        const enteredText = commentTextRef.current.value;

        if (enteredText.trim() === '') return;
        // Could validate here
        sendRequest({ commentData: { text: enteredText }, quoteId: id })
    };

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            <div className={classes.control} onSubmit={submitFormHandler}>
                <label htmlFor='comment'>Your Comment</label>
                <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
            </div>
            <div className={classes.actions}>
                <button className='btn'>Add Comment</button>
            </div>
        </form>
    );
};

export default NewCommentForm;