"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotatingLines } from "react-loader-spinner";
import { useBizProductContext } from "../../context/Business-Product-Edit";
import { PhotoIcon } from '@heroicons/react/24/solid'

const addcollectionformcomponent = ({ allCollections }) => {
  const {
    department,
    setDepartment,
    departments,
    setDepartments,
    addDepartment,
    removeDepartment,
    gender,
    setGender,
    productCategory,
    setProductCategory,
    addToFilter,
    removeFromFilter,
    filters,
    setFilters,
    collectionData,
    setCollectionData,
    collections,
    handleCollectionSave,
    saving,
    collectionFiles,
    setCollectionFiles,
    collectionImageSrc,
    setCollectionImageSrc,
  } = useBizProductContext();

  const handleDepartmentToggle = (departmentId) => {
    if (departments.includes(departmentId)) {
      removeDepartment(departmentId);
    } else {
      addDepartment(departmentId);
    }
  };

  /**handler for file */
  const onFileInputChange = (e) => {
    if (!e.target.value) return;
    if (!collectionFiles) {
      setCollectionFiles(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setCollectionImageSrc(imageUrl);
    }
    if (collectionFiles.length >= 3) return alert("max files reached");
    const updatedFiles = [...collectionFiles, e.target.files[0]];

    setCollectionFiles(updatedFiles);
    const updateSrc = [
      ...collectionImageSrc,
      URL.createObjectURL(e.target.files[0]),
    ];
    setCollectionImageSrc(updateSrc);
  };

  const handleCollectionInfoChange = (e) => {
    setCollectionData({ ...collectionData, [e.target.id]: e.target.value });
  };

  useEffect(() => { }, [collectionFiles, collectionImageSrc]);

  const allDepartments = [
    { id: "womensWatches", name: "Women's Watches" },
    { id: "mensWatches", name: "Men's Watches" },
    { id: "womensBagsAndLuggage", name: "Men's Bags & Luggage" },
    { id: "mensBagsAndLuggage", name: "Men's Bags & Luggage" },
    { id: "womensShoes", name: "Women's Shoes" },
    { id: "mensShoes", name: "Men's Shoes" },
    { id: "womensClothing", name: "Women's Clothing" },
    { id: "mensClothing", name: "Men's Clothing" },
    { id: "homeAndKitchen", name: "Home & Kitchen" },
    { id: "electronics", name: "Electronics" },
    // ... other departments
  ];

  return (
    <div>
      <div className="bg-black flex justify-between items-center px-4 py-2">
        <div>
          <h1 className="text-white text-lg font-bold">Add collection</h1>
        </div>
        <Button
          onClick={handleCollectionSave}
          className={` bg-green-600 ${saving ? " cursor-not-allowed bg-gray-400" : null}`}
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
      <div className="flex flex-col gap-8 px-2 relative top-8">
        {/* title and description */}
        <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-2">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base"
              type="text"
              id="title"
              placeholder="Handbags For Girls"
              onChange={handleCollectionInfoChange}
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
              onChange={handleCollectionInfoChange}
              required
            />
          </div>
        </div>
        {/* image fields */}
        <div className="col-span-full">
        <label htmlFor="cover-photo" className="flex justify-between items-center text-sm font-medium leading-6 text-gray-900">
            <span>Photo</span>
            <span className="text-black/70">Up to 1</span>
          </label>
          <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-black font-semibold text-white px-2 py-1 focus-within:outline-none focus-within:ring-offset-2 hover:bg-black/70"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" accept="image/*"
                    onChange={onFileInputChange} type="file" className="sr-only" />
                </label>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG or JPG up to 10MB</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-4">
              {collectionImageSrc.map((src, index) => (
                <div key={index} className="relative">
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <button
                      className="p-[3px] rounded-full bg-gray-200"
                      onClick={() => {
                        const newFiles = [...collectionFiles];
                        newFiles.splice(index, 1);
                        const newImageScr = [...collectionImageSrc];
                        newImageScr.splice(index, 1);

                        setCollectionFiles(newFiles);
                        setCollectionImageSrc(newImageScr);
                      }}
                    >
                      <X className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                  <Image
                    height={80}
                    width={80}
                    className="bg-gray-300 aspect-square h-16 object-cover rounded-md"
                    src={src}
                    alt={`Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
        </div>
        <fieldset className="border border-gray-300 rounded-lg p-2">
          <legend className="text-sm font-medium mb-4">Select a department</legend>

          {[
            { id: "womensWatches", label: "Women's Watches", value: "womensWatches" },
            { id: "mensWatches", label: "Men's Watches", value: "mensWatches" },
            { id: "womensBagsAndLuggage", label: "Women's Bags & Luggage", value: "womensBagsAndLuggage" },
            { id: "mensBagsAndLuggage", label: "Men's Bags & Luggage", value: "mensBagsAndLuggage" },
            { id: "womensShoes", label: "Women's Shoes", value: "womensShoes" },
            { id: "mensShoes", label: "Men's Shoes", value: "mensShoes" },
            { id: "womensClothing", label: "Women's Clothing", value: "womensClothing" },
            { id: "mensClothing", label: "Men's Clothing", value: "mensClothing" },
            { id: 'WomensAccessories', label: "Women's Accessories", value: "womensAccessories" },
            { id: 'mensAccessories', label: "Men's Accessories", value: "mensAccessories" },
            { id: "homeAndKitchen", label: "Home & Kitchen", value: "homeAndKitchen" },
            { id: "electronics", label: "Electronics", value: "electronics" },
            { id: "appliances", label: "Appliances", value: "appliances" },
          ].map(({ id, label, value, checked }) => (
            <div key={id} className="flex items-center gap-x-3 mb-2">
              <input
                type="radio"
                id={id}
                name="department"
                value={value}
                className="h-4 w-4 rounded border-gray-300"
                onChange={(e) => setDepartment(e.target.value)}
                checked={checked}
              />
              <label htmlFor={id} className="text-sm leading-6 text-gray-900">{label}</label>
            </div>
          ))}
        </fieldset>
        <div className="flex justify-end px-4 py-2">
        <Button
          onClick={handleCollectionSave}
          className={` bg-green-600 ${saving ? " cursor-not-allowed bg-gray-400" : null}`}
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

export default addcollectionformcomponent;
