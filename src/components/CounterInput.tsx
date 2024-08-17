import { Button } from 'flowbite-react';
import React, { ChangeEvent } from 'react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"

interface CounterInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  increaseValue?: number;
}

const CounterInput = ({ value, onChange, max = 400, min = 0, increaseValue = 1 }: CounterInputProps) => {

  const handleChange = (newValue: number) => {
    if (newValue > max || newValue < min) {
      return;
    }
    onChange(Math.round(newValue * 10) / 10)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;

    // Regular expression to match number with up to one decimal point
    const regex = /^[0-9]*\.?[0-9]?$/;

    if (regex.test(inputValue)) {
      handleChange(parseFloat(inputValue));
    }
  }

  return (
    <div className="flex gap-1 w-full">
      <Button color="dark" className='flex justify-center items-center' onClick={() => handleChange(value - increaseValue)}>
        <FaCaretDown />
      </Button>
      <input 
        type="text" 
        value={value || 0} 
        onChange={handleInputChange}
        className="bg-slate-800 p-2 flex-1 rounded-md border border-gray-300 min-w-[100px] text-center" 
      />
      <Button color="dark" className='flex justify-center items-center' onClick={() => handleChange(value + increaseValue)}>
        <FaCaretUp />
      </Button>
    </div>
  )
}

export default CounterInput