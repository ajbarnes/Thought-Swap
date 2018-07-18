import React, { Component } from 'react'

class Core extends Component {
  render() {
    return (
      <div id="core">
        {this.props.page}
        {this.renderFooter()}
      </div>
    )
  }

  renderFooter() {
    return (
      <footer>
        <div className="container">
          <a href="https://github.com/VT-CHCI/Thought-Swap" rel="noopener">
            Supported by the <i className="fa fa-github" />pen Source Community
          </a>
        </div>
      </footer>
    )
  }
}

export default Core
