import React from 'react';
import styles from './DropZone.module.scss';
import { FilePreview } from '../FilePreview/FilePreview';
import { UploadButton } from '../Buttons/UploadButton/UploadButton';

const DropZone = ({ isDraggedOver, isUploading, file, handleDragOver, handleDragEnter, handleDragLeave, handleDrop, handleCancelUpload, handleFileChange, inputId }) => {

  return (
    <div
      className={`${styles.body_drop_area} ${isDraggedOver ? styles.active : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isUploading ? console.log(isUploading) : console.log(isUploading)}
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
          <UploadButton {...{ handleFileChange, inputId }} />
        )}
      </div>
    </div>
  );
};

export { DropZone };
