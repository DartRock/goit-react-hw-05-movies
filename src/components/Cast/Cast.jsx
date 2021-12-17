import { useState, useEffect } from "react";
import imageNotFound from '../../images/image-not-found.jpg'
import { useParams, useRouteMatch } from "react-router-dom"
import { getMovieCredits } from "../../js/services/api-service";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from 'react-toastify';
import s from './Cast.module.css'

export const Cast = () => {

    const [credits, setCredits] = useState([])

    const match = useRouteMatch();
    const params = useParams()
    const id = params.id

    

    useEffect(() => {
        const getCredits = async () => {
        try {
            const creditsData = await getMovieCredits(id)
            setCredits(creditsData.cast)
        } catch (error) {
            console.log(error);
        }
    }
        getCredits();

        // if (credits.length === 0) {
        //     toast.warn('We dont have cast for this film')
        // }
    }, [credits.length, id])

    return (
                <>
                    <ul className={s.castList}>
                        {credits.map(({ character, name, profile_path }) => 
                        <li key={nanoid()} className={s.castItem}>
                            <img className={s.castImg} src={!profile_path ? imageNotFound : `https://image.tmdb.org/t/p/w200/${profile_path}`} alt={name} />
                            <p className={s.castName}>{name}</p>
                            <p className={s.castCharacter}>Character: <span className={s.castCharacterText}>{character}</span></p>
                        </li>)}
                    </ul>
                    <ToastContainer theme="dark" />
                </>
    )
}
