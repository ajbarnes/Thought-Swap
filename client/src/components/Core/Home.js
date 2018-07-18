import React, { Component } from 'react'

import FacilitatorMock from '../../assets/facilitator-mock.png'
import ParticipantMock from '../../assets/participant-mock.png'

class Home extends Component {
  render() {
    return (
      <div id="home">
        {this.renderSplash()}
        {this.renderFeatures()}
        {this.renderCallToAction()}
      </div>
    )
  }

  renderSplash() {
    return (
      <section className="splash">
        <div className="container">
          <h1>More meaningful discussion for the modern classroom.</h1>
          <h2>Share and consider thoughts without fear.</h2>
          <a className="btn lrg hollow" href="/register">
            Get Started Today!
          </a>
        </div>
      </section>
    )
  }

  renderFeatures() {
    return (
      <div id="features">
        {this.renderFacilitatorFeatures()}
        {this.renderParticipantFeatures()}
      </div>
    )
  }

  renderFacilitatorFeatures() {
    return (
      <section className="feature">
        <div className="container">
          <img src={FacilitatorMock} alt="Facilitator Dashboard" />
          <div>
            <h1>Run productive disussions with ease</h1>
            <p>
              With an interface designed for tablets, computers and projectors,
              you can run disussions how you want. Let the app work for you!
            </p>
            <ul>
              <li>
                <i className="fa fa-group" />
                <h3>Group Generation</h3>
                <p>
                  Get started quick with auto-generated participant logins.
                  Easily manage and return to groups afterwards.
                </p>
              </li>
              <li>
                <i className="fa fa-refresh" />
                <h3>Thought Distribution</h3>
                <p>
                  Have participants consider another perspective by distributing
                  responses to your prompts.
                </p>
              </li>
              <li>
                <i className="fa fa-magic" />
                <h3>Moderater Tools</h3>
                <p>
                  Direct discussion by organizing or viewing thoughts. Keep it
                  on topic with a delete button.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    )
  }

  renderParticipantFeatures() {
    return (
      <section className="feature">
        <div className="container">
          <img src={ParticipantMock} alt="Participant Dashboard" />
          <div>
            <h1>Share your thoughts without pressure</h1>
            <p>
              Take your time while everyone responds at once and form your
              answers to prompts without fear of judgement.
            </p>
            <ul>
              <li>
                <i className="fa fa-user-secret" />
                <h3>Thought Anonymity</h3>
                <p>
                  Your usernames are auto-generated and &quot;silly&quot; to
                  prevent linking them to you.
                </p>
              </li>
              <li>
                <i className="fa fa-keyboard-o" />
                <h3>Complex Expression</h3>
                <p>
                  Sometimes, words just aren&apos;t enough. Format your thoughts
                  as a list, picture, and more with the built-in WISYWIG editor.
                </p>
              </li>
              <li>
                <i className="fa fa-sort-amount-desc" />
                <h3>Session History</h3>
                <p>
                  Keep track of any responses sent out during a session or hide
                  the list from wondering eyes and have it erase itself on
                  page-exit.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    )
  }

  renderCallToAction() {
    return (
      <section className="cta">
        <div className="container">
          <h1>Convinced?</h1>
          <h2>Become a facilitator in less than 3 minutes, absolutely free.</h2>
          <a className="btn lrg blue" href="/register">
            Start a discussion today
          </a>
        </div>
      </section>
    )
  }
}

export default Home
