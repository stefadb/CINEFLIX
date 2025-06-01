import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Movie, SavedMovie } from "../types/types";
import { ToastContainer, toast } from 'react-toastify';

type MovieContextType = {
    searchTerm: string,
    setSearchTerm: (newSearchTerm: string) => void,
    savedMovies: SavedMovie[],
    setSavedMovies: (newSavedMovies: SavedMovie[]) => void,
    openedMovie: boolean,
    setOpenedMovie: (newSetOpenedMovie: boolean) => void,
    imdbID: string | null,
    setImdbID: (newImdbID: string | null) => void,
    showSearch: boolean,
    setShowSearch: (newShowSearch: boolean) => void,
    movieIsSaved: (imdbId: string) => boolean,
    saveMovie: (movie: Movie) => void,
    unsaveMovie: (imdbID: string) => void,
    rateMovie: (imdbID: string, vote: 1 | 2 | 3 | 4 | 5) => void,
    showToast: (text: string) => void,
    getGridTemplateColumns: () => string,
    gridDivSize: number,
    getVote: (imdbID: string) => 0 | 1 | 2 | 3 | 4 | 5
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

function MovieContextProvider({ children }: { children: ReactNode }) {
    const gridDivSize = 150;

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [savedMovies, setSavedMovies] = useState<SavedMovie[]>([]);
    const [openedMovie, setOpenedMovie] = useState<boolean>(false);
    const [imdbID, setImdbID] = useState<string | null>(null);
    const [showSearch, setShowSearch] = useState<boolean>(false);

    //Carica i saved movies all'avvio
    useEffect(() => {
        const storedSavedMovies = localStorage.getItem('savedMovies');
        if(storedSavedMovies){
            setSavedMovies(JSON.parse(storedSavedMovies) as SavedMovie[]);
        }
    }, []);

    function storeSavedMovies(array: SavedMovie[]){
        localStorage.setItem('savedMovies',JSON.stringify(array));
    }

    function movieIsSaved(imdbID: string): boolean {
        for (let i = 0; i < savedMovies.length; i++) {
            if (imdbID == savedMovies[i].movie.imdbID) {
                return true;
            }
        }
        return false;
    }

    function getGridTemplateColumns() {
        return `repeat(auto-fit, minmax(${gridDivSize + "px"}, ${gridDivSize + "px"}))`;
    }

    function saveMovie(movie: Movie) {
        let savedMoviesTemp: SavedMovie[] = JSON.parse(JSON.stringify(savedMovies)) as SavedMovie[];
        savedMoviesTemp.push({
            movie: {
                Title: movie.Title,
                Poster: movie.Poster,
                Year: movie.Year,
                imdbID: movie.imdbID,
                Type: movie.Type
            }
        });
        setSavedMovies(savedMoviesTemp);
        storeSavedMovies(savedMoviesTemp);
        showToast("The " + movie.Type + " '" + movie.Title + "', has been saved!");
    }

    function showToast(text: string) {
        toast.dismiss();
        toast(text, {
            type: 'info'
        });
    }
    function unsaveMovie(imdbID: string) {
        const filteredSavedMovies = savedMovies.filter((savedMovie) => {
            return savedMovie.movie.imdbID != imdbID;
        });
        setSavedMovies(filteredSavedMovies);
        storeSavedMovies(filteredSavedMovies);
        showToast("Movie succesfully removed!");
    }

    function rateMovie(imdbID: string, vote: 1 | 2 | 3 | 4 | 5) {
        let savedMoviesTemp: SavedMovie[] = JSON.parse(JSON.stringify(savedMovies)) as SavedMovie[];
        for (let i = 0; i < savedMoviesTemp.length; i++) {
            if (savedMoviesTemp[i].movie.imdbID == imdbID) {
                savedMoviesTemp[i].vote = vote;
                break;
            }
        }
        storeSavedMovies(savedMoviesTemp);
        setSavedMovies(savedMoviesTemp);
    }

    function getVote(imdbID: string): 0 | 1 | 2 | 3 | 4 | 5 {
        console.log("id passato a getVote: " + imdbID);
        for (let i = 0; i < savedMovies.length; i++) {
            if (savedMovies[i].movie.imdbID == imdbID) {
                const vote = savedMovies[i].vote;
                if (vote == 1 || vote == 2 || vote == 3 || vote == 4 || vote == 5) {
                    console.log("getVote restituisce " + vote);
                    return vote;
                }
            }
        }
        console.log("getVote restituisce " + 0);
        return 0;
    }
    return (
        <MovieContext.Provider value={{ searchTerm, setSearchTerm, savedMovies, setSavedMovies, openedMovie, setOpenedMovie, imdbID, setImdbID, showSearch, setShowSearch, movieIsSaved, saveMovie, unsaveMovie, rateMovie, showToast, getGridTemplateColumns, gridDivSize, getVote }}>
            {children}
            <ToastContainer />
        </MovieContext.Provider>
    );
};

function useMovieContext() {
    const ctx = useContext(MovieContext);
    if (!ctx) throw new Error("useMovieContext deve essere usato dentro MyProvider");
    return ctx;
};

export { MovieContextProvider, useMovieContext };
