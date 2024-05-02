import React from "react";
import EditCollectionFormComponent from "@/components/admin/edit-collection.component";
import { fetchDocumentFromFirestore } from "@/utils/functions";


const page = async ({ params }) => {
  const { collectionID } = params;
  console.log(collectionID);
  const data = await fetchDocumentFromFirestore('collections', collectionID );
  if (!data) return <div>collection does not exist</div>;
  return (
    <div className="">
      <div className="flex flex-col items-start md:max-w-[35%] m-auto justify-center gap-3 mb-40">
        <div className="w-full">
        <EditCollectionFormComponent
          data={data}
          collectionID={collectionID}
        />

        </div>
      </div>
    </div>
  );
};
export default page;
