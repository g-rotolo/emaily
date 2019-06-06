import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return(
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Emaily</a>
          <ul id="nav-mobile" className="right">
            <li>
              <a href="sass.html">Login With Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);