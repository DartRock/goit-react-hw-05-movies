import { useParams, useRouteMatch, useLocation, useHistory } from "react-router-dom"
import { useState, useEffect } from "react";
import { getMovieById } from "../../js/services/api-service";
import { NavLink, Route, Switch } from "react-router-dom";
import { Reviews } from "../../components/Reviews/Reviews";
import notFound from '../../images/not-found-image2.jpg'
import s from './MovieDetailsPage.module.css'

import { Cast } from "../../components/Cast/Cast";

export const MovieDetailsPage = () => {
    const match = useRouteMatch();
    const params = useParams();
    const location = useLocation();
    const history = useHistory(); 
    const id = params.id

    const [data, setData] = useState([])
    const { title, vote_average, genres, overview, poster_path } = data;
    const img = `https://image.tmdb.org/t/p/w300/${poster_path}`
    const prepearedGenres = genres?.map(genre => genre.name).join(', ')

    useEffect(() => {
        const getMovies = async () => {
        try {
            const data = await getMovieById(id)
            setData(data)      
        } catch (error) {
            console.log(error);
        }
    }

        getMovies();
    }, [id])

    const clickHandle = (e) => {

        const castHandler = () => {
            switch (location.pathname) {
                case `${match.url}`:   
                    break;
            
                case `${match.url}/cast`:
                    // history.push(location?.state?.from)
                    history.goBack()
                    break;
            
                default:
                    break;
            }
        }
        
        const reviewHandler = () => {
            switch (location.pathname) {
                case `${match.url}`:   
                    break;
            
                case `${match.url}/reviews`:
                    // history.push(location?.state?.from)
                    history.goBack()
                    break;
            
                default:
                    break;
            }
        }

        const goBackHandler = () => {
            history.goBack()
            // history.push(location.stete.from)
        }

        switch (e.target.textContent) {
            case 'Cast':
                castHandler()
                break;
        
            case 'Reviews':
                reviewHandler()
                break;
        
            case 'Back':
                goBackHandler()
                break;
        
            default:
                break;
        }
    }

    return (
        <section>
            <button type='button' className={s.backButton} onClick={clickHandle}>Back</button>
            <div className={s.movieWrapper}>
                <div className={s.movieTextWrapper}>
                    <h1 className={s.movieTitle}>{title}</h1>
                    <p className={s.movieRating}>Rating:<span className={s.movieRatingText}>{vote_average || 'no info'}</span></p>
                    <h2 className={s.movieOverview}>Overview</h2>
                    <p className={s.movieOverviewText}>{overview || 'Actually, there is no info about this :D'}</p>
                    <b className={s.movieGenres}>Genres</b>
                    <p className={s.movieGenresText}>{prepearedGenres || 'Actually, there is no info about this :D'}</p>
                </div>
                <img src={!poster_path ? notFound : img} alt={title + 'poster'} className={s.movieImg}/>

            </div>
            <div className={s.movieAddInfoWrapper}>
                <b className={s.movieAddInfoTitle}>Additional information</b>
                <ul className={s.movieAddInfoList}>
                    <li className={s.movieAddInfoItem}>
                        <NavLink to={{pathname: `${match.url}/cast`,
                    state: {from: location?.state?.from}}} className={s.movieAddInfoLink} onClick={clickHandle}>Cast</NavLink>
                    </li>
                    <li className={s.movieAddInfoItem}>
                        <NavLink to={`${match.url}/reviews`} className={s.movieAddInfoLink} onClick={clickHandle}>Reviews</NavLink>
                    </li>
                </ul>
            </div>

            <Switch>
                <Route path={`${match.path}/cast`}>   
                    <Cast />
                </Route>    
                <Route path={`${match.path}/reviews`}>
                    <Reviews/>
                </Route>
            </Switch>
        </section>
    )
}
