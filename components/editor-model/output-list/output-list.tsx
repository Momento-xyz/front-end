import React from 'react';
import { FileType } from '../editorModel.type';
import {
  ExtractedFunctions,
  extractFunctionsFromAbi,
} from '@/services/data-conversion';

interface OutputListProps {
  plainText: string | undefined;
  fileType: FileType;
  address: string;
}

const OutputList: React.FC<OutputListProps> = ({
  plainText,
  fileType,
  address,
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
    }
  }, [plainText, fileType]);

  return (
    <div className="flex flex-col gap-3">
      {outputs.readFunctions.map((func) => {
        console.log(func);
        return <div key={`read-${func.name}`}>{func.name}</div>;
      })}

      {outputs.writeFunctions.map((func) => {
        console.log(func);
        return <div key={`read-${func.name}`}>{func.name}</div>;
      })}
    </div>
  );
};

export default OutputList;
