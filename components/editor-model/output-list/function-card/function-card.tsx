import { useReadContract } from '@/hooks/useReadContract';
import { AbiFunction } from '@/services/data-conversion';
import React, { useState } from 'react';

interface FunctionCardProps {
  abiFunction: AbiFunction;
  contractAddress: string;
}

type InputValue = {
  value: string;
  type: string;
};

const FunctionCard: React.FC<FunctionCardProps> = ({
  abiFunction,
  contractAddress,
}) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: InputValue }>(
    () =>
      abiFunction.inputs.reduce((acc, input) => {
        acc[input.name] = { value: '', type: input.type };
        return acc;
      }, {} as { [key: string]: InputValue }),
  );

  const { data, error, fetch } = useReadContract({
    contractAddress,
    abiFunction,
    args: Object.keys(inputValues).map((key) => {
      return inputValues[key]['value'];
    }),
    functionName: abiFunction.name,
  });

  const handleInputChange = (name: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }));
  };

  console.log(error);
  console.log(data);

  const handleCallFunction = () => {
    fetch();
  };
  console.log(typeof data);
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
              value={inputValues[input.name].value}
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
      {typeof data === 'string' && data}
      {typeof data === 'bigint' && data.toString()}
      {typeof data === 'number' && data.toString()}
    </div>
  );
};

export default FunctionCard;
