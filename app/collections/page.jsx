import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  fetchAllDocumentsInCollection,
} from "@/utils/functions";
import AllCollections from "@/components/admin/all-collections";

const page = async () => {
  const allCollections = await fetchAllDocumentsInCollection("collections");

  return (
    <div className="">
      <div
        className="flex
        flex-col items-start md:max-w-[35%] m-auto justify-center gap-3 mb-40"
      >
        <div className="w-full">
          <AllCollections allCollections={allCollections} />
        </div>
      </div>
    </div>
  );
};

export default page;
