import { useRef, useState } from 'react';
import { getBase64, validateFile } from '../utils/utils';

export const useFileLoader = () => {
  const [imgFile, setImgFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const isCancelled = useRef(false);


  const uploadFile = async (file) => {

    setIsUploading(true);

    await validateFile(file)
      .then(file => getBase64(file))
      .then(base64Img => {
        !isCancelled.current && setImgFile(base64Img);
        setIsUploading(false);
      })
      .catch(err => {
        setIsUploading(false);
        alert(err);
      })

    isCancelled.current = false;
  };

  return {
    uploadFile,
    isUploading,
    isCancelled,
    imgFile
  }
}