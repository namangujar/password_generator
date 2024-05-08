import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(6);
  const [numberIncluded, setNumberIncluded] = useState(false);
  const [charIncluded, setCharIncluded] = useState(false);
  const [password, setPassword] = useState("")

  const passRef = useRef(null);

  const generatePassword = useCallback((() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberIncluded) { str += "0123456789" }
    if (charIncluded) { str += "!@#$%^&?" }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }), [length, numberIncluded, charIncluded, setPassword])

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => { generatePassword() }, [length, numberIncluded, charIncluded])

  return (
    <div className='h-screen  place-content-center  bg-gradient-to-r from-violet-500 to-fuchsia-500 '>
      <div className=" max-w-lg  mx-auto  shadow-md rounded-xl px-4 py-4 my-0   bg-gray-800 text-orange-500 " >
        <h1 className='text-white text-center  mb-5 font-bold text-xl tracking-wide'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input className="outline-none w-full py-1 px-3" type='text' value={password} placeholder='password' ref={passRef} readOnly />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900 active:bg-violet-900' onClick={copyPassword}>copy</button>
        </div>
        <div className=' sm:flex sm:justify-between  text-lg place-content-center'>
          <div className='flex place-content-center mt-2'>
            <input type='range' value={length} className='cursor-pointer'
              min={6}
              max={50}
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='ml-3'>Length: {length}</label>
          </div>
          <div className=" flex place-content-center mt-2">
            <input type='checkbox' id='numberInput' defaultChecked={numberIncluded} onChange={() => { setNumberIncluded((prev) => !prev) }} />
            <label className='ml-3' htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex place-content-center mt-2">
            <input type='checkbox' id='characterInput' defaultChecked={charIncluded} onChange={() => { setCharIncluded((prev) => !prev) }} />
            <label className='ml-3' htmlFor="characterInput">character</label>
          </div>
        </div>
        <div className='mx-auto flex place-content-center'>
          <button className='mt-7 bg-blue-700 text-white px-9 py-0.5 shrink-0 rounded-md 
          hover:bg-blue-900 active:bg-violet-900' onClick={generatePassword}>Generate</button>
        </div>
      </div>
    </div>


  )
}

export default App
