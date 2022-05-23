import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import useHttp from '../../hooks/useHttp';
import { getAllComments } from '../../lib/api';
import LoadSpinner from '../UI/LoadSpinner';

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = (props) => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const params = useParams()
    const { sendRequest, data, status } = useHttp(getAllComments, true)

    const { quoteId } = params;

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    useEffect(() => {
        sendRequest(quoteId)
    }, [quoteId, sendRequest]);

    const onAddedComment = useCallback(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId])

    let comments;

    if (status === 'pending') {
        comments = (
            <div className="centered">
                <LoadSpinner />
            </div>
        )
    }

    if (!data) {
        comments = <p>Not found comments.</p>
    }

    if (status === 'completed') {
        comments = <CommentsList comments={data} />
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && <NewCommentForm id={quoteId} onAddHandler={onAddedComment} />}
            {comments}
        </section>
    );
};

export default Comments;