import React from 'react'

const About = () => {
  return (
    <div id="about">
      <section className="info">
        <div className="container">
          <h1>What is ThoughtSwap?</h1>
          <p>
            It is a simple web application built around the idea that when we
            discuss something we produce many thoughts. That, while we&apos;re
            concerned with how those thoughts are received, we also care about
            properly understanding the thoughts others share.
            <br />
            <br />
            ThoughtSwap addresses these concerns in two ways. First, by allowing
            participants to be as anonymous as possible, anxieties associated
            with contributing to the discussion like a rush to say something, or
            fear of judgement, are minimized. Second by allowing thoughts to be
            distributed a facilitator can direct participants to consider their
            received thought, (especially if it is different from their own)
            increasing the likelihood that shared thoughts are truly heard and
            understood.
            <br />
            <br />
            Put in simpler terms, the situation is analogous to a facilitator
            posing a question, participants throwing their thoughts into a hat
            on a folded piece of paper, and each participant drawing from the
            hat after everyone has contributed, then discussing the new thought.
            <br />
            <br />
            ThoughtSwap &nbsp;
            <a href="https://dl.acm.org/citation.cfm?id=1718934">
              builds on and continues research
            </a>
            &nbsp; on the effects of computer-supported cooperative work. What
            began as a Java applet circa 2008 has since been re-implemented as
            today&apos;s interface to reach a wider audience.
          </p>

          <h1>Who should use ThoughtSwap?</h1>
          <p>
            Anyone that finds themselves in a group of people, talking about any
            topic should find ThoughtSwap helpful. Although the original design
            is based on use in an educational setting, the concept is broad
            enough that it should be easy to adapt to any discussion situation.
          </p>

          <h1>How do I use ThoughtSwap?</h1>
          <p>
            Facilitators can easily get started by &nbsp;
            <a href="/register">registering for an account</a> &nbsp; and
            creating a group on the page that follows. After a group has been
            created, the facilitator can distribute the generated sillynames to
            their participants in any way they see fit. Clicking the
            group&apos;s name brings up the dashboard for that group.
            <br />
            <br />
            At this point, participants can log on with their sillynames and the
            facilitator can choose to enter a prompt for everyone to respond to.
            Once thoughts have been received, the facilitator can reorder them,
            enlarge them for full-screen viewing, or delete them entirely.
            Participants can also view or hide their previously submitted
            thoughts during this process.
            <br />
            <br />
            At any point, facilitators can distribute the thoughts received,
            change the prompt of the session, or start a new session entirely.
            If thoughts are distributed, participants see them on their screen
            and can assign their received thought a color (which changes the
            thought on the facilitator screen) in order to group similar
            thoughts.
            <br />
            <br />
            The suggested setup for this process a projector-connected computer
            for the facilitator, and either a tablet or computer for each
            participant.
            <br />
            <br />
            For more specific usage assistance, please see &nbsp;
            <a href="/help">the help page.</a>
          </p>
        </div>
      </section>
    </div>
  )
}

export default About
