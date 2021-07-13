import React, { useRef, useState } from 'react';
import { useFileLoader } from './hooks/useFileLoader';
import styles from './DropZone.module.scss';
import { validateImgFile } from './utils/utils';

const DropZone = () => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const inputFile = useRef(null);
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

  const handleBrowseFile = () => {
    inputFile.current.click();
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
      <div
        className={`
        ${styles.img_container} 
        ${isUploading ? '' : styles.no_after}
        ${isDraggedOver ? styles.dragging_in_progress : ''}
        `}>
        <img src={file || "./file-img-default.png"} alt="Uploaded logo" />
      </div>
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
          <span onClick={handleBrowseFile}>
            Select file to upload
            <input
              onChange={handleFileChange}
              ref={inputFile}
              type="file"
              id="file"
              style={{ display: 'none' }}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export { DropZone };
