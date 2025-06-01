import { useMovieContext } from "../context/MovieContext";
import type { Movie } from "../types/types";
import BookMarkIcon from "./icons/BookMarkIcon";

interface SaveMovieButton {
    movie: Movie
}

function SaveMovieButton(props: SaveMovieButton) {
    const MC = useMovieContext();
    return (
        <>
            {MC.movieIsSaved(props.movie.imdbID) &&
                <button style={{all: "unset", cursor: "pointer"}} onClick={(event) => { event.stopPropagation();MC.unsaveMovie(props.movie.imdbID) }}><BookMarkIcon lighted={true}/></button>
            }
            {!MC.movieIsSaved(props.movie.imdbID) &&
                <button style={{all: "unset", cursor: "pointer"}} onClick={(event) => { event.stopPropagation();MC.saveMovie(props.movie) }}><BookMarkIcon lighted={false}/></button>
            }
        </>
    );
}

export default SaveMovieButton;