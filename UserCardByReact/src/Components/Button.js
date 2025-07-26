import React from "react"

class Button extends React.Component{
  render() {
    return (
      <button className={this.props.className} onClick={this.props.action}>{this.props.text}</button>
    )
  }
}

export default Button