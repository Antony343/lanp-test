import { useRef, useState } from "react";
import { getBase64, validateFile } from "../utils/utils";

export const useFileLoader = () => {
  const [imgFile, setImgFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const cancelled = useRef(false);


  const uploadFile = async file => {

    setIsUploading(true);

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

  return {
    uploadFile,
    isUploading,
    cancelled,
    imgFile
  }
}