
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    original_language: string;
    release_date: string;
    vote_average: number;
}

interface Props {
    view: string;
    movies: Movie[];
}

function TopRated({ view, movies }: Props) {
    return (
        <div className={view ? `movie__grid ${view}` : 'movie__grid'}>
            {movies.map(movie => (
                <a key={movie.id} href={`/detail/${movie.id}`} className='movie__grid--item'>
                    <figure className='movie__grid--image'>
                        <img className='image-lazy' src={`https://image.tmdb.org/t/p/original${view === 'list' ? movie.backdrop_path : movie.poster_path}`} loading="lazy" alt='' />
                    </figure>
                    <div className="movie__grid--info">
                        <h2 className='movie__grid--headline'>{movie.title}</h2>
                        {view === 'list' && (
                            <ul>
                                <li><strong>Language:</strong> {movie.original_language}</li>
                                <li><strong>Release:</strong> {movie.release_date}</li>
                                <li><strong>Rating:</strong> {movie.vote_average}</li>
                            </ul>
                        )}
                    </div>
                </a>
            ))}
        </div>
    );
}

export default TopRated;
