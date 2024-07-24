import React, { useEffect, useState } from 'react';
import { FileType } from '../editorModel.type';
import {
  ExtractedFunctions,
  extractFunctionsFromAbi,
} from '@/services/data-conversion';
import FunctionCard from './function-card/function-card';
import { compileSolidity } from '@/utils/solidity-compiler';

interface OutputListProps {
  plainText: string | undefined;
  fileType: FileType;
  contractAddress: string;
}

const OutputList: React.FC<OutputListProps> = ({
  plainText,
  fileType,
  contractAddress,
}) => {
  const [outputs, setOutputs] = useState<ExtractedFunctions>({
    readFunctions: [],
    writeFunctions: [],
  });

  useEffect(() => {
    const processFile = async () => {
      try {
        if (fileType === 'json' && plainText) {
          const { readFunctions, writeFunctions } = extractFunctionsFromAbi(
            JSON.parse(plainText),
          );
          setOutputs({
            readFunctions,
            writeFunctions,
          });
        } else if (fileType === 'sol' && plainText) {
          const abi = await compileSolidity(plainText);

          const { readFunctions, writeFunctions } =
            extractFunctionsFromAbi(abi);
          setOutputs({
            readFunctions,
            writeFunctions,
          });
        } else {
          setOutputs({
            readFunctions: [],
            writeFunctions: [],
          });
        }
      } catch (error) {
        console.error('Error processing file:', error);
        setOutputs({
          readFunctions: [],
          writeFunctions: [],
        });
      }
    };

    processFile();
  }, [plainText, fileType]);

  return (
    <div className="flex flex-col gap-3 pt-3 mt-3 border-t-2 border-gray-400">
      {outputs.readFunctions.map((func) => (
        <FunctionCard
          key={`read-${func.name}`}
          abiFunction={func}
          contractAddress={contractAddress}
        />
      ))}

      {outputs.writeFunctions.map((func) => (
        <FunctionCard
          key={`write-${func.name}`}
          abiFunction={func}
          contractAddress={contractAddress}
        />
      ))}
    </div>
  );
};

export default OutputList;
