import { useState } from "react"
import MovieCard from "./MovieCard"

export default function SearchMovies() {
  //track states - input, query & movies
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  
  
  const searchMoviesDb = async (e)  => {
    e.preventDefault()

    console.log('submitting')
    const tmdbKey = 'ce31cdc0362baff159ce8c3bedc1df3b'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&query=${query}&page=1`

    try {
        const res = await fetch(url)
        const data = await res.json();
        setMovies(data.results)
        
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form className="form" onSubmit={searchMoviesDb}>
        <label htmlFor="query" className="label">Movie Name</label>
        <input 
          type="text" name="query" className="input" placeholder="e.g: The Shining"
          value={query} onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">Search</button>
      </form>
      <div className="card--list">
        {movies.filter(movie => movie.poster_path).map(movie => 
          <MovieCard movie={movie} key={movie.id}/>
          )}
      </div>
    </>
  )
}