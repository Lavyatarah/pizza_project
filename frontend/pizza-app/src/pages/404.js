import Header from "../components/Header";
import { Link } from "react-router-dom";





const NotFound = () => {
    return (
        <>
            <Header />
       
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="notfound text-center">
                <div className="notfound-text display-1">404</div>
                <div className="notfound-text1 h2">Page Not Found</div>
                <div className="notfound-text2 h4">
                    The page you are looking for might have been removed had its name
                    changed or is temporarily unavailable.
                </div>
                <div className="notfound-text3">
                    <Link to="/" className="btn btn-dark">
                        Home Page
                    </Link>
                </div>
            </div>
            </div>
             </>
    );
};

export default NotFound;