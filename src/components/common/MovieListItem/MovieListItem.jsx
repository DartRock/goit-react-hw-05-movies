import { Link, useParams, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import s from './MovieListItem.module.css'
import notFound from '../../../images/not-found.jpg'

export const MovieListItem = ({ movie }) => {

    const location = useLocation()
    
    const { id, title, poster_path } = movie; 
    const img = `https://image.tmdb.org/t/p/w200/${poster_path}`

    return (
        <li className={s.movieListItem}>
            <Link to={{
                pathname: `movies/${id}`,
                state: {from: location}}} className={s.movieListLink}>
                <img src={!poster_path ? notFound : img} alt={`${title} poster`} width="60px"  className={s.movieImage} />
                <p className={s.movieText} >{title}</p>
            </Link>
        </li>
    )
}
