import { checkAddressIsValid } from '@/utils';
import React from 'react';

interface FormProps {
  address: string;
  setAddress: Function;
}
const Form: React.FC<FormProps> = ({ address, setAddress }) => {
  const addressIsValid = checkAddressIsValid(address);
  return (
    <div className="">
      <label htmlFor="contract">Contract address:</label>
      <input
        id="contract"
        type="text"
        className="w-full px-3 py-2 border border-gray-300 bg-black"
        placeholder="Contract address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {addressIsValid && <p>Contract Address is valid.</p>}
      {!addressIsValid && address.length > 0 && (
        <p className="text-red-500">Contract Address is not valid.</p>
      )}
    </div>
  );
};

export default Form;
