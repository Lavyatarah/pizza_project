import  '../components/Header.css';

function Header() {
    return (
    <header className="headerH" id="headerH">
      <div className="app-nameH">App Name</div>
      <div className="linksH">
        <a className="loginH" href="#">Login</a>
        <a className="registerH" href='#'>Register</a>
      </div>
    </header>
  )
}

export default Header;