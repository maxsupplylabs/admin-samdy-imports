"use client"
import React from "react";
import AllProducts from "@/components/admin/all-products";
import { useAllCollections } from "@/hooks/useAllCollections";

const page = () => {
  const { collections, isLoading, isError } = useAllCollections();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error Loading data</div>;
  }

  return (
    <div className="">
      <div
        className="flex
        flex-col items-start md:max-w-[35%] m-auto justify-center gap-3 mb-40"
      >
        <div className="w-full">
          <AllProducts collections={collections} />
        </div>
      </div>
    </div>
  );
};

export default page;
