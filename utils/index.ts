import { getAddress } from 'ethers/lib/utils';

export const checkAddressIsValid = (address: string): boolean => {
  try {
    getAddress(address);
    return true;
  } catch (error) {
    return false;
  }
};
