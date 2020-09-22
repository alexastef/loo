import React from 'react';
import logo from '../../assets/img/loo_logo_teal.png';
import './style.css';

const styles = {
  logo: {
    width: "75px"
  }
}

function Nav() {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Loo" style={styles.logo} />
          </a>
          <a className="navbar-brand" href="/logout">
            Logout
            </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;