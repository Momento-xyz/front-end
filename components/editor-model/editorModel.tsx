import React, { useState } from 'react';
import Editor from './editor/editor';
import { FileType } from './editorModel.type';

const EditorModel: React.FC = () => {
  const [plainText, setPlainText] = useState<string | undefined>(
    '// Insert a .sol file content or an ABI',
  );
  const [fileType, setFileType] = useState<FileType>('plaintext');

  React.useEffect(() => {
    if (plainText) {
      const type = detectFileType(plainText);
      setPlainText(plainText);
      setFileType(type);
    }
  }, [plainText]);

  const detectFileType = (content: string): FileType => {
    try {
      const parsedContent = JSON.parse(content);
      if (Array.isArray(parsedContent)) {
        return 'json';
      }
    } catch {
      if (content.includes('pragma solidity')) {
        return 'sol';
      }
    }
    return 'plaintext';
  };

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
      <div className="col-span-1 p-4">
        <p>
          Detected file type: {fileType !== 'plaintext' ? fileType : 'Unknown'}
        </p>
      </div>
    </div>
  );
};

export default EditorModel;
