export enum StateMutability {
  Pure = 'pure',
  View = 'view',
  Payable = 'payable',
  NonPayable = 'nonpayable',
}

export type AbiFunction = {
  name: string;
  type: string;
  stateMutability: StateMutability;
  inputs: Array<{ name: string; type: string }>;
  outputs?: Array<{ name: string; type: string }>;
};

export type ExtractedFunctions = {
  readFunctions: AbiFunction[];
  writeFunctions: AbiFunction[];
};

type SolidityFunction = {
  name: string;
  visibility: string;
  stateMutability: string;
  inputs: Array<{ name: string; type: string }>;
  outputs: Array<{ name: string; type: string }>;
};

export const extractFunctionsFromAbi = (
  abiContent: any,
): ExtractedFunctions => {
  const abi = Array.isArray(abiContent) ? abiContent : abiContent.abi;

  const readFunctions: AbiFunction[] = [];
  const writeFunctions: AbiFunction[] = [];

  abi.forEach((item: any) => {
    if (item.type === 'function') {
      const func: AbiFunction = item;

      if (item.stateMutability === 'view' || item.stateMutability === 'pure') {
        readFunctions.push(func);
      } else {
        writeFunctions.push(func);
      }
    }
  });

  return { readFunctions, writeFunctions };
};

export const extractFunctionsFromSol = (
  solidityContent: string,
): SolidityFunction[] => {
  const functionRegex =
    /function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*(public|internal|private|external)?\s*(payable|pure|view|nonpayable)?/g;
  const parameterRegex = /\s*([a-zA-Z0-9_]+)\s+([a-zA-Z0-9_]+)/g;

  const functions: SolidityFunction[] = [];
  let match;

  while ((match = functionRegex.exec(solidityContent)) !== null) {
    const name = match[1];
    const inputsString = match[2];
    const visibility = match[3] || 'public';
    const stateMutability = match[4] || 'nonpayable';

    const inputs: Array<{ name: string; type: string }> = [];
    let inputMatch;
    while ((inputMatch = parameterRegex.exec(inputsString)) !== null) {
      inputs.push({ type: inputMatch[1], name: inputMatch[2] });
    }

    functions.push({
      name,
      visibility,
      stateMutability,
      inputs,
      outputs: [],
    });
  }

  return functions;
};
