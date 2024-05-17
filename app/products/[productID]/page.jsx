"use client"
import React from "react";
import EditProductFormComponent from "@/components/admin/edit-product.component";
import { useProduct } from "@/hooks/useProduct"

const page = ({ params }) => {
  const { productID } = params;
 const { product, isLoading, isError} = useProduct(productID)
 console.log(product)
 if (isLoading) {
  return <div>Loading...</div>
 }

 if (isError) {
  return <div>Loading...</div>
 }
  return (
    <div className="">
      <div className="flex flex-col items-start md:max-w-[35%] m-auto justify-center gap-3 mb-40">
        <div className="w-full">
        <EditProductFormComponent
          data={product}
          productID={productID}
        />

        </div>
      </div>
    </div>
  );
};
export default page;
