import { Fragment, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faListUl } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { apiHeader, urlApi } from './api'
import axios from 'axios';
import MoiveDetails from './pages/MoiveDetails'
import NowPlaying from './pages/NowPlaying'
import TopRated from './pages/TopRated'
// interface
interface Movie {
    id: number,
    title: string,
    backdrop_path: string,
    poster_path: string,
    original_language: string,
    release_date: string,
    vote_average: string
}
function App() {
    const [topic, setTopic] = useState<string>('now_playing')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const [view, setView] = useState<string>('grid')
    const [movies, setMovies] = useState<Movie[]>([])
    const [search, setSearch] = useState<string>('');
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const filterProduct = movies.filter(movie => {
        const converCharacters = movie.title.toLowerCase()
        return converCharacters.includes(search)
    })
    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${urlApi + topic}`, {
                    params: {
                        language: 'en-US',
                        page: 1
                    },
                    headers: apiHeader
                });
                setMovies(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError('Network error occurred')
                setLoading(false);
            }
        }
        fetchMovies()
    }, [topic])

    return (
        <Router>
            <div className='wrapper'>
                <header id='header'>
                    <div className='header__container'>
                        <input
                            className='header__search'
                            type='text'
                            value={search}
                            onChange={e => handleSearchInput(e)}
                            placeholder='Enter to search....'
                        />
                        <ul className='header__nav'>
                            <li onClick={() => setTopic('now_playing')}><Link to="/">Now Playing</Link></li>
                            <li onClick={() => setTopic('top_rated')}><Link to="/top-rated">Top Rated</Link></li>
                        </ul>
                    </div>
                </header>
                <main id='main'>
                    {loading ? (
                        <div className="loading">
                            <div className='loading__box'></div>
                        </div>
                    ) : error ? (
                        <div className="movie__network">{error}</div>
                    ) : (
                        <Fragment>
                            <div className='movie__top'>
                                <h1 className='movie__top--headline'>
                                    {topic === 'now_playing' ? 'Now Playing' : 'Top Rated'}
                                </h1>
                                <div className='movie__top--grid'>
                                    <button onClick={() => setView('list')} className='movie__top--btn'><FontAwesomeIcon icon={faListUl} /></button>
                                    <button onClick={() => setView('grid')} className='movie__top--btn'><FontAwesomeIcon icon={faBorderAll} /></button>
                                </div>
                            </div>
                            <Routes>
                                <Route path='/' element={<NowPlaying view={view} movies={filterProduct} />} />
                                <Route path='/top-rated' element={<TopRated view={view} movies={filterProduct} />} />
                            </Routes>
                        </Fragment>
                    )}
                    <Routes>
                        <Route path='/detail/:pageId' element={<MoiveDetails />} />
                    </Routes>
                </main>
                <footer id='footer'>
                    Copyright ©2024 by Quang Vu
                </footer>
            </div>
        </Router>
    )
}

export default App
