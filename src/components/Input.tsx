import React, { useState } from "react";
import CONFIG from "../geneticalg/config";
import LADDER from "../ladder";
import Button from "./Button";

interface InputProps {
  onChange?: (value: string, valid: boolean) => void;
  initialize: () => void;
  isInitialized: boolean;
  isValidInput: boolean;
}

const Input: React.FC<InputProps> = ({ onChange, initialize, isInitialized, isValidInput }) => {
  const [value, setValue] = useState<string>();
  const [valid, setValid] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false)

  const validate = (newVal: string): boolean => {
    for (const char of newVal) {
      if (!CONFIG.chars.includes(char)) return false;
    }

    return newVal.length !== 0;
  };

  const handleChange = (value: string) => {
    window.scrollTo(0, 0);
    setValue(value);
    const valid = validate(value);
    setValid(valid);
    onChange && onChange(value, valid);
  };

  return (
    <div className="flex flex-col gap-8 w-full ">
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={"Skriv inn setning..."}
        className={`px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-slate-900 text-2xl placeholder:text-slate-800 ${
          valid ? "bg-green-200" : "bg-red-200"
        }`}
      />
      {!isInitialized && (
          <Button
            onClick={initialize}
            disabled={!isValidInput}
            className={`${!isValidInput ? "bg-red-400" : "bg-slate-500"} self-center`}
          >
            {isValidInput ? "Velg løsning" : "Ugyldige tegn!"}
          </Button>
        )}
      <div className="flex flex-col gap-3 p-4">
      <button className="p-2 bg-slate-800 border border-white hover:bg-slate-950" onClick={() => setOpen(!open)}>{open ? "Lukk" : "Åpne stige"}</button>
      {open && LADDER.map((string, i) => (
        <button
          key={i}
          onClick={() => handleChange(string)}
          className="flex flex-col text-start border border-white cursor-pointer hover:bg-slate-400 bg-slate-600 text-lg p-2"
        >
         <span>{i+1}: {string}</span>
         <span className="text-xs ml-5">Lengde: {string.length}</span>
        </button>
      ))}
      </div>
    </div>
  );
};

export default Input;
