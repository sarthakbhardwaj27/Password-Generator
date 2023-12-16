import { useCallback, useEffect, useState ,useRef } from "react";
import "./App.css";

function App() {
  const [length,setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter,setIsCharacter] = useState(false);
  const [password,setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
 
  //useRef hook
  const passwordRef = useRef(null);

  const generatePassword = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const chars = "!@#$%&";
    
    if(isNumber) str+=nums;
    if(isCharacter) str+=chars;

    for(let i=0;i<length;i++){
      const idx = Math.floor(Math.random()*str.length)+1;
      pass+=str[idx];
    }
    setPassword(pass);


  },[length,isNumber,isCharacter,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password).then(()=>{
      setIsCopied(true);
    });
  },[password,isCopied])

  useEffect(()=>{
    generatePassword();
    setIsCopied(false);
  },[length,isNumber,isCharacter,generatePassword])

  return (
    <>
      <h1 className="text-4xl text-center text-white">Password Generator</h1>
      <div className="ww-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-200 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="password" readOnly ref={passwordRef}/>
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPasswordToClipboard}>{isCopied ? "Copied" : "Copy"}</button>
        </div>
        <div className="flex text-m gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={isNumber}
              id="numberInput"
              onChange={()=>{
                setIsNumber((prev)=>!prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={isCharacter}
              id="characterInput"
              onChange={()=>{
                setIsCharacter((prev)=>!prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
