import { Link } from 'react-router-dom';
import  '../components/Header.css';

function Header() {
    return (
    <header className="headerH" id="headerH">
      <div className="app-nameH">App Name</div>
      <div className="linksH">
        <Link className="loginH" to="/login">Login</Link>
        <Link className="registerH" to="/register">Register</Link>
      </div>
    </header>
  )
}

export default Header;