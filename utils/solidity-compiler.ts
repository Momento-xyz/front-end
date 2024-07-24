'use server';

import solc from 'solc';

export const compileSolidity = (solidityCode: string) => {
  const input = {
    language: 'Solidity',
    sources: {
      'contract.sol': {
        content: solidityCode,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['abi'],
        },
      },
    },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  if (output.errors) {
    output.errors?.forEach((error: any) => {
      console.error(error?.formattedMessage);
    });
    throw new Error('Compilation failed');
  }

  const contractName = Object.keys(output.contracts['contract.sol'])[0];
  const abi = output.contracts['contract.sol'][contractName].abi;

  return abi;
};
