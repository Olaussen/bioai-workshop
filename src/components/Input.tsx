import React, { ChangeEvent, useState } from "react";
import CONFIG from "../geneticalg/config";

interface InputProps {
  onChange?: (value: string, valid: boolean) => void;
}

const Input: React.FC<InputProps> = ({ onChange }) => {
  const [value, setValue] = useState<string>();
  const [valid, setValid] = useState<boolean>(false);

  const validate = (newVal: string): boolean => {
    for (const char of newVal) {
      if (!CONFIG.chars.includes(char)) return false;
    }

    return newVal.length !== 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const valid = validate(e.target.value);
    setValid(valid);
    onChange && onChange(e.target.value, valid);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={"Skriv inn setning..."}
      className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-slate-900 text-2xl placeholder:text-slate-800 ${
        valid ? "bg-green-200" : "bg-red-200"
      }`}
    />
  );
};

export default Input;
