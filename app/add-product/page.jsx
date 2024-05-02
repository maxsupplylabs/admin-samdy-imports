import React from "react";
import AddProductForm from "@/components/admin/add-products-form.component";
import {
  getAllCollections,
  countProductsInCollection,
  fetchAllDocumentsInCollection,
} from "@/utils/functions";
// import withAuthentication from "@/components/business/ProtectedRoute";

const page = async () => {
  const allCollections = await getAllCollections();
  const allProducts = await fetchAllDocumentsInCollection("products");
  const numberOfProductsInCollection = async (collectionId) => {
    await countProductsInCollection(allProducts, collectionId);
  };
  return (
    <div className="">
      <div
        className="flex
        flex-col items-start md:max-w-[35%] m-auto justify-center gap-3 mb-40"
      >
        <div className="w-full">
          <AddProductForm allCollections={allCollections} />
        </div>
      </div>
    </div>
  );
};

export default page;
