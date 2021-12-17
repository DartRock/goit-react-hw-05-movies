import { MovieList } from '../../components/common/MovieList/MovieList'
import { getTrendingMovies } from '../../js/services/api-service'
import { useState, useEffect } from "react"

export const HomePage = () => {

    const [data, setData] = useState([])

        const getMovies = async () => {
        try {
            const data = await getTrendingMovies()
            setData(data.results)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <section>
            <MovieList data={data} />
        </section>
    )
}
