import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    // Component code will go here
return (
    <header>
        <nav>
            <ul>
                <li>
                    <NavLink to="/" exact activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" activeClassName="active">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" activeClassName="active">
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
        <div>
            <button>
                <NavLink to="/login" activeClassName="active">
                    Login
                </NavLink>
            </button>
            <button>
                <NavLink to="/register" activeClassName="active">
                    Register
                </NavLink>
            </button>
        </div>
    </header>
);}

export default Header;
