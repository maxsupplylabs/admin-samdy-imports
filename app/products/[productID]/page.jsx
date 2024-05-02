import React from "react";
import EditProductFormComponent from "@/components/admin/edit-product.component";
import { fetchDocumentFromFirestore } from "@/utils/functions";


const page = async ({ params }) => {
  const { productID } = params;
  const data = await fetchDocumentFromFirestore('products', productID );
  if (!data) return <div>Product does not exist</div>;
  return (
    <div className="">
      <div className="flex flex-col items-start md:max-w-[35%] m-auto justify-center gap-3 mb-40">
        <div className="w-full">
        <EditProductFormComponent
          data={data}
          productID={productID}
        />

        </div>
      </div>
    </div>
  );
};
export default page;
