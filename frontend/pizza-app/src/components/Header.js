import { Link } from 'react-router-dom';
import '../components/Header.css';
import { useState, useEffect } from "react";

function Header() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  }, [user]);

  return (
    <header className="headerH" id="headerH">
      <div className="app-nameH">App Name</div>
      <div className="linksH">
        {user ? (
          <Link className='logoutH' to="/logout">Logout</Link>
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