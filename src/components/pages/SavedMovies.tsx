import { useEffect } from "react";
import { useMovieContext } from "../../context/MovieContext";
import MovieCard from "../MovieCard";

function SavedMovies(){
    const MC = useMovieContext();
    return (
        <div style={{textAlign: "center"}}>
            <h2>My saved movies</h2>
            <div className="grid-container" style={{gridTemplateColumns: MC.getGridTemplateColumns()}}>
                {MC.savedMovies.map((savedMovie, index) => {
                    return <MovieCard key={index} movie={savedMovie.movie}/>;
                })}
            </div>
            {MC.savedMovies.length == 0 &&
                <h3>🤷‍♂️ You still haven't saved any movie</h3>
            }
        </div>
    );
}

export default SavedMovies;