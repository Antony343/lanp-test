import React from 'react';
import './UploadButton.module.scss';
import { v4 as uuidv4 } from 'uuid';

const UploadButton = ({ handleFileChange, children }) => {
  const inputId = uuidv4();

  return (
    <label htmlFor={inputId}>
      {children}
      
      <input
        onChange={handleFileChange}
        type="file"
        id={inputId}
        style={{ display: 'none' }}
      />
    </label>
  );
};

export { UploadButton };