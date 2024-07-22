import { FileType } from './editorModel.type';

export const detectFileType = (content: string): FileType => {
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
