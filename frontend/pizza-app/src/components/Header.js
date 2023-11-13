import { Link } from 'react-router-dom';
import '../components/Header.css';
import { useState, useEffect } from "react";
import { postAuthenticatedEndpoint } from '../auth';

function Header() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  }, [user]);

  const handleLogout = () => {
    const res = postAuthenticatedEndpoint("logout", {});
    console.log(res);
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
    setUser(null);
    
  }

  return (
    <header className="headerH" id="headerH">
      <div className="app-nameH">App Name</div>
      <div className="linksH">
        {user ? (
          <Link className='logoutH' to="/" onClick={handleLogout}>Logout</Link>
        ) : (
          <>
            <Link className="loginH" to="/login">Login</Link>
            <Link className="registerH" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header;