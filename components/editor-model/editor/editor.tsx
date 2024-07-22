import React from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { FileType } from '../editorModel.type';

interface EditorProps {
  plainText: string | undefined;
  setPlainText: Function;
  fileType: FileType;
}

const Editor: React.FC<EditorProps> = ({
  plainText,
  setPlainText,
  fileType,
}) => {
  return (
    <MonacoEditor
      height="80vh"
      defaultLanguage={fileType}
      theme="vs-dark"
      onChange={(rawCode) => setPlainText(rawCode)}
      value={plainText}
    />
  );
};
export default Editor;
