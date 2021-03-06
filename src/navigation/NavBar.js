import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light  bg-light navbar-fixed-top">
        <Link className="navbar-brand" to="/">Home</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/queries">Queries</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/editor">Editor</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
