import { AbiFunction } from '@/services/data-conversion';
import React, { useState } from 'react';

interface FunctionCardProps {
  abiFunction: AbiFunction;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ abiFunction }) => {
  // Initialize state for each input
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
    () =>
      abiFunction.inputs.reduce((acc, input) => {
        acc[input.name] = '';
        return acc;
      }, {} as { [key: string]: string }),
  );

  // Handle input change
  const handleInputChange = (name: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCallFunction = () => {
    // Logic to call the function with the input values
    console.log('Calling function with values:', inputValues);
  };

  return (
    <div className="flex flex-col gap-1 border border-gray-300 p-3">
      <div className="flex gap-2 items-center">
        <span className="text-sm border border-gray-300">
          {abiFunction.stateMutability}
        </span>
        <span>{abiFunction.name}</span>
      </div>
      <div className="flex flex-col gap-2">
        {abiFunction.inputs.map((input) => (
          <div key={input.name} className="flex flex-col">
            <label className="text-sm">
              {input.name} ({input.type})
            </label>
            <input
              type="text"
              value={inputValues[input.name]}
              onChange={(e) => handleInputChange(input.name, e.target.value)}
              className="border border-gray-300 p-1 bg-gray-800"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleCallFunction}
        className="border border-gray-300 p-1 mt-2"
      >
        Call
      </button>
    </div>
  );
};

export default FunctionCard;
