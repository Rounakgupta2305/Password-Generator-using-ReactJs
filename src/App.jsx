import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
function App() {

  let [length, setLength]= useState(8)
  let [numberAllowed, setnumberAllowed]= useState(false)
  let [charAllowed, setcharAllowed]= useState(false)
  let [password, setPassword] = useState("")

  let passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str+="0123456789"
    } 
    if(charAllowed){
      str+="!@#$%^&*-_+=[]{}~`"
    }
    for(let i=1; i<=length; i++){
      pass+= str.charAt(Math.floor(Math.random()*str.length+1))
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=> {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  let passref= useRef(null)
  let copypass = useCallback(()=>{
    passref.current?.select();
    passref.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  return (
  <div className='body'>
    <div className='main'>
      <h1 className='title'>Password Generator</h1>
      <div className='input-container'>
        <input className='input-text' readOnly type='text' value={password} ref={passref}/>
        <button className='btn' onClick={copypass}>Copy</button>
      </div>
      <div className='options-container'>
        <div className='length'>
          <input min={6} max={100} type='range' value={length} onChange={(e)=> {setLength(e.target.value)}}/>
          <label>Length: {length}</label>
        </div>
        <div className='options'>
          <div className='checkbox'>
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setnumberAllowed((prev)=>!prev)}}/>
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='checkbox'>
            <input type="checkbox" defaultChecked={charAllowed} id="characterInput" onChange={()=>{setcharAllowed((prev)=>!prev)}}/>
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default App
