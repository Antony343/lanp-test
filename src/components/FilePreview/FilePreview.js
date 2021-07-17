import React from 'react';
import styles from './FilePreview.module.scss'

const FilePreview = ({ isUploading, isDraggedOver, file }) => {
  return (
    <div
      className={`
    ${styles.img_container} 
    ${isUploading ? '' : styles.no_after}
    ${isDraggedOver ? styles.dragging_in_progress : ''}
    `}>

      {(file && file.indexOf('pdf') !== -1) ?
        <>
          <img src="./pdf-logo.jpg" alt="Uploaded pdf" />
          <span className={styles.file_name}>Uploaded.pdf</span>
        </>
         :
        <img src={file || "./file-img-default.png"} alt="Uploaded logo" />
      }

    </div>
  );
};

export { FilePreview };