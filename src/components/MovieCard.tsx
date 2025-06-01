import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import type { Movie } from "../types/types";
import SaveMovieButton from "./SaveMovieButton";
import TooLongText from "./TooLongText";

interface MovieCardProps {
    movie: Movie
}

function MovieCard(props: MovieCardProps) {
    const bgColor = "white";
    const MC = useMovieContext();
    const navigate = useNavigate();
    return (
        <>
            <div className="card" style={{ width: MC.gridDivSize + "px", backgroundColor: bgColor}}>
                <div style={{ width: MC.gridDivSize + "px", height: MC.gridDivSize + "px" }} onClick={() => { navigate("/details?id=" + props.movie.imdbID); }}>
                    <img style={{ width: "100%", height: "100%", objectFit: 'contain' }} src={props.movie.Poster} />
                </div>
                <div style={{ width: MC.gridDivSize + "px", paddingTop: "8px" }} onClick={() => { navigate("/details?id=" + props.movie.imdbID); }}>
                    <TooLongText headingSize={4} text={props.movie.Title} bgColor={bgColor}/>
                    <TooLongText headingSize={5} text={props.movie.Year} bgColor={bgColor}/>
                    <TooLongText headingSize={5} text={props.movie.Type} bgColor={bgColor}/>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <div>
                            <SaveMovieButton movie={props.movie} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieCard;