import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { MovieDetailsSchema, type MovieDetails } from "../../types/types";
import SaveMovieButton from "../SaveMovieButton";
import TooLongText from "../TooLongText";
import { useMovieContext } from "../../context/MovieContext";
import StarIcon from "../icons/StarIcon";

function MovieDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const MC = useMovieContext();
    const votes: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [pageStatus, setPageStatus] = useState<0 | 1 | 2>(0); //0 = caricamento, 1 = pronto, 2 = errore
    //titolo, anno, poster, trama, regista, attori, valutazioni (è possibile aggiungere informazioni a piacere)
    const movieRelevantInfo: (keyof MovieDetails)[] = ["Title", "Year", "Type", "Actors", "Director"];
    function loadAllMovieDetails() {
        if (id != undefined) {
            //TODO: implementa qui la chiamata API che prende il film con tutti i dettagli e lo salva in uno usestate
            setPageStatus(0);
            axios.get("http://www.omdbapi.com/?apikey=40dafa3a&plot=full&i=" + id)
                .then(response => {
                    if (response.status == 200 && response.data.Response == "True") {
                        const responseData = response.data;
                        delete responseData.Response;
                        if (MovieDetailsSchema.safeParse(responseData).success) {
                            setMovieDetails(responseData as MovieDetails);
                            setPageStatus(1);
                        } else {
                            alert("Parsing andato male!!");
                            setPageStatus(2);
                            MC.showToast("An error occurred");
                        }
                    } else if (response.status == 200 && response.data.Response == "False") {
                        setPageStatus(2);
                        MC.showToast(response.data.Error);
                    } else {
                        setPageStatus(2);
                        MC.showToast("An error occurred");
                    }
                })
                .catch(error => {
                    setPageStatus(2);
                    MC.showToast("An error occurred");
                });
        } else {
            navigate("/saved");
        }
    }
    useEffect(loadAllMovieDetails, []);
    useEffect(loadAllMovieDetails, [id]);
    return (
        <div style={{ maxWidth: "100%", textAlign: "center" }}>
            {(movieDetails != null && pageStatus == 1) &&
                <>
                    <h2>Details about this movie</h2>
                    <div className="img-container">
                        <img style={{ maxWidth: "256px", width: "100%", height: "auto" }} src={movieDetails.Poster} />
                    </div>
                    <SaveMovieButton movie={{
                        Title: movieDetails.Title,
                        Year: movieDetails.Year,
                        imdbID: movieDetails.imdbID,
                        Type: movieDetails.Type,
                        Poster: movieDetails.Poster,
                    }} />
                    <h3 style={{ marginBottom: "0" }}>Plot</h3>
                    {movieDetails.Plot &&
                        <p><i>{movieDetails.Plot}</i></p>
                    }
                    {!movieDetails.Plot &&
                        <p>🤷‍♂️ This movie doesn't have a plot!</p>
                    }

                    <h3 style={{ marginBottom: "0" }}>Main information</h3>
                    <div style={{ display: "flex", flexDirection: "row", maxWidth: "100%" }}>
                        <div>
                            {movieRelevantInfo.map((info, index) => {
                                return <div key={index} style={{ padding: "8px" }}><b style={{ color: "gray" }}>{info}</b>:</div>;
                            })}
                        </div>
                        <div style={{ flexGrow: "1", overflowX: "hidden" }}>
                            {movieRelevantInfo.map((info, index) => {
                                return <div key={index} style={{ padding: "8px" }}><TooLongText text={info != "Ratings" ? (movieDetails[info] ? movieDetails[info] : "Not defined") : ""} bgColor={"white"} headingSize={4} /></div>;
                            })}
                        </div>
                    </div>
                    <div style={{ padding: "8px" }}></div>
                    <h3 style={{ marginBottom: "0" }}>Ratings</h3>
                    <div style={{ display: "flex", flexDirection: "row", maxWidth: "100%" }}>
                        <div>
                            {movieDetails.Ratings.map((rating, index) => {
                                return <div key={index} style={{ padding: "8px" }}><b style={{ color: "gray" }}>{rating.Source}</b>:</div>;
                            })}
                        </div>
                        <div style={{ flexGrow: "1", overflowX: "hidden" }}>
                            {movieDetails.Ratings.map((rating, index) => {
                                return <div key={index} style={{ padding: "8px" }}><TooLongText text={rating.Value ? rating.Value : "Not defined"} bgColor={"white"} headingSize={4} /></div>;
                            })}
                        </div>
                    </div>
                    {MC.movieIsSaved(movieDetails.imdbID) &&
                        <>
                            <h3 style={{ marginBottom: "0" }}>Did you like this movie? Rate it yourself!</h3>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                {votes.map((vote, index) => {
                                    return <div key={index} style={{ cursor: "pointer" }} onClick={() => { MC.rateMovie(movieDetails.imdbID, vote); MC.showToast("Thank you very much for rating this movie!"); }}><StarIcon lighted={MC.getVote(movieDetails.imdbID) >= vote} /></div>;
                                })}
                            </div>
                        </>
                    }
                    {!MC.movieIsSaved(movieDetails.imdbID) &&
                        <>
                            <h3 style={{ marginBottom: "0" }}>Save this movie to rate it yourself!</h3>
                        </>
                    }
                    <div style={{padding: "8px"}}>

                    </div>
                </>
            }
            {
                pageStatus == 2 &&
                <h2>An error occurred. We're sorry for the inconvenience!</h2>
            }
            {
                pageStatus == 0 &&
                <h2>Loading. Please wait...</h2>
            }
        </div >
    );
}

export default MovieDetailsPage;