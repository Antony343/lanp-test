import { useRef, useState } from "react";
import { getBase64, validateFile } from "../utils/utils";

const useFileLoader = data => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const cancelled = useRef(false);
  const inputFile = useRef(null);


  const uploadFileOnchange = async file => {

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
  const uploadFileOnDrop = async e => {

  }
  return {
    uploadFileOnchange,
    isDraggedOver,
    isUploading
  }
}