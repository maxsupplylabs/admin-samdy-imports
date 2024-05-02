import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onDropFn }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    onDropFn(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drag 'n' drop some files here, or click to select files</p>
      ) : (
        <div className="border-dashed border border-black justify-center py-10 rounded-lg flex items-center  cursor-pointer">
          <div className="py-1 px-3 border border-black rounded-md w-fit">
            Upload image
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
