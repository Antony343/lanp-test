import styles from './FileUploader.module.scss';
import { DropZone } from '../DropZone/DropZone';

const FileUploader = () => {

  return (
    <div className={styles.logo_uploader}>
      {console.log('Root render')}
      <header className={styles.header}>
        <h1 className={styles.header_title}>Company Logo</h1>
        <span className={styles.header_descr}>Logo should be square, 100px size and in png, jpeg file format.</span>
      </header>
      <div className={styles.body}>
        <DropZone />
      </div>
    </div >
  )
}

export default FileUploader;