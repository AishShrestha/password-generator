import { useState, useCallback, useEffect, useRef } from "react";
function App() {

  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (charAllowed) string += "!@#$^&*()_+{}";
    if (numberAllowed) string += "01234556789";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * string.length)
      pass += string.charAt(char);


    }
    setPassword(pass);
  }, [length, charAllowed, numberAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numberAllowed, generatePassword])

  const passwordRef = useRef(null)

  return (
    <>
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">

        <div className="mb-6 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>

          <div className="flex flex-row ">
            <input type="text" ref={passwordRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1" readOnly value={password} />
            <button type="button" onClick={copyPasswordToClipboard} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5  me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 py-2.5">Copy</button>
          </div>

        </div>

        <div className="flex flex-row w-full gap-4">

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Length:{length}</label>
            <input type="range" min={8} max={50} value={length} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" onChange={(event) => {
              setLength(parseInt(event.target.value));
            }}></input>
          </div>

          <div className=" flex flex-col items-center mb-4">
            <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-3 ">Number</label>
            <input type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" defaultChecked={numberAllowed} onChange={() => {
              setNumberAllowed((prev) => !prev);

            }} />
          </div>

          <div className=" flex flex-col items-center mb-4">
            <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mb-3 ">Character</label>
            <input type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" defaultChecked={charAllowed} onChange={() => {
              setCharAllowed((prev) => !prev);
            }} />
          </div>

        </div>


      </div>


    </>)


}

export default App
