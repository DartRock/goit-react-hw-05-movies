import { useParams, useRouteMatch } from "react-router-dom"
import { useState, useEffect } from "react";
import { getMovieReviews } from "../../js/services/api-service";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Reviews.module.css'

export const Reviews = () => {
    const match = useRouteMatch();
    const params = useParams()
    const id = params.id

    const [reviews, setReviews] = useState([])

    console.log(')');
    // useEffect(() => {
    //     if (reviews.length === 0) { toast.warn('We dont have any reviews for this movie') }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, reviews)

    useEffect(() => {
        const getReviews = async () => {
            try {
                const creditsReviews = await getMovieReviews(id)
                setReviews(creditsReviews.results)
            } catch (error) {
                console.log(error);
            }
        }

        getReviews();

        // if (reviews.length === 0) {
        //     toast.warn('We dont have any reviews for this movie')
        // }

    }, [id, reviews.length])

    return (
        <>
            {reviews.length > 0 ? <ul className={s.reviewList}>
                {reviews.map(({ author, content }) =>
                    <li className={s.reviewListItem} key={nanoid()}>
                        <p className={s.reviewTitle}>Author: <span className={s.reviewTitleName}>{author}</span></p>
                        <p className={s.reviewText}>{content}</p>
                    </li>
                 )}
            </ul> : <p>There is no review</p>}
            
            <ToastContainer theme="dark" />
        </>
            
    )
}
