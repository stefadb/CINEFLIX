import { useNavigate } from "react-router-dom";
import BookMarkIcon from "./icons/BookMarkIcon";
import SearchIcon from "./icons/SearchIcon";

function SidebarButtons() {
    const navigate = useNavigate();
    return (
        <div className="sidebar-buttons-container">
            <div onClick={() => { navigate("/search"); }} className="sidebar-button">
                <div style={{ paddingRight: "4px" }}>
                    <SearchIcon lighted={location.pathname == "/search"} />
                </div>
                <div>
                    {location.pathname == "/search" &&
                        <b>Search movies</b>
                    }
                    {location.pathname != "/search" &&
                        <span>Search movies</span>
                    }
                </div>
            </div>
            <div onClick={() => { navigate("/saved"); }} className="sidebar-button">
                <div style={{ paddingRight: "4px" }}>
                    <BookMarkIcon lighted={location.pathname == "/saved"} />
                </div>
                <div>
                    {location.pathname == "/saved" &&
                        <b>Saved movies</b>
                    }
                    {location.pathname != "/saved" &&
                        <span>Saved movies</span>
                    }
                </div>
            </div>
        </div>
    );
}

export default SidebarButtons;