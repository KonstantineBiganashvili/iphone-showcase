import React from 'react';
import logo from '../assets/images/logo.svg';
import search from '../assets/images/search.svg';
import store from '../assets/images/store.svg';
import { navBarLinks } from '../constants/links';

const NavBar = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <ul className="list-styled">
          <li>
            <img src={logo} alt="apple icon" />
          </li>
          {navBarLinks.map(({ name, url }) => (
            <li key={name}>
              <a
                className="link-styled"
                //   href={url}
              >
                {name}
              </a>
            </li>
          ))}
          <li>
            <img src={search} alt="search icon" />
          </li>
          <li>
            <img src={store} alt="store icon" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
