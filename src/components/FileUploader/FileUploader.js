import styles from './FileUploader.module.scss';
import { DropZoneContainer } from '../DropZone/container/DropZoneContainer';
import { validateImgFile, validatePdfFile } from '../DropZone/utils/validators/validators'

const FileUploader = () => {

  return (
    <div className={styles.logo_uploader}>
      <header className={styles.header}>
        <h1 className={styles.header_title}>Company Logo</h1>
        <span className={styles.header_descr}>Logo should be square, 100px size and in png, jpeg file format.</span>
      </header>
      <div className={styles.body}>
        <DropZoneContainer validator={validateImgFile} inputId="file-image" />
        <DropZoneContainer validator={validatePdfFile} inputId="file-pdf" />
      </div>
    </div >
  )
}

export default FileUploader;