"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { deleteDocument } from "@/utils/functions";
import { useAllProducts } from "@/hooks/useAllProducts";
import { toast } from "react-hot-toast";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { limitString } from "@/utils/functions";
import { Separator } from "@/components/ui/separator";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "/components/ui/alert-dialog";

const AllProducts = ({ collections }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Retrieve the selected collection ID from localStorage if available
    const initialSelectedCollection = localStorage.getItem("selectedCollection");
    const [selectedCollection, setSelectedCollection] = useState(
        initialSelectedCollection || ""
    );
    const { products, isLoading, isError } = useAllProducts();

    // useEffect(() => {
    //   // Save the selected collection ID to localStorage whenever it changes
    //   localStorage.setItem("selectedCollection", selectedCollection);
    // }, [selectedCollection]);

    // useEffect(() => {
    //   // Restore the selected collection ID from the URL query parameter if available
    //   const dep = searchParams.get("col");
    //   if (dep) {
    //     setSelectedCollection(dep);
    //   }
    // }, [searchParams]);

    // Function to handle collection selection
    const handleTabClick = (collectionId) => {
        setSelectedCollection(collectionId);

        // Update the URL query parameter to reflect the selected collection
        // router.push(`/products?dep=${collectionId}`, undefined, { shallow: true });
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error Loading data</div>;
    }

    const selectedCollectionData = products.filter((product) =>
        product.collections.includes(selectedCollection)
    );



    return (
        <>
            {/* <div className="flex justify-normal overflow-auto shadow-lg px-2 sticky top-14 md:top-[85px] z-50 bg-white py-1 gap-4"> */}

            {/* {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => handleTabClick(collection.id)}
            className={`mr-4 text-sm capitalize border border-gray-300 font-medium rounded-xl hover:border-green-300 min-w-max py-2 px-2 ${selectedCollection === collection.id ? "bg-green-300/10 border-green-300" : ""
              }`}
          >
            {collection.title}
          </button>

        ))} */}
            {/* {collections.length === 0 ? (
                    <div className="text-sm flex justify-center md:mx-0 md:ml-2 md:text-lg items-center text-center mt-2 p-2 w-80 mx-auto rounded-lg shadow-lg text-gray-600 bg-white">
                        <h2>You have <span className="font-semibold">no collection</span> in this department. <br /> Tap on the <span><LuPlus className="inline text-black text-lg" /></span> icon to <span className="font-semibold"></span><Link href={"/add-collection"} className="underline text-"> create one.</Link></h2>
                    </div>
                ) : (
                    <div className="flex md:grid overflow-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-x-1.5 gap-y-1.5 px-2 py-2">
                        {collections.map((collection) => (
                            <button
                                key={collection.id}
                                onClick={() => handleTabClick(collection.id)}
                                className={`flex justify-center items-center gap-2 rounded-lg min-h-full min-w-fit p-3 md:hover:shadow-md md:min-w-full bg-[#f7f7f7] font-medium py-2 px-2 ${selectedCollection === collection.id ? "" : ""
                                    }`}
                            >
                                <div className="flex flex-col justify-start items-center">
                                    <div className="w-full">
                                        <Image
                                            className={`w-14 h-14 object-cover rounded-full ${selectedCollection === collection.id ? "border border-black" : ""}`}
                                            src={collection.images[0].src}
                                            width={500}
                                            height={500}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <h3 className={`text-black/60 text-center text-xs font-medium w-20 line-clamp-3 ${selectedCollection === collection.id ? "text-black/100" : ""}`}>
                                        {collection.title}
                                    </h3>
                                </div>
                            </button>
                        ))}

                    </div>
                )} */}
            {/* </div> */}
            <div className="">
                <div className="bg-black flex justify-between items-center px-4 py-2">
                    <div>
                        <h1 className="text-white text-lg font-bold">All products</h1>
                    </div>
                    <div>
                        <p className="text-white">Total: {products.length}</p>
                    </div>
                </div>
                {products.length === 0 && <div className="flex flex-col justify-center items-center w-[90vw] mt-2 mx-auto text-center min-h-[40vh]"><span>You have no product in your store - yet. <Link href={"/add-product"} className="block text-blue-600">Add product</Link></span></div>}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-1.5 gap-y-1.5 px-2 pb-6 mt-2">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className={`shadow-lg`}
                        >
                            <div className="flex flex-col justify-start items-center">
                                {product.images[0] &&
                                    <div className="relative w-full pt-[100%]">
                                        <Image
                                            className="absolute w-full h-full top-0 left-0 object-cover rounded-t-[4px]"
                                            src={product.images[0].src}
                                            width={500}
                                            height={500}
                                            alt=""
                                        />
                                        {product.isFreeShipping && (
                                            <div className="absolute bottom-0 flex items-center gap-1 text-green-700 text-xs bg-green-50 w-full px-2">
                                                {/* <RiShip2Line className="text-sm" /> */}
                                                <p className="text-green-700 px-1 md:text-sm">
                                                    {product.isFreeShipping ? `Free shipping` : ""}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                }
                                <div className="py-1 px-2 w-full flex flex-col items-start min-h-[4.5rem]">
                                    <h3 className="text-xs md:text-sm text-left">
                                        {limitString(product.name, 24)}
                                    </h3>
                                    <div>
                                        {product.isAvailableInGhana && (
                                            <p className="text-orange-500 text-xs md:text-sm">
                                                {product.isAvailableInGhana ? `Available in Ghana` : null}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex text-base text-left items-center gap-2 justify-start mt-1">
                                            <p className="font-semibold text-[#000000]">
                                                GHc{product.price}
                                            </p>
                                            {product.market_price === 0 || isNaN(product.market_price) ? "" : (
                                                <div className="flex justify-center items-center gap-1">
                                                    <p className="text-xs text-black/40">
                                                        <span className="line-through">
                                                            GHc{product.market_price}
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="mx-4 block">
                                <Separator className="" />
                            </span>
                            <div className="bg-violet grid grid-cols-2 gap-2 justify-center items-center p-2 w-fit">

                                <div className="fle items-center">
                                    <Link
                                        className={`flex items-center gap-2 rounded-md border px-1 text-[#007AFF]`}
                                        href={`/products/${product.id}`}
                                    >
                                        <span>Edit</span> <MdOutlineEdit className="text-xl" />
                                    </Link>
                                </div>
                                <div className="">
                                    <button
                                        className={`flex items-center gap-2 rounded-md border px-1 text-[#007AFF]`}
                                        onClick={() => {
                                            try {
                                                // Copy the current page URL to the clipboard
                                                const productUrl = product.id;
                                                navigator.clipboard.writeText("https://samdyimports.vercel.app/" + productUrl);
                                                toast.success("Product link copied successfully", {
                                                    position: "top-center",
                                                    icon: '👍🏾',
                                                    style: {
                                                        borderRadius: '10px',
                                                        background: '#fff',
                                                        color: '#000',
                                                    },
                                                });
                                            } catch (error) {
                                                console.error("Error deleting product:", error);
                                            }
                                        }}
                                    >
                                        <span>Copy</span> <MdContentCopy className="text-xl" />
                                    </button>
                                </div>
                                <div className="w-fit">
                                    <AlertDialog>
                                        <AlertDialogTrigger className="flex justify-center gap-2 rounded-md border px-1 text-red-600 font-medium">
                                            <span>Remove</span>
                                            <IoMdRemoveCircle className="text-red-600 text-lg mt-1" />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete
                                                    this item and remove its data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="">
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => {
                                                        try {
                                                            deleteDocument("products", product.id);
                                                            toast.success("Deleted successfully", {
                                                                position: "top-center",
                                                            });
                                                        } catch (error) {
                                                            console.error("Error deleting product:", error);
                                                        }
                                                    }}
                                                >
                                                    Yes
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllProducts;
