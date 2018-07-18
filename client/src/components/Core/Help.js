import React from 'react'

import ParticipantHelpOne from '../../assets/participant-help-1.png'
import ParticipantHelpTwo from '../../assets/participant-help-2.png'
import FacilitatorHelp from '../../assets/facilitator-help.png'

const Help = () => {
  return (
    <div id="help">
      <section className="info">
        <div className="container">
          <h1>General Help:</h1>
          <h2>Got a bug to report or a feature to request?</h2>
          <p>
            Please see our
            <a href="https://github.com/VT-CHCI/Thought-Swap/issues">
              project repository&apos;s issues
            </a>
            and make a post if nessessary.
          </p>
          <br />
          <br />

          <h1>Participant Help:</h1>
          <img src={ParticipantHelpOne} alt="Participant Help: Responding" />
          <br />
          <br />

          <img src={ParticipantHelpTwo} alt="Participant Help: Considering" />
          <br />
          <br />

          <h1>Facilitator Help:</h1>
          <img src={FacilitatorHelp} alt="Facilitator Help Diagram" />
          <br />
          <br />
        </div>
      </section>
    </div>
  )
}

export default Help
