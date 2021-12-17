import { MovieList } from '../../components/common/MovieList/MovieList'
import { useState, useEffect } from "react"
import { getSearchMovie } from '../../js/services/api-service'
import s from './MoviesPage.module.css'

const STORAGE_KEY = 'input'

export const MoviesPage = () => {

    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    const input = localStorage.getItem(STORAGE_KEY);
    

    useEffect(() => {
        if (input) {
            setInputValue(input);
            getMovies(input);
        }
    }, [])

    const inputHandler = (e) => {
        setInputValue(e.target.value);
    }

    const getMovies = async (name) => {
        try {
            const data = await getSearchMovie(name);
            setData(data.results);
        } catch (error) {
            console.log(error);
        }

    }

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem(STORAGE_KEY, inputValue);
        getMovies(inputValue);

    }

    return (
        <section>
            <form onSubmit={submitHandler} className={s.searchForm} >
                <input onChange={inputHandler} type="text" className={s.searchInput} placeholder={input ? input : 'Enter movie name..'} />
                <button type='submit' className={s.searchButton}>Search</button>
            </form>
            <MovieList data={data} />
        </section>
    )
}
