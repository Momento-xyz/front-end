import React from 'react';
import { FileType } from '../editorModel.type';
import {
  ExtractedFunctions,
  extractFunctionsFromAbi,
} from '@/services/data-conversion';
import FunctionCard from './function-card/function-card';

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
  const [outputs, setOutputs] = React.useState<ExtractedFunctions>({
    readFunctions: [],
    writeFunctions: [],
  });

  React.useEffect(() => {
    if (fileType === 'json' && plainText) {
      const { readFunctions, writeFunctions } = extractFunctionsFromAbi(
        JSON.parse(plainText),
      );
      setOutputs({
        readFunctions: readFunctions,
        writeFunctions: writeFunctions,
      });
    } else if (fileType === 'sol' && plainText) {
    } else {
      setOutputs({
        readFunctions: [],
        writeFunctions: [],
      });
    }
  }, [plainText, fileType]);

  return (
    <div className="flex flex-col gap-3 pt-3 mt-3 border-t-2 border-gray-400">
      {outputs.readFunctions.map((func) => {
        return (
          <FunctionCard
            key={`read-${func.name}`}
            abiFunction={func}
            contractAddress={contractAddress}
          />
        );
      })}

      {outputs.writeFunctions.map((func) => {
        return (
          <FunctionCard
            key={`read-${func.name}`}
            abiFunction={func}
            contractAddress={contractAddress}
          />
        );
      })}
    </div>
  );
};

export default OutputList;
