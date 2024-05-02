"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useBizProductContext } from "@/context/Business-Product-Edit";
import { editDocumentInStore } from "@/utils/functions";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

const EditCollectionFormComponent = ({ data, collectionID }) => {
  console.log(data);
  const {
    title,
    description,
    images,
  } = data;
  const [productData, setProductData] = useState({
    title,
    description,
  });
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(images);
  const [newImagesUrl, setNewImagesUrl] = useState(imageSrc);
  const [saving, setSaving] = useState(false);

  const onFileInputChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && files.length < 3) {
      setFiles([...files, selectedFile]);
      setNewImagesUrl([...newImagesUrl, URL.createObjectURL(selectedFile)]);
    }
  };

  // Handle product save
  const handleCollectionEdit = async () => {
    try {
      setSaving(true);
      await editDocumentInStore(
        {
            ...productData,
        },
        'collections',
        collectionID
      ),
      toast.success(`Changes saved succesfully.`);
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  };

//   TODO: Implement updating image
  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    const updatedImageSrc = [...newImagesUrl];
    updatedImageSrc.splice(index, 1);
    setFiles(updatedFiles);
    setNewImagesUrl(updatedImageSrc);

    const imageToRemove = newImagesUrl[index];
    const newImageScr = imageSrc.filter((item) => item !== imageToRemove);
    setImageSrc(newImageScr);
  };

  const handleProductInfoChange = (e) => {
    console.log(productData);
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <div className="bg-black flex justify-between items-center px-4 py-2">
        <div>
          <h1 className="text-white text-lg font-bold">Edit collection</h1>
        </div>
        <Button
          onClick={handleCollectionEdit}
          className={` bg-green-600 ${
            saving ? " cursor-not-allowed bg-gray-400" : null
          }`}
          disabled={saving}
        >
          {saving ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={true}
            />
          ) : (
            "Save"
          )}
        </Button>
      </div>
      <div className="flex flex-col gap-8 px-2 relative top-4">
        {/* name and description */}
        <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">
              Title
            </label>
            <input
              className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base"
              type="text"
              id="title"
              value={productData?.title || ""}
              onChange={handleProductInfoChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base"
              type="text"
              id="description"
              placeholder="Description of the collection..."
              value={productData?.description || ""}
              onChange={handleProductInfoChange}
              required
            />
          </div>
        </div>
        {/* image fields */}
        <div>
          <div className="flex w-full">
            <h2>Media</h2>
          </div>
          <div className="border-dashed border border-black  p-5 rounded-lg flex items-center gap-4">
            <div className="flex items-center gap-2 w-full">
              {newImagesUrl.map((image, index) => (
                <div key={image.id} className="relative">
                  <Image
                    height={80}
                    width={80}
                    className="bg-gray-300 aspect-square h-16 object-cover rounded-md"
                    src={image.src}
                    alt={`Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end px-4 py-2">
        <Button
          onClick={handleCollectionEdit}
          className={` bg-green-600 ${
            saving ? " cursor-not-allowed bg-gray-400" : null
          }`}
          disabled={saving}
        >
          {saving ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={true}
            />
          ) : (
            "Save"
          )}
        </Button>
      </div>
      </div>
    </div>
  );
};

export default EditCollectionFormComponent;
