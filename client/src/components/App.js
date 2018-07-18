import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'

// Components
import Header from './Header'
import Core from './Core/Core'
import Home from './Core/Home'
import About from './Core/About'
import Help from './Core/Help'
import NotFound from './Core/NotFound'

import Login from './Authentication/Login'
import Signup from './Authentication/Signup'

// Styles
import '../styles/css/Core.css'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <Router>
        <div id="app">
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Core page={<Home />} />} />
            <Route exact path="/about" render={() => <Core page={<About />} />} />
            <Route exact path="/help" render={() => <Core page={<Help />} />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="*" render={() => <Core page={<NotFound />} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(
  null,
  actions
)(App)
