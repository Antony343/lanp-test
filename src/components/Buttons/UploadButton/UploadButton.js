import React from 'react';
import './UploadButton.module.scss'

const UploadButton = ({ handleFileChange }) => {
  return (
      <label htmlFor="file">
        Select file to upload
        <input
        onChange={handleFileChange}
        type="file"
        id="file"
        style={{ display: 'none' }}
      />
      </label>
  );
};

export { UploadButton };