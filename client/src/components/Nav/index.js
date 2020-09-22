import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/img/loo_logo_teal.png';
import './style.css';

const styles = {
  logo: {
    width: "75px"
  }
}

const logout = () => {
  window.localStorage.clear();
  window.location.href = "/";
};

function Nav() {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Loo" style={styles.logo} />
          </Link>
          <a className="navbar-brand" href="/logout" onClick={logout}>
            Logout
            </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;