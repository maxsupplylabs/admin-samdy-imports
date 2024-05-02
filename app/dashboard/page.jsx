"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
const page = () => {
  return (
    <div
      className="flex
    flex-col items-center justify-center min-h-screen w-full  "
    >
      <div
        className="flex
      flex-col items-center max-w-md justify-center gap-3 p-5 border border-gray-300 rounded-md mt-10 mb-40"
      >
        <div className="flex flex-col items-center">
          <p>What are you selling?</p>
        </div>
        <div className="flex flex-col items-center gap-3 mb-36">
          <Link href={`add-product`}>
            <Button>Add you products</Button>
          </Link>
          <Link href={`/products`}>
            <Button variant={"outline"}>See your added products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
