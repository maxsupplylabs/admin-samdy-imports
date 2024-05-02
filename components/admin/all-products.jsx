"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { deleteDocument } from "@/utils/functions";
import { useAllProducts } from "@/hooks/useAllProducts";
import { toast } from "react-hot-toast";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";

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

const AllProducts = () => {
  const { products, isLoading, isError } = useAllProducts();
  console.log(products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error Loading data</div>;
  }

  return (
    <div className="">
      <div className="bg-black flex justify-between items-center px-4 py-2">
        <div>
          <h1 className="text-white text-lg font-bold">All products</h1>
        </div>
        <div>
          <p className="text-white">Total: {products.length}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-2 relative top-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`flex flex-col items-start bg-gray-100 p-1 rounded-lg w-full gap-2`}
          >
            <div className="flex justify-center items-center gap-2">
              {product.images.length > 0 ? (
                <Image
                  className="h-16 w-20 rounded-md object-cover"
                  src={product.images[0].src}
                  width={60}
                  height={80}
                  alt={product.name}
                  priority={true}
                />
              ) : (
                <div className="h-16 w-20 rounded-md object-cover bg-gray-300">
                  No image
                </div>
              )}
              <div className="">
                <h3 className="text-gray-700">{product.name}</h3>
                <p className="text-gray-500 text-sm">Price: {product.price}</p>
                {product.isAvailableInGhana && (
                  <div>
                    {product.isAvailableInGhana ? (
                      <p className="text-green-600">Available in Ghana</p>
                    ) : null}
                  </div>
                )}
                {product.isFreeShipping && (
                  <div>
                    {product.isFreeShipping ? (
                      <p className="text-green-600">Free shipping</p>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
            <div className="">
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
            <div className="flex items-center gap-4">
              <Link
                className={`flex items-center gap-2 rounded-md border px-1 text-[#007AFF]`}
                href={`/products/${product.id}`}
              >
                <span>Edit</span> <MdOutlineEdit className="text-xl" />
              </Link>
            </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
