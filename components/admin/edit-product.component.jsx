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
    departments,
    collections,
    addCollection,
    removeCollection,
    addDepartment,
    removeDepartment,
    setVariations,
  } = useBizProductContext();
  const {
    name,
    description,
    price,
    // collections,
    confirmed_orders,
    confirmed_sales,
    // departments,
    images,
    isFreeShipping,
    isAvailableInGhana,
    isOnSale,
    isFreeDelivery,
    market_price,
    moq,
    variations,
  } = data;
  const [colors, setColors] = useState([]);

  const [sizes, setSizes] = useState([]);
  const [productData, setProductData] = useState({
    name,
    description,
    confirmed_orders,
    confirmed_sales,
    market_price,
    moq,
    price,
    variations,
    isFreeShipping,
    isAvailableInGhana,
    isOnSale,
    isFreeDelivery,
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
  const handleProductEdit = async () => {
    try {
      setSaving(true);
      console.log("uploading image");
      // const productID = generateUniqueId(productData.name);
      // const imgurls = await uploadProductImagesToFirebase(
      //   files,
      //   bizIDFromPath,
      //   productID
      // );
      // console.log("done uploading images and returning urls", imgurls);
      // Convert price and market_price to numbers.
      const numericPrice = parseFloat(productData.price);
      const numericMarketPrice = parseFloat(productData.market_price);
      await editProductInStore(
        {
          ...productData,
          // colors,
          // sizes,
          // isFreeShipping,
          // id: productID,
          price: numericPrice, // Convert to number
          market_price: numericMarketPrice, // Convert to number
          variations,
          collections,
          departments,
          // images: imgurls,
        },
        productID
      );
      toast.success(`Product edited succesfully.`);
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  };

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

  const handleFreeShippingChange = () => {
    setProductData((prevData) => ({
      ...prevData,
      isFreeShipping: !prevData.isFreeShipping,
    }));
  };

  const handleIsAvailableInGhanaChange = () => {
    setProductData((prevData) => ({
      ...prevData,
      isAvailableInGhana: !prevData.isAvailableInGhana,
    }));
  };

  const handleIsOnSaleChange = () => {
    setProductData((prevData) => ({
      ...prevData,
      isOnSale: !prevData.isOnSale,
    }));
  };

  const handleIsFreeDeliveryChange = () => {
    setProductData((prevData) => ({
      ...prevData,
      isFreeDelivery: !prevData.isFreeDelivery,
    }));
  };

  /**handlers for size */
  const addSize = () => {
    const newsize = "";
    const updatedSize = [...sizes, newsize];
    setSizes(updatedSize);
  };

  const updateSize = (index, value) => {
    const updatedSize = [...sizes];
    updatedSize[index] = value;
    setSizes(updatedSize);
  };

  const removeSize = (index) => {
    const updatedSize = [...sizes];
    updatedSize.splice(index, 1);
    setSizes(updatedSize);
  };

  // Functions to handle variations
  const addVariation = () => {
    const newVariation = { type: "", values: [] };
    setVariations([...variations, newVariation]);
  };

  const updateVariationType = (index, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index].type = value;
    setVariations(updatedVariations);
  };

  const addVariationValue = (index, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index].values.push(value);
    setVariations(updatedVariations);
  };

  const removeVariationValue = (index, valueIndex) => {
    const updatedVariations = [...variations];
    updatedVariations[index].values.splice(valueIndex, 1);
    setVariations(updatedVariations);
  };

  const removeVariation = (index) => {
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1);
    setVariations(updatedVariations);
  };
  const updateVariationValues = (index, values) => {
    const updatedVariations = [...variations];
    updatedVariations[index].values = values;
    setVariations(updatedVariations);
  };


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

  const removeColor = (index) => {
    const updatedColors = [...colors];
    updatedColors.splice(index, 1);
    setColors(updatedColors);
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

        {/* variations */}
        {/* <div>
          <div className="flex flex-col border border-gray-300 rounded-lg p-2">
            <label htmlFor="variations" className="text-sm font-medium">
              Variations
            </label>
            {variations.map((variation, index) => (
              <div
                key={index}
                className="flex gap-2 items-center justify-between mb-4"
              >
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
              <span>Add Variation</span>
            </button>
          </div>
        </div> */}
                <fieldset className="border border-gray-300 rounded-lg p-2">
          <legend className="text-sm font-medium mb-4">
            Select a department
          </legend>
          {allDepartments.map((department) => (
            <div key={department.id} className="flex items-center gap-x-3 mb-2">
              <input
                id={`department_${department.id}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                onChange={
                  () => {
                    handleDepartmentToggle(department.id)
                  } 
                }
                checked={departments.includes(department.id)}
              />
              <label htmlFor={`department_${department.id}`} className="text-sm leading-6 text-gray-900">{department.name}</label>
            </div>
          ))}
        </fieldset>

        <fieldset className="border border-gray-300 rounded-lg p-2">
          <legend className="text-sm font-medium mb-4">
            Select a collection
          </legend>
          {uploadedCollections.length === 0 && <div className="text-sm flex justify-center md:mx-0 md:ml-2 md:text-lg items-center text-center mt-2 p-2 bg-[#f7f7f7] w-[22rem] mx-auto rounded-lg shadow-lg text-gray-600">
            <h2>You have <span className="font-semibold">no collection</span>. <br /> A product must be inside a collection. <Link href={"/add-collection"} className="text-blue-600"> Create collection.</Link></h2>
          </div>}
          {uploadedCollections.map((collection) => (
            <div key={collection.id} className="flex items-center gap-x-3 mb-2">
              <input
                id={`collection_${collection.id}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={collections.includes(collection.id)}
                onChange={
                  () => {
                    handleCollectionToggle(collection.id)
                  } 
                }
              />
              <label htmlFor={`collection_${collection.id}`} className="text-sm leading-6 text-gray-900">{collection.title}</label>
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
