import React from "react";
import AllCollections from "@/components/admin/all-collections";

const page = async () => {

  return (
    <div className="">
      <div
        className="flex
        flex-col items-start md:max-w-[35%] m-auto justify-center gap-3 mb-40"
      >
        <div className="w-full">
          <AllCollections />
        </div>
      </div>
    </div>
  );
};

export default page;
