import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Components
import Core from './Core/Core'
import Home from './Core/Home'
import About from './Core/About'
import Help from './Core/Help'
import NotFound from './Core/NotFound'

// Styles
import '../styles/css/Core.css'

const App = () => {
  return (
    <Router>
      <div id="app">
        <Switch>
          <Route exact path="/" render={() => <Core page={<Home />} />} />
          <Route exact path="/about" render={() => <Core page={<About />} />} />
          <Route exact path="/help" render={() => <Core page={<Help />} />} />
          <Route exact path="*" render={() => <Core page={<NotFound />} />} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
