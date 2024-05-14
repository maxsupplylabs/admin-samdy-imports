"use client"
import Link from "next/link";
import * as React from "react";
import { clsx } from "clsx";
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LuMenuSquare } from "react-icons/lu";
import { MdStoreMallDirectory } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { Separator } from "../ui/separator";
import { BsPersonHearts } from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { AiOutlineAppstore } from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import { useAllCollections } from "@/hooks/useAllCollections";

export default function AdminHeader() {
  const pathname = usePathname()

  // const {collections, isLoading, isError} = useAllCollections()

  // if (isLoading) {
  //   return <div>Loading</div>
  // }

  // if (isError) {
  //   return <div>Error occured</div>
  // }

  // Function to determine if a link is active
  const isActive = (href) => {
    return pathname === href;
  };
  return (
    <div className="bg-white flex flex-col border-b">
      <div className="px-2 flex justify-between items-center py-2 md:w-[98%] md:m-auto">
        <div className="flex flex-col items-center gap-1">
          <Link
            href={"/"}
            className={"flex justify-center items-center w-10 h-10 rounded-full bg-black shadow-lg gap-2 text-sm font-semibold"}
          >
            <span className="text-3xl text-white">S</span>
          </Link>
        </div>
        <Sheet asChild>
          <SheetTrigger>
            <span className="bg-[#f7f7f8] p-2 rounded-md block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
            </span>

          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">
                <span className="text-2xl font-bold">Manage</span>
              </SheetTitle>
            </SheetHeader>
            <div>
              <div className="flex flex-col justify-normal overflow-auto mt-4 py-1 gap-4">
                <a
                  href={"/"}
                  className={clsx(
                    "min-w-max w-full inline-flex items-center justify-start gap-2 text-sm whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
                    { 'bg-[#f1f1f7] rounded-md': isActive('/') } // Apply different border color if active
                  )}
                >
                  <span>
                    <MdStoreMallDirectory className="text-2xl" />
                  </span>
                  <span className="">Inventory</span>
                </a>
                <Separator className="my-1" />
                <a
                  href={"/dashboard"}
                  className={clsx(
                    "min-w-max w-full inline-flex items-center justify-start gap-2 text-sm whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
                    { 'bg-[#f1f1f7] rounded-md': isActive('/dashboard') } // Apply different border color if active
                  )}
                >
                  <span>
                    <FiHome className="text-2xl" />
                  </span>
                  <span className="">Dashboard</span>
                </a>
                <a
                  href={"/orders"}
                  className={clsx(
                    "min-w-max w-full inline-flex items-center justify-start gap-2 text-sm whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
                    { 'bg-[#f1f1f7] rounded-md': isActive('/orders') } // Apply different border color if active
                  )}
                >
                  <span>
                    <FiShoppingCart className="text-2xl" />
                  </span>
                  <span className="">Orders</span>
                </a>
                <a
                  href={"/customers"}
                  className={clsx(
                    "min-w-max w-full inline-flex items-center justify-start gap-2 text-sm whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
                    { 'bg-[#f1f1f7] rounded-md': isActive('/customers') } // Apply different border color if active
                  )}
                >
                  <span>
                    <BsPersonHearts className="text-2xl" />
                  </span>
                  <span className="">Customers</span>
                </a>
                <Separator className="my-1" />
                <a
                  href={"/add-collection"}
                  className={clsx(
                    "min-w-max w-full inline-flex items-center justify-start gap-2 text-sm whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
                    { 'bg-[#f1f1f7] rounded-md': isActive('/add-collection') } // Apply different border color if active
                  )}
                >
                  <span>
                    <HiOutlineViewGridAdd className="text-2xl" />
                  </span>
                  <span className="">Create collection</span>
                </a>
                <a
                  href={"/collections"}
                  className={clsx(
                    "min-w-max w-full inline-flex items-center justify-start gap-2 text-sm whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
                    { 'bg-[#f1f1f7] rounded-md': isActive('/collections') } // Apply different border color if active
                  )}
                >
                  <span>
                    <HiOutlineViewGrid className="text-2xl" />
                  </span>
                  <span className="">All collections</span>
                </a>

                <Separator className="my-1" />
                <a
                  href={"/add-product"}
                  className={clsx(
                    "min-w-max w-full inline-flex items-center justify-start gap-2 text-sm whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
                    { 'bg-[#f1f1f7] rounded-md': isActive('/add-product') } // Apply different border color if active
                  )}
                >
                  <span>
                    <CgAddR className="text-2xl" />
                  </span>
                  <span className="">Add product</span>
                </a>
                <a
                  href={"/products"}
                  className={clsx(
                    "min-w-max w-full inline-flex items-center justify-start gap-2 text-sm whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
                    { 'bg-[#f1f1f7] rounded-md': isActive('/products') } // Apply different border color if active
                  )}
                >
                  <span>
                    <MdOutlineCheckBoxOutlineBlank className="text-2xl" />
                  </span>
                  <span className="">All products</span>
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Component() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Your Orders</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Introducing Our Dynamic Orders Dashboard for Seamless Management and
          Insightful Analysis.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Create New Order</Button>
      </CardFooter>
    </Card>
  )
}
