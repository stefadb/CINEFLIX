import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MovieSchema, type Movie, type SavedMovie } from "../../types/types";
import MovieCard from "../MovieCard";
import { useMovieContext } from "../../context/MovieContext";

function MovieSearch() {
    const MC = useMovieContext();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [pageState, setPageState] = useState<1 | 2>(1); //1 = pronto, 2 = errore
    const [pageToLoad, setPageToLoad] = useState<number>(1);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    //makeAnApiCall andrebbe chiamato dopo 1 secondo che non si verificano cambiamenti
    useEffect(() => { timerForMakeAnApiCall(100) }, []);
    useEffect(() => { timerForMakeAnApiCall(1000); }, [MC.searchTerm]);

    function timerForMakeAnApiCall(timeoutMs: number) {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            makeApiCall();
        }, timeoutMs);
    }

    useEffect(() => { setMovies([]); setPageToLoad(1); }, []);
    useEffect(() => { setMovies([]); setPageToLoad(1); }, [MC.searchTerm]);

    function makeApiCall() {
        if (MC.searchTerm != "") {
            setPageState(1);
            setLoading(true);
            axios.get("http://www.omdbapi.com/?apikey=40dafa3a&s=" + MC.searchTerm + "&page=" + pageToLoad)
                .then(response => {
                    if (response.status == 200 && response.data.Response == "True") {
                        console.log("Response data è questo:");
                        console.log(response.data);
                        let isSafeParse = true;
                        for (let i = 0; i < response.data["Search"].length; i++) {
                            if (!(MovieSchema.safeParse(response.data["Search"][i]).success)) {
                                isSafeParse = false;
                                break;
                            }
                        }
                        if (isSafeParse) {
                            setMovies(prev => [...prev, ...response.data["Search"]]);
                            setPageToLoad(pageToLoad + 1);
                            setPageState(1);
                        } else {
                            MC.showToast("An error occurred");
                            setPageState(2);
                        }
                    } else if (response.status == 200 && response.data.Response == "False") {
                        MC.showToast(response.data.Error);
                        setPageState(1);
                    }else{
                        MC.showToast("An error occurred");
                        setPageState(2);
                    }
                }).catch(error => {
                    MC.showToast("An error occurred");
                    setPageState(2);
                })
                .finally(() => { setLoading(false); });
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            {pageState == 1 &&
                <>
                    <h2>Search results for "{MC.searchTerm}"</h2>
                    <div className="grid-container" style={{ gridTemplateColumns: MC.getGridTemplateColumns() }}>
                        {movies.map((movie, index) => {
                            return <MovieCard key={index} movie={movie} />;
                        })}
                    </div>
                    {loading && <p>Loading...</p>}
                    {!loading && <p></p>}
                    {!loading && pageToLoad <= 100 && <button onClick={makeApiCall}>Load more movies</button>}
                </>
            }
            {pageState == 2 &&
                <h2>An error occurred. We're sorry for the inconvenience!</h2>
            }
        </div>
    );
}

export default MovieSearch;