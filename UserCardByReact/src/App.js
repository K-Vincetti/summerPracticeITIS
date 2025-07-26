import React, { useState, useEffect } from "react"
import Button from "./Components/Button"
import Header from "./Components/Header"


const App = (props) => {
  const [name, setName] = useState("")
  const [newName, changeName] = useState("")

  useEffect(() => {
    console.log("Имя пользователя изменено на " + name)
  }, [name])

  return (
      <div className="name">
        <Header title = {name} />
        <main>
            <label htmlFor="nickName">Имя</label><br />
            <input 
            id="nickName" 
            placeholder={"Введите имя"} 
            onChange={(e) => changeName(e.target.value)}
            /><br />
            <Button 
            text="Сохранить" 
            className="save"
            action={() => setName(newName)}
            />
            <Button 
            text="Сбросить"
            className="reset"
            action={() => setName("")}
            />
        </main>
      </div>)
      

}

export default App