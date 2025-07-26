import React from "react"

class Header extends React.Component{
  render() {
    return <h3 className="header">
      {this.props.title !== "" ?
      `Ваше имя: ${this.props.title}` :
      "Имя не указано"}</h3>
  }
}

export default Header