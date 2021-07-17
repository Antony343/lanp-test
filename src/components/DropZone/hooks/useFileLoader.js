import { useRef, useState } from 'react';
import { getBase64 } from '../utils/utils';

export const useFileLoader = (validator) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const isCancelled = useRef(false);

  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      const validatedFile = await validator(file);
      const base64 = await getBase64(validatedFile);
      !isCancelled.current && setFile(base64);
    } catch (err) {
      alert(err)
    }
    setIsUploading(false)
    isCancelled.current = false;
  };

  return {
    uploadFile,
    isUploading,
    isCancelled,
    file,
  }
}