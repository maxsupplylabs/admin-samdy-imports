"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useBizProductContext } from "@/context/Business-Product-Edit";
import { editProductInStore, getDocumentsInCollectionRealTime } from "@/utils/functions";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import confetti from "canvas-confetti";

const EditProductFormComponent = ({ data, productID }) => {

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
    variations,
  } = useBizProductContext();

  const [productData, setProductData] = useState({
    name: data.name,
    description: data.description,
    collections: data.collections,
    market_price: data.market_price,
    departments: data.departments,
    moq: data.moq,
    price: data.price,
    variations: data.variations,
    isFreeShipping: data.isFreeShipping,
    isAvailableInGhana: data.isAvailableInGhana,
  });
  const [departments, setDepartments] = useState(productData.departments);
  const [collections, setCollections] = useState(productData.collections);


  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(data.images);
  const [newImagesUrl, setNewImagesUrl] = useState(imageSrc);
  const [saving, setSaving] = useState(false);


  // Handle product save
  const handleProductEdit = async () => {
    try {
      setSaving(true);
      console.log("uploading image");
      const numericPrice = parseFloat(productData.price);
      const numericMarketPrice = parseFloat(productData.market_price);
      await editProductInStore(
        {
          ...productData,
          price: numericPrice, // Convert to number
          market_price: numericMarketPrice, // Convert to number
          variations,
          collections,
          departments,
        },
        productID
      );
      toast.success(`Product edited succesfully.`);
      // Show confetti
      confetti({
        particleCount: 300,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#bb0000', '#ffffff', '#00ff00', '#0000ff', '#ffbb00']
      });
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  };


  const handleIsAvailableInGhanaChange = () => {
    setProductData((prevData) => ({
      ...prevData,
      isAvailableInGhana: !prevData.isAvailableInGhana,
    }));
  };

  const handleFreeShippingChange = () => {
    setProductData((prevData) => ({
      ...prevData,
      isFreeShipping: !prevData.isFreeShipping,
    }));
  };

    const handleDepartmentToggle = (departmentId) => {
      setDepartments((prevDepartments) =>
        prevDepartments.includes(departmentId)
          ? prevDepartments.filter((id) => id !== departmentId)
          : [...prevDepartments, departmentId]
      );
    };

    const handleCollectionToggle = (collectionId) => {
      setCollections((prevCollections) =>
        prevCollections.includes(collectionId)
          ? prevCollections.filter((id) => id !== collectionId)
          : [...prevCollections, collectionId]
      );
    };

  const handleProductInfoChange = (e) => {
    console.log(productData);
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

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
          <h1 className="text-white text-lg font-bold">Edit product</h1>
        </div>
        <Button
          onClick={handleProductEdit}
          className={` bg-green-600 ${saving ? " cursor-not-allowed bg-gray-400" : null
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
              Name
            </label>
            <input
              className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base"
              type="text"
              id="name"
              placeholder="Women casual jacket"
              value={productData?.name || ""}
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
                <div key={index} className="relative">
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
        {/* Prices fields */}
        <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-2">
          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium">
              Price{" "}
            </label>
            <input
              className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base"
              type="number"
              id="price"
              placeholder="60.00"
              value={productData?.price || ""}
              onChange={handleProductInfoChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="market_price" className="text-sm font-medium">
              Market Price{" "}
            </label>
            <input
              className="border placeholder:text-sm border-black rounded-md px-2 py-1 text-base"
              type="number"
              id="market_price"
              placeholder="150.00"
              value={productData?.market_price || ""}
              onChange={handleProductInfoChange}
              required
            />
          </div>
        </div>
      <fieldset className="border border-gray-300 rounded-lg p-2">
        <legend className="text-sm font-medium mb-4">
          Current department
        </legend>
        {departments.map((item) => (
          <div key={item} className="flex items-center gap-x-3 mb-2">
            <input
              id={`current_department_${item}`}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              checked={true}
              disabled
            />
            <label htmlFor={`current_department_${item}`} className="text-sm leading-6 text-gray-900">
              {allDepartments.find((department) => department.id === item)?.name}
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset className="border border-gray-300 rounded-lg p-2">
        <legend className="text-sm font-medium mb-4">
          Select a new department
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
            <label htmlFor={`department_${department.id}`} className="text-sm leading-6 text-gray-900">
              {department.name}
            </label>
          </div>
        ))}
      </fieldset>
      
      <fieldset className="border border-gray-300 rounded-lg p-2">
        <legend className="text-sm font-medium mb-4">
          Current collection
        </legend>
        {collections.map((item) => (
          <div key={item} className="flex items-center gap-x-3 mb-2">
            <input
              id={`current_collection_${item}`}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              checked={true}
              disabled
            />
            <label htmlFor={`current_collection_${item}`} className="text-sm leading-6 text-gray-900">
              {uploadedCollections.find((collection) => collection.id === item)?.title}
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset className="border border-gray-300 rounded-lg p-2">
        <legend className="text-sm font-medium mb-4">
          Select a new collection
        </legend>
        {uploadedCollections.length === 0 && (
          <div className="text-sm flex justify-center md:mx-0 md:ml-2 md:text-lg items-center text-center mt-2 p-2 bg-[#f7f7f7] w-[22rem] mx-auto rounded-lg shadow-lg text-gray-600">
            <h2>
              You have <span className="font-semibold">no collection</span>. <br /> A product must be inside a collection.{' '}
              <Link href="/add-collection" className="text-blue-600">Create collection.</Link>
            </h2>
          </div>
        )}
        {uploadedCollections.map((collection) => (
          <div key={collection.id} className="flex items-center gap-x-3 mb-2">
            <input
              id={`collection_${collection.id}`}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              onChange={() => handleCollectionToggle(collection.id)}
              checked={collections.includes(collection.id)}
            />
            <label htmlFor={`collection_${collection.id}`} className="text-sm leading-6 text-gray-900">
              {collection.title}
            </label>
          </div>
        ))}
      </fieldset>
        <fieldset className="border border-blue-300 rounded-lg p-2">
          <legend className="text-sm font-medium text-blue-600 mb-4">
            Specification
          </legend>
          <div className="flex flex-col gap-3">
            {/* Available in Ghana */}
            <div className="relative flex gap-x-3 px-2">
              <div className="flex h-6 items-center">
                <input
                  type="checkbox"
                  id="available-in-ghana"
                  name="available-in-ghana"
                  checked={productData?.isAvailableInGhana || ""}
                  onChange={handleIsAvailableInGhanaChange}
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
          </div>
                      {/* Free Shipping */}
                      <div className="relative flex gap-x-3 px-2">
              <div className="flex h-6 items-center">
                <input
                  id="free-shipping"
                  name="free-shipping"
                  type="checkbox"
                  checked={productData?.isFreeShipping || ""}
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
        </fieldset>
        <div className="flex justify-end px-4 py-2">
          <Button
            onClick={handleProductEdit}
            className={` bg-green-600 ${saving ? " cursor-not-allowed bg-gray-400" : null
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

export default EditProductFormComponent;
