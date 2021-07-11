import React, { useRef, useState } from 'react';
import styles from './FileUploader.module.scss';
import { getBase64, validateFileType } from '../../utils/utils';

const FileUploader = () => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const cancelledLatest = useRef(cancelled);

  const onDragStartHandler = e => {
    e.preventDefault();
    setIsDraggedOver(true);
  }

  const onDragHandlerLeave = e => {
    e.preventDefault();
    setIsDraggedOver(false);
  }

  const onDropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const fileType = file
      .type
      .split('/');

    // check if the file type is appropriate - image in .jpg/.jpeg/.png
    if (!validateFileType(fileType)) {
      alert(`The file extension .${fileType[1]} is not supported.`);
      setIsDraggedOver(false);
      return;
    }
    setIsUploading(true);
    // converting img file to base64
    getBase64(file).then((result) => {
      //  artificial trottling to present the loading animation
      setTimeout(() => {
        !cancelledLatest.current && setImgFile(result);
        setIsUploading(false);
        setCancelled(prev => {cancelledLatest.current = false; return false;})
      }, 2000);
    }).catch(e => {
      setIsUploading(false);
      setCancelled(prev => {cancelledLatest.current = false; return false;})
      alert(e)
    });

    setIsDraggedOver(false);
  }

  return (
    <div className={styles['logo-uploader']}>
      <header className={styles['logo-uploader__header']}>
        <h1 className={styles['logo-uploader__header-title']}>Company Logo</h1>
        <span className={styles['logo-uploader__header-descr']}>Logo should be square, 100px size and in png, jpeg file format.</span>
      </header>
      <div className={styles['logo-uploader__body']}>
        <div
          className={isDraggedOver
            ? `${styles['logo-uploader__body-drop-area']} ${styles.active}`
            : styles['logo-uploader__body-drop-area']}
          onDragOver={onDragStartHandler}
          onDragLeave={onDragHandlerLeave}
          onDrop={onDropHandler}>
          <div
            className={isUploading
              ? styles['logo-uploader__body-drop-area-img-container']
              : `${styles['logo-uploader__body-drop-area-img-container']} ${styles['no-after']}`}>
            <img src={imgFile || "./file-img-default.png"} alt="file preview" />
          </div>
          <div className={styles['logo-uploader__body-drop-area-descr']}>
            <span>Drag & drop here</span>
            <span>- or -</span>
            {isUploading
              ? <span onClick={() => setCancelled(prev => {cancelledLatest.current = true; return false;})}>Cancel</span>
              : <a href="#anchor">Select file to upload</a>
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default FileUploader;