import { useRef, useState } from 'react';
import { getBase64 } from '../utils/utils';

export const useFileLoader = (validateFile) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const isCancelled = useRef(false);

  const uploadFile = async (file) => {

    setIsUploading(true);

    await validateFile(file)
      .then(file => getBase64(file))
      .then(base64 => {
        !isCancelled.current && setFile(base64);
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => setIsUploading(false))

    isCancelled.current = false;
  };

  return {
    uploadFile,
    isUploading,
    isCancelled,
    file
  }
}