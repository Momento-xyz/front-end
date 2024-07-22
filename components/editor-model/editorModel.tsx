import React, { useState } from 'react';
import Editor from './editor/editor';
import { FileType } from './editorModel.type';
import { detectFileType } from './editorModel.helper';
import Form from './form/form';
import OutputList from './output-list/output-list';

const EditorModel: React.FC = () => {
  const [plainText, setPlainText] = useState<string | undefined>(
    '// Insert a .sol file content or an ABI',
  );
  const [fileType, setFileType] = useState<FileType>('plaintext');
  const [contractAddress, setContractAddress] = React.useState<string>('');

  React.useEffect(() => {
    if (plainText) {
      const type = detectFileType(plainText);
      setPlainText(plainText);
      setFileType(type);
    }
  }, [plainText]);

  const handleEditorChange = (rawCode: string | undefined) => {
    setPlainText(rawCode);
    const type = detectFileType(rawCode || 'plaintext');
    setFileType(type);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-2">
        <Editor
          plainText={plainText}
          setPlainText={handleEditorChange}
          fileType={fileType}
        />
      </div>
      <div className="flex flex-col gap-2 col-span-1 p-4">
        <p>
          Detected file type: {fileType !== 'plaintext' ? fileType : 'Unknown'}
        </p>
        <Form address={contractAddress} setAddress={setContractAddress} />
        <OutputList
          plainText={plainText}
          fileType={fileType}
          contractAddress={contractAddress}
        />
      </div>
    </div>
  );
};

export default EditorModel;
