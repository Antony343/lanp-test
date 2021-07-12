import React, { useRef, useState } from 'react';
import styles from './FileUploader.module.scss';
import { useFileLoader } from '../../hooks/hooks';

const FileUploader = () => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const inputFile = useRef(null);
  const { uploadFile,
    isUploading,
    cancelled,
    imgFile } = useFileLoader();

  const onDragStartHandler = e => {
    e.preventDefault();
    setIsDraggedOver(true);
  }

  const onDragHandlerLeave = e => {
    e.preventDefault();
    setIsDraggedOver(false);
  }

  const onDropHandler = async e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    setIsDraggedOver(false);

    await uploadFile(file);
  }

  const cancelUploadHandler = () => {
    cancelled.current = true;
  }

  const browseFileHandler = e => {
    inputFile.current.click();
  };

  const onChangeFileHandler = async e => {
    const file = e.target.files[0];
    await uploadFile(file);

  }

  return (
    <div className={styles['logo-uploader']}>
      {console.log('render')}
      <header className={styles['header']}>
        <h1 className={styles['header-title']}>Company Logo</h1>
        <span className={styles['header-descr']}>Logo should be square, 100px size and in png, jpeg file format.</span>
      </header>
      <div className={styles['body']}>
        <div
          className={`${styles['body-drop-area']} ${isDraggedOver ? styles.active : ''}`}
          onDragOver={onDragStartHandler}
          onDragLeave={onDragHandlerLeave}
          onDrop={onDropHandler}>
          <div
            className={`${styles['img-container']} ${isUploading ? '' : styles['no-after']}`}
          >
            <img src={imgFile || "./file-img-default.png"} alt="file preview" />
          </div>
          <div className={styles['description']}>
            <span>Drag & drop here</span>
            <span>- or -</span>
            {isUploading
              ? <span onClick={cancelUploadHandler}>Cancel</span>
              : <span onClick={browseFileHandler}>
                Select file to upload
                <input onChange={onChangeFileHandler} ref={inputFile} type="file" id="file" style={{ display: "none" }} />
              </span>
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default FileUploader;