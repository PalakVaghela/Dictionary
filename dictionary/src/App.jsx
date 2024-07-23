import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import ResultList from './Components/ResultList'

// create context

export const InputContext = createContext();

function App() {
  // const [count, setCount] = useState(0)
  const [inputValue,setInputValue] = useState("");
  console.log("Hello");

  const value = {
    inputValue, setInputValue
  }

  return (
    <InputContext.Provider value={value}>

    <div className='App'>
      <Header  ></Header>
      <ResultList></ResultList>
    </div>
    </InputContext.Provider>
  )
}

export default App
