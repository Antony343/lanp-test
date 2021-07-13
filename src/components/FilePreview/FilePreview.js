import React from 'react';
import styles from './FilePreview.module.scss'

const FilePreview = ({ isUploading, isDraggedOver, file, fileType }) => {
  return (
    <div
      className={`
    ${styles.img_container} 
    ${isUploading ? '' : styles.no_after}
    ${isDraggedOver ? styles.dragging_in_progress : ''}
    `}>
      <img src={file || "./file-img-default.png"} alt="Uploaded logo" />
    </div>
  );
};

export { FilePreview };