import React, { Component } from 'react'
import { connect } from 'react-redux'

import Logo from '../assets/project-logo.png'

class Header extends Component {
  renderHeaderOptions() {
    console.log(this.props.auth)
    switch (this.props.auth) {
      case null: // Some error/ not connected to API
        return

      case false: // Determined to be UN-Authenticated
        return this.renderLoginOptions()

      default:
        return this.renderUserOptions()
    }
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1 className="logo">
            <a href="/">
              <img src={Logo} alt="home" />
            </a>
          </h1>
          <nav>
            <ul className="right">
              <li key="1">
                <a href="/about">About</a>
              </li>
              <li key="2">
                <a href="/help">Help</a>
              </li>
              {this.renderHeaderOptions()}
            </ul>
          </nav>
        </header>
      </div>
    )
  }

  renderLoginOptions() {
    return [
      <li key="3">
        <a className="btn sml blue auth" href="/login?role=participant">
          Participant Login
        </a>
      </li>,
      <li key="4">
        <a className="btn sml blue auth" href="/login?role=facilitator">
          Facilitator Login
        </a>
      </li>
    ]
  }

  renderUserOptions() {
    return [
      <li key="3" className="user-control">
        <div className="btn sml blue auth user-badge">
          <i className="fa fa-user" /> {this.props.auth.username}
        </div>
        <button
          type="button"
          className="btn sml blue auth"
          data-toggle="dropdown"
        >
          <span className="caret" />
        </button>
        <ul className="dropdown-menu">
          {this.renderDropdownOption()}
          <br />
          <li id="logout">
            <a href="/api/auth/logout">
              <i className="fa fa-sign-out" />Logout
            </a>
          </li>
        </ul>
      </li>
    ]
  }

  renderDropdownOption() {
    if (this.props.auth.role === 'facilitator') {
      return (
        <li>
          <a href="/facilitator/mgmt">Group Management</a>
        </li>
      )
    }
    return (
      <li>
        <a href="/participant">Dashboard</a>
      </li>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header)
