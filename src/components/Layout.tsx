import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div id="main" className="w-full flex ">
            <aside id="sidebar" className="bg-gray-200 min-w-[200px] h-screen">
                <ul>
                    <Link to="/">
                        <li>Add Items</li>
                    </Link>

                    <Link to="/manage-items">
                        <li>Manage Items</li>
                    </Link>
                </ul>
            </aside>
            <aside id="main-content">
                <Outlet />
            </aside>
        </div>
    )
}