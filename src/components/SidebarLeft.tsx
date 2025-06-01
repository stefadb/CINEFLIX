import SidebarTop from "./SidebarTop";
import SidebarButtons from "./SidebarButtons";

function SidebarLeft() {
    return (
        <div className="sidebar-left">
            <SidebarTop />
            <div style={{ flexGrow: 1 }}>
                <div style={{ padding: "4px" }}></div>
                <SidebarButtons />
            </div>
            <div>
                {/*LOGIN BUTTON*/}
            </div>
        </div>
    );
}

export default SidebarLeft;