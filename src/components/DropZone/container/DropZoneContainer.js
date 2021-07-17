import React, { useState } from 'react';
import { DropZone } from '../DropZone';
import { useFileLoader } from '../hooks/useFileLoader';

const DropZoneContainer = ({ validator, inputId }) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const { uploadFile, isUploading, isCancelled, file } = useFileLoader(validator);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setIsDraggedOver(false);

    return void await uploadFile(file);
  };

  const handleCancelUpload = () => {
    isCancelled.current = true;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    return void await uploadFile(file);
  };

  return (
    <DropZone {...{ isDraggedOver, isUploading, file, handleDragOver, handleDragEnter, handleDragLeave, handleDrop, handleCancelUpload, handleFileChange, inputId }} />
  )
};

export { DropZoneContainer };