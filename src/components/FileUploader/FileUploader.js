import React, { useRef, useState } from 'react';
import styles from './FileUploader.module.scss';
import { getBase64, validateFile } from '../../utils/utils';

const FileUploader = () => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const cancelled = useRef(false);
  const inputFile = useRef(null);

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

    setIsUploading(true);
    setIsDraggedOver(false);

    // converting img file to base64
    await validateFile(file)
      .then(file => getBase64(file))
      .then(base64Img => {
        !cancelled.current && setImgFile(base64Img);
        setIsUploading(false);
      })
      .catch(err => {
        setIsUploading(false);
        alert(err);
      })

    cancelled.current = false;
  }

  const cancelUploadHandler = () => {
    cancelled.current = true;
  }

  const browseFileHandler = e => {
   inputFile.current.click();
  };

  const onChangeFileHandler = e => {
    console.log(e.target.files[0])
  }

  return (
    <div className={styles['logo-uploader']}>
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
                <input onChange={onChangeFileHandler} ref={inputFile} type="file" id="file" style={{display: "none"}}/>
                </span>
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default FileUploader;