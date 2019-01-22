import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light  bg-light navbar-fixed-top">
        <Link className="navbar-brand" to="/">Home</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/sparql1">Sparql1</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sparql2">Sparql2</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/editor">Editor</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
