import React, { useRef, useState } from 'react';
import { useFileLoader } from '../../../hooks/hooks';
import styles from './DropZone.module.scss';

const DropZone = () => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const inputFile = useRef(null);
  const { uploadFile, isUploading, isCancelled, imgFile } = useFileLoader();

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

    await uploadFile(file);
  };

  const handleCancelUpload = () => {
    isCancelled.current = true;
  };

  const handleBrowseFile = () => {
    inputFile.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    await uploadFile(file);
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
        <img src={imgFile || './file-img-default.png'} alt='Uploaded logo' />
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
              type='file'
              id='file'
              style={{ display: 'none' }}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default DropZone;
