"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useAllCollections } from "@/hooks/useAllCollections";
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-hot-toast";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { deleteDocument } from "@/utils/functions";
import { Separator } from "@/components/ui/separator";
import { LuPlus } from "react-icons/lu";
import { limitString } from "@/utils/functions";
import { Badge } from "@/components/ui/badge"

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

export default function Inventory({ products }) {
    // Retrieve the selected department ID from localStorage if available
    const initialSelectedDepartment = localStorage.getItem("selectedDepartment");
    const [selectedDepartment, setSelectedDepartment] = useState(initialSelectedDepartment || "womensBagsAndLuggage");
    const initialSelectedCollection = localStorage.getItem("selectedCollection");
    const [selectedCollection, setSelectedCollection] = useState(
        initialSelectedCollection || ""
    );
    const { collections, isLoading, isError } = useAllCollections();

    const router = useRouter();
    const searchParams = useSearchParams();


    useEffect(() => {
        // Save the selected department ID to localStorage whenever it changes
        localStorage.setItem("selectedDepartment", selectedDepartment);
        // Save the selected collection ID to localStorage whenever it changes
        localStorage.setItem("selectedCollection", selectedCollection);
    }, [selectedDepartment, selectedCollection]);

    useEffect(() => {
        // Restore the selected department ID from the URL query parameter if available
        const dep = searchParams.get("dep");
        if (dep) {
            setSelectedDepartment(dep);
        }
        // Restore the selected collection ID from the URL query parameter if available
        const col = searchParams.get("col");
        if (col) {
            setSelectedCollection(col);
        }
    }, [searchParams]);

    // Function to handle dep selection
    const handleDepartmentClick = (departmentKey) => {
        setSelectedDepartment(departmentKey);
        setSelectedCollection("")

        // Update the URL query parameter to reflect the selected collection
        router.push(`/?dep=${departmentKey}`, undefined, { shallow: true });
    };
    // Function to handle collection selection
    const handleCollectionClick = (collectionId) => {
        setSelectedCollection(collectionId);

        // Update the URL query parameter to reflect the selected collection
        // router.push(`/?col=${collectionId}`, undefined, { shallow: true });
    };
    if (isLoading) {
        return (
            <div className="mt-3 px-2">
                <div className="flex justify-normal overflow-auto mb-4 px-2 sticky top-12 md:top-[85px] z-50 bg-white py-1">
                    <div class="h-8 w-4/5 md:w-1/12 mr-4 rounded-lg bg-gray-300/40"></div>
                    <div class="h-8 w-4/5 md:w-1/12 mr-4 rounded-lg bg-gray-300/40"></div>
                    <div class="h-8 w-4/5 md:w-1/12 mr-4 rounded-lg bg-gray-300/40"></div>
                    <div class="h-8 w-3/5 md:w-1/12 mr-4 rounded-lg bg-gray-300/40"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-1.5 gap-y-1.5 px-2">
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                    <div class="space-y-2 min-h-full w-full md:min-w-full">
                        <div class="h-40 min-w-full bg-gray-300/20"></div>
                        <div class="space-y-3 p-2">
                            <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
                            <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return <div>Error Loading data</div>
    }



    const departments = [
        {
            key: "womensBagsAndLuggage",
            label: "Women Bags & Luggage",
        },
        {
            key: "mensWatches",
            label: "Men Watches",
        },
        {
            key: "womensWatches",
            label: "Women Watches",
        },
        {
            key: "homeAndKitchen",
            label: "Home & Kitchen",
        },
        {
            key: "mensBagsAndLuggage",
            label: "Men Bags & Luggage",
        },
        {
            key: "womensShoes",
            label: "Women Shoes",
        },
        {
            key: "mensShoes",
            label: "Men Shoes",
        },
        {
            key: "mensClothing",
            label: "Men Clothing",
        },
        {
            key: "womensClothing",
            label: "Women Clothing",
        },
        {
            key: "mensAccessories",
            label: "Men Accessories",
        },
        {
            key: "womensAccessories",
            label: "Women Accessories",
        },
        {
            key: "appliances",
            label: "Appliances",
        },
        {
            key: "electronics",
            label: "Electronics",
        },
    ]


    const selectedDepartmentData = collections.filter((collection) => collection.department === selectedDepartment);
    const selectedCollectionData = products.filter((product) => product.collections.includes(selectedCollection)
    );
    return (
        <div className="">
            <div className="p-2">
                <h1 className="text-3xl font-bold capitalize">Your inventory</h1>
            </div>
            <div className="my-2 bg-white">
                <h1 className="text-lg text-gray-700 px-2 font-semibold lg:mb-0 lg:mr-4">
                    Departments
                </h1>
                <div className="flex items-start justify-normal overflow-auto px-2 bg-white py-1">
                    {departments.map((department) => (
                        <div key={department.key} className="flex flex-col justify-center items-center">
                            <button
                                onClick={() => handleDepartmentClick(department.key)}
                                className={`text-xs capitalize font-medium text-gray-500 hover:text-black w-max py-1 px-2 ${selectedDepartment === department.key ? "text-black" : "text-black"
                                    }`}
                            >

                                {department.label}
                            </button>
                            {selectedDepartment === department.key ? <span className="w-8 h-1 rounded-md block text-black bg-black"></span> : ""}
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-2 mb-2 bg-white">
                <h1 className="flex items-center text-lg text-gray-700 px-2 font-semibold lg:mb-0 lg:mr-4">
                    Collections <Badge variant={"outline"} className="text-[#577590] ml-2">{departments.map((department) => department.key === selectedDepartment ? department.label : "")}</Badge>
                </h1>
                {selectedDepartmentData.length === 0 ? (
                    <div className="text-sm flex justify-center md:mx-0 md:ml-2 md:text-lg items-center text-center mt-2 p-2 w-[22rem] mx-auto rounded-lg shadow-lg text-gray-600 bg-white">
                        <h2>You have <span className="font-semibold">no collection</span> in this department. <br /> Tap on the <span><LuPlus className="inline text-black text-lg" /></span> icon to <span className="font-semibold"></span><Link href={"/add-collection"} className="text-blue-600"> create collection.</Link></h2>
                    </div>
                ) : (
                    <div className="flex md:grid overflow-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-x-1.5 gap-y-1.5 px-2 py-2">
                        {selectedDepartmentData.map((collection) => (
                            <button
                                key={collection.id}
                                onClick={() => handleCollectionClick(collection.id)}
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
                )}
            </div>
            <div className="py-2 bg-white">
                <h1 className="flex items-center text-lg text-gray-700 px-2 font-semibold sticky top-14 z-50 lg:mb-0 lg:mr-4 bg-white">
                    Products
                    <Badge variant={"outline"} className="text-[#E86A68] ml-2">{collections.map((collection) => selectedCollection === collection.id ? `${collection.title}` : "")}</Badge>
                </h1>
                {!selectedCollection && <div className="flex justify-center items-center w-[90vw] text-3xl font-semibold mt-2 mx-auto text-center min-h-[30vh]">Please select a collection to see products.</div>}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-1.5 gap-y-1.5 px-2 pb-6 mt-2">
                    {selectedCollectionData.map((product) => (
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
        </div>
    );
}
