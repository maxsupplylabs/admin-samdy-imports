import React from "react";
import AddCollectionform from "@/components/admin/add-collections-form.component";

const page = async () => {
  return (
    <div
    >
      <div
        className="flex
    flex-col items-start md:max-w-[35%] m-auto justify-center gap-3"
      >
        <div className="w-full">
          <AddCollectionform />
        </div>
      </div>
    </div>
  );
};

export default page;
