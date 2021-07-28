import styles from './FileUploader.module.scss';
import { DropZoneContainer } from '../DropZone/container/DropZoneContainer';
import { validateImgFile, validatePdfFile } from '../DropZone/utils/validators/validators';
import { APIService } from '../../utils/services/api.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'

const FileUploader = () => {

  return (
    <div className={styles.logo_uploader}>
      <header className={styles.header}>
        <h1 className={styles.header_title}>Company Logo</h1>
        <span className={styles.header_descr}>Logo should be square, 100px size and in png, jpeg file format.</span>
      </header>
      <div className={styles.body}>
        <DropZoneContainer validator={validateImgFile} pushFile={APIService.uploadImg}>
          Select file to upload
        </DropZoneContainer>
        <DropZoneContainer validator={validatePdfFile} pushFile={APIService.uploadPdf}>
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </DropZoneContainer>
      </div>
    </div >
  )
}

export default FileUploader;