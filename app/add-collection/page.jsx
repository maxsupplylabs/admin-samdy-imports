import React from "react";
import AddCollectionform from "@/components/admin/add-collections-form.component";
import { getAllCollections } from "@/utils/functions";
// import withAuthentication from "@/components/business/ProtectedRoute";

const page = async () => {
  const allCollections = await getAllCollections();
  return (
    <div
    className=""
  >
    <div
      className="flex
    flex-col items-start md:max-w-[35%] m-auto justify-center gap-3 mb-40"
    >
          <div className="w-full">
            <AddCollectionform allCollections={allCollections} />
          </div>
        </div>
      </div>
  );
};

export default page;
