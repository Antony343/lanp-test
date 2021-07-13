import React, { useState } from 'react';
import { useFileLoader } from './hooks/useFileLoader';
import styles from './DropZone.module.scss';
import { validateImgFile } from './utils/validators/validators';
import { FilePreview } from '../FilePreview/FilePreview';
import { UploadButton } from '../Buttons/UploadButton/UploadButton';

const DropZone = () => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const { uploadFile, isUploading, isCancelled, file } = useFileLoader(validateImgFile);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setIsDraggedOver(false);

    return void await uploadFile(file);
  };

  const handleCancelUpload = () => {
    isCancelled.current = true;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    return void await uploadFile(file);
  };

  return (
    <div
      className={`${styles.body_drop_area} ${isDraggedOver ? styles.active : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <FilePreview {...{ isUploading, isDraggedOver, file }} />
      <div
        className={`
        ${styles.description} 
        ${isDraggedOver ? styles.dragging_in_progress : ''}
        `}>
        <span>Drag & drop here</span>
        <span>- or -</span>
        {isUploading ? (
          <span onClick={handleCancelUpload}>Cancel</span>
        ) : (
          <UploadButton {...{ handleFileChange }} />
        )}
      </div>
    </div>
  );
};

export { DropZone };
