import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  fetchAllDocumentsInCollection,
} from "@/utils/functions";
import AllProducts from "@/components/admin/all-products";

const page = async () => {
  const allProducts = await fetchAllDocumentsInCollection("products");

  return (
    <div className="">
      <div
        className="flex
        flex-col items-start md:max-w-[35%] m-auto justify-center gap-3 mb-40"
      >
        <div className="w-full">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default page;
