import { MovieListItem } from "../MovieListItem/MovieListItem"
import s from './MovieList.module.css'

export const MovieList = ({data}) => {
    
    return (
        <ul className={s.movieList}>
            {data.map(movie => <MovieListItem key={movie.id} movie={movie} />)}
        </ul>
    )
}
