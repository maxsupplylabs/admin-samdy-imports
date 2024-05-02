"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { RotatingLines } from "react-loader-spinner";
import { useBizProductContext } from "../../context/Business-Product-Edit";
import { getDocumentsInCollectionRealTime } from "@/utils/functions";
import { PhotoIcon } from '@heroicons/react/24/solid'
import Link from "next/link"

const addproductformcomponent = ({ allCollections }) => {
  const [uploadedCollections, setUploadedCollections] = useState([])


  useEffect(() => {
    // Subscribe to real-time updates for the "products" collection
    const unsubscribeUploadedCollections = getDocumentsInCollectionRealTime("collections", (count) => {
      setUploadedCollections(count);
    });

    return () => {
      // Cleanup subscriptions when the component unmounts
      unsubscribeUploadedCollections();
    };
  }, []);
  const {
    departments,
    setDepartments,
    addDepartment,
    removeDepartment,
    isFreeShipping,
    setIsFreeShipping,
    isAvailableInGhana,
    setIsAvailableInGhana,
    isOnSale,
    setIsOnSale,
    setIsFreeDelivery,
    collections,
    addCollection,
    removeCollection,
    variations,
    updateVariationValues,
    setVariations,
    addVariation,
    updateVariationType,
    addVariationValue,
    removeVariationValue,
    removeVariation,
    handleProductSave,
    saving,
    colors,
    setColors,
    sizes,
    setSizes,
    productData,
    setProductData,
    files,
    setFiles,
    imageSrc,
    setImageSrc,
  } = useBizProductContext();

  const handleDepartmentToggle = (departmentId) => {
    if (departments.includes(departmentId)) {
      removeDepartment(departmentId);
    } else {
      addDepartment(departmentId);
    }
  };

  const handleCollectionToggle = (collectionId) => {
    if (collections.includes(collectionId)) {
      removeCollection(collectionId);
    } else {
      addCollection(collectionId);
    }
  };

  /**handler for file */
  const onFileInputChange = (e) => {
    if (!e.target.value) return;
    if (!files) {
      setFiles(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImageSrc(imageUrl);
    }
    if (files.length >= 10) return alert("max files reached");
    const updatedFiles = [...files, e.target.files[0]];
    setFiles(updatedFiles);
    const updateSrc = [...imageSrc, URL.createObjectURL(e.target.files[0])];
    setImageSrc(updateSrc);
  };

  const handleFreeShippingChange = (e) => {
    setIsFreeShipping(e.target.checked);
  };
  const handleFreeDeliveryChange = (e) => {
    setIsFreeDelivery(e.target.checked);
  };
  const handleIsAvailableInGhana = (e) => {
    setIsAvailableInGhana(e.target.checked);
  };
  const handleIsOnSaleChange = (e) => {
    setIsOnSale(e.target.checked);
  }

  const handleProductInfoChange = (e) => {
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

  useEffect(() => { }, [files, imageSrc]);

  const allDepartments = [
    { id: "womensWatches", name: "Women's Watches" },
    { id: "mensWatches", name: "Men's Watches" },
    { id: "womensBagsAndLuggage", name: "Women's Bags & Luggage" },
    { id: "mensBagsAndLuggage", name: "Men's Bags & Luggage" },
    { id: "womensShoes", name: "Women's Shoes" },
    { id: "mensShoes", name: "Men's Shoes" },
    { id: "womensClothing", name: "Women's Clothing" },
    { id: "mensClothing", name: "Men's Clothing" },
    { id: "WomensAccessories", name: "Women's Accessories" },
    { id: "mensAccessories", name: "Men's Accessories" },
    { id: "homeAndKitchen", name: "Home & Kitchen" },
    { id: "electronics", name: "Electronics" },
    { id: "appliances", name: "Appliances" },
    // ... other departments
  ];

  return (
    <div>
      <div className="bg-black flex justify-between items-center px-4 py-2">
        <div>
          <h1 className="text-white text-lg font-bold">Add product</h1>
        </div>
        <Button
          onClick={handleProductSave}
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
      {/* <div className=" px-2 py-1 text-sm sticky top-20 bg-white z-50 shadow-lg">
        <h1>We can speed up the process of adding products to the store.<span className="text-blue-500"><Link href="/epms">Learn more</Link></span></h1>
      </div> */}
      <div className="flex flex-col gap-8 px-2 relative top-8">
        {/* name and description */}
        <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base"
              type="text"
              id="name"
              placeholder="Women casual jacket"
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
              placeholder="Description of the product..."
              onChange={handleProductInfoChange}
              required
            />
          </div>
        </div>
        {/* image fields */}
        <div className="col-span-full">
          <label htmlFor="cover-photo" className="flex justify-between items-center text-sm font-medium leading-6 text-gray-900">
            <span>Photos</span>
            <span className="text-black/70">Up to 8</span>
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
          <div className="flex items-center justify-between gap-x-2 w-full mt-4">
            {imageSrc.map((image, index) => (
              <div key={index} className="relative">
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <button
                    className="p-[3px] rounded-full bg-gray-200"
                    onClick={() => {
                      const newFiles = [...files];
                      newFiles.splice(index, 1);
                      const newImageScr = [...imageSrc];
                      newImageScr.splice(index, 1);

                      setFiles(newFiles);
                      setImageSrc(newImageScr);
                    }}
                  >
                    <X className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
                <Image
                  height={80}
                  width={80}
                  className="bg-gray-300 aspect-square h-16 object-cover rounded-md"
                  src={image}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
        {/* price fields */}
        <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-2">
          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm leading-6 font-medium">
              Price{" "}
            </label>
            <input
              className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base"
              type="number"
              id="price"
              placeholder="60.00"
              onChange={handleProductInfoChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="market_price" className="text-sm leading-6 font-medium">
              Market Price{" "}
            </label>
            <input
              className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base"
              type="number"
              id="market_price"
              placeholder="150.00"
              onChange={handleProductInfoChange}
              required
            />
          </div>
        </div>

        {/* variations */}
        <div>
          <div className="flex flex-col border border-gray-300 rounded-lg p-2">
            <label htmlFor="variations" className="text-sm font-medium">
              Variations
            </label>
            {variations.map((variation, index) => (
              <div key={index} className="flex gap-2 items-center justify-between mb-4">
                <div className="flex flex-col items-start mb-2 gap-2 min-w-[85%]">
                  <input
                    className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base w-full"
                    type="text"
                    placeholder="Type (e.g., color or size)"
                    value={variation.type}
                    onChange={(e) => updateVariationType(index, e.target.value)}
                  />
                  <input
                    className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base w-full"
                    type="text"
                    placeholder="Values (comma-separated)"
                    value={variation.values.join(",")}
                    onChange={(e) =>
                      updateVariationValues(
                        index,
                        e.target.value.split(",").map((value) => value.trim())
                      )
                    }
                  />

                </div>
                <button onClick={() => removeVariation(index)}>
                  <RiDeleteBin6Line className="text-red-500 text-xl" />
                </button>
              </div>
            ))}
            <button
              className="flex items-center gap-2 py-2 text-start w-full bg-white"
              onClick={addVariation}
            >
              <BsPlus className="bg-green-400 text-white h-6 w-6 rounded-full" />
              <span>Add color or size</span>
            </button>
          </div>
        </div>

        <fieldset className="border border-gray-300 rounded-lg p-2">
          <legend className="text-sm font-medium mb-4">
            Select department
          </legend>
          {allDepartments.map((department) => (
            <div key={department.id} className="flex items-center gap-x-3 mb-2">
              <input
                id={`department_${department.id}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                onChange={() => handleDepartmentToggle(department.id)}
                checked={departments.includes(department.id)}
              />
              <label htmlFor={`department_${department.id}`} className="text-sm leading-6 text-gray-900">{department.name}</label>
            </div>
          ))}
        </fieldset>

        <fieldset className="border border-gray-300 rounded-lg p-2">
          <legend className="text-sm font-medium mb-4">
            Select collection
          </legend>
          {uploadedCollections.map((collection) => (
            <div key={collection.id} className="flex items-center gap-x-3 mb-2">
              <input
                id={`collection_${collection.id}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={collections.includes(collection.id)}
                onChange={() => handleCollectionToggle(collection.id)}
              />
              <label htmlFor={`collection_${collection.id}`} className="text-sm leading-6 text-gray-900">{collection.title}</label>
            </div>
          ))}
        </fieldset>
        <fieldset className="border border-blue-300 rounded-lg p-2">
          <legend className="text-sm font-medium text-blue-600 mb-4">
            Offers
          </legend>
          <div className="flex flex-col gap-3">

            {/* Free Shipping */}
            <div className="relative flex gap-x-3 px-2">
              <div className="flex h-6 items-center">
                <input
                  id="free-shipping"
                  name="free-shipping"
                  type="checkbox"
                  onChange={handleFreeShippingChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="free-shipping" className="font-medium text-gray-900">
                  Free shipping (when pre-ordered)
                </label>
                <p className="text-gray-500 text-xs">An indication will show on this item, to tell customer that they will pay no shipping fee when it is shipped from China to Ghana.</p>
              </div>
            </div>
            {/* Free Delivery */}
            <div className="relative flex gap-x-3 px-2">
              <div className="flex h-6 items-center">
                <input
                  id="free-delivery"
                  name="free-delivery"
                  type="checkbox"
                  onChange={handleFreeDeliveryChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="free-delivery" className="font-medium text-gray-900">
                  Free delivery (when pre-ordered or available in Ghana)
                </label>
                <p className="text-gray-500 text-xs">An indication will show on this item, to tell customers that they will pay no delivery fee when it is delivered anywhere in the country.</p>
              </div>
            </div>
            {/* Available in Ghana */}
            <div className="relative flex gap-x-3 px-2">
              <div className="flex h-6 items-center">
                <input
                  id="available-in-ghana"
                  name="available-in-ghana"
                  type="checkbox"
                  onChange={handleIsAvailableInGhana}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="available-in-ghana" className="font-medium text-gray-900">
                  Available in Ghana
                </label>
                <p className="text-gray-500 text-xs">An indication will show on this item, to tell customers that it is available for instant delivery.</p>
              </div>
            </div>
            {/* Is on Sale */}
            <div className="relative flex gap-x-3 px-2">
              <div className="flex h-6 items-center">
                <input
                  id="is-on-sale"
                  name="is-on-sale"
                  type="checkbox"
                  onChange={handleIsOnSaleChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="is-on-sale" className="font-medium text-gray-900">
                  Under promotional sale
                </label>
                <p className="text-gray-500 text-xs">Include this product to the current promotion.</p>
              </div>
            </div>
          </div>

        </fieldset>
        <div className="flex justify-end">
          <Button
            onClick={handleProductSave}
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

export default addproductformcomponent;