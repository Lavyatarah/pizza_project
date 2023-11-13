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

  const isLoggedIn = localStorage.getItem('jwtToken') !== null;
  const isUser = localStorage.getItem("user") !== null;
  return (
    <header className="headerH" id="headerH">
      {isLoggedIn && isUser ? (<Link className="app-nameH" to="/dashboard">App Name</Link>):(<Link className="app-nameH" to="/">App Name</Link>)}
      
      <div className="linksH">
        {user ? (
          <Link className='logoutH' to="/login" onClick={handleLogout}>Logout</Link>
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