import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import QueryString from 'query-string'

import Logo from '../../assets/project-logo.png'

class Login extends Component {
  constructor(props) {
    super(props)
    const params = QueryString.parse(props.location.search)
    this.state = {
      isParticipant: params.role === 'participant'
    }
  }

  renderFields() {
    return (
      <div id="login-form">
        <label htmlFor="role">Facilitator?</label>
        <Field name="role" id="role" component="input" type="checkbox" />
      </div>
    )
  }

  render() {
    const { isParticipant } = this.state
    return (
      <div id="login">
        <a href="/">
          <img src={Logo} alt="home" />
        </a>
        <h2>{isParticipant ? 'Participant Login' : 'Facilitator Login'}</h2>
        {/* <form onSubmit={this.props.handleSubmit()} /> */}
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  return errors
}

const mapStateToProps = state => {
  return {}
}

export default reduxForm({
  validate,
  form: 'loginForm'
})(Login)
