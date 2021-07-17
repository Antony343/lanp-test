import React from 'react';
import './UploadButton.module.scss'

const UploadButton = ({ handleFileChange, inputId }) => {
  return (
      <label htmlFor={inputId}>
        Select file to upload
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