import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiHeader, urlApi } from '../../api';
import axios from 'axios';

interface Movie {
    title: string;
    poster_path: string;
    status: string;
    genres: { id: number; name: string }[];
    original_language: string;
    release_date: string;
    vote_average: number;
    runtime: number;
    production_countries: { iso_3166_1: string; name: string }[];
}

function MoiveDetails() {
    const { pageId } = useParams<{ pageId: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(urlApi + pageId, {
                    params: {
                        language: 'en-US',
                        page: 1
                    },
                    headers: apiHeader
                });
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, [pageId]);

    return (
        <div className='movie__detail'>
            {movie && (
                <>
                    <figure className='movie__grid--image'>
                        <img className='image-lazy' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} loading="lazy" alt='' />
                    </figure>
                    <div>
                        <h2 className='movie__grid--headline'>{movie.title}</h2>
                        <ul>
                            <li><strong>Status:</strong> {movie.status}</li>
                            <li><strong>Genres:</strong>&nbsp;
                                {movie.genres.map(genre => (
                                    <span key={genre.id}>{genre.name}</span>
                                ))}
                            </li>
                            <li><strong>Language:</strong> {movie.original_language}</li>
                            <li><strong>Release:</strong> {movie.release_date}</li>
                            <li><strong>Rating:</strong> {movie.vote_average}</li>
                            <li><strong>Runtime:</strong> {movie.runtime} hour</li>
                            <li><strong>Production Countries:</strong> &nbsp;
                                {movie.production_countries.map(country => (
                                    <span key={country.iso_3166_1}>{country.name}</span>
                                ))}
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default MoiveDetails;
