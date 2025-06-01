import { useNavigate } from "react-router-dom";
import CineFlixLogo from "./icons/CineFlixLogo";
import SearchIcon from "./icons/SearchIcon";
import { useMovieContext } from "../context/MovieContext";

function SidebarTop() {
    const navigate = useNavigate();
    const MC = useMovieContext();
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <CineFlixLogo />
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexGrow: "1" }}>
                    <div>
                        <h1><b>CINEFLIX</b></h1>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", borderBottom: "2px solid #495057" }}>
                <div style={{ flexGrow: "1" }}>
                    <input type="text" style={{ all: "unset", width: "100%" }} value={MC.searchTerm} onChange={(event) => { MC.setSearchTerm(event.target.value); navigate("/search"); }} placeholder="Type here to search" />
                </div>
                <div>
                    <SearchIcon lighted={false} />
                </div>
            </div>
        </div>
    );
}

export default SidebarTop;