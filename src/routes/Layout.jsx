import {Outlet, Link } from "react-router-dom";
import './Layout.css'
const Layout = () => {
    return (
        <div className="layout-wrapper">
            <nav>
                <ul>
                    <li className="home-link" key="home-button">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="create-link" key="create-button">
                        <Link to="/Create">
                            Create
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout;