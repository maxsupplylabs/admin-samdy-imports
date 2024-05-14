"use client";
import * as React from "react";
import Inventory from "@/components/ui/inventory"
import { useAllProducts } from "@/hooks/useAllProducts";
import { LuPlus } from "react-icons/lu";
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { CgAddR } from "react-icons/cg";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { Separator } from "@/components/ui/separator";
export default function Page() {
  const { products, isLoading, isError } = useAllProducts();

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isLoading) {
    return (
      <div className="mt-3 px-2">
        <div className="flex justify-normal overflow-auto mb-4 px-2 sticky top-12 md:top-[85px] z-50 bg-white py-1">
          <div class="h-8 w-4/5 md:w-1/12 mr-4 rounded-lg bg-gray-300/40"></div>
          <div class="h-8 w-4/5 md:w-1/12 mr-4 rounded-lg bg-gray-300/40"></div>
          <div class="h-8 w-4/5 md:w-1/12 mr-4 rounded-lg bg-gray-300/40"></div>
          <div class="h-8 w-3/5 md:w-1/12 mr-4 rounded-lg bg-gray-300/40"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-1.5 gap-y-1.5 px-2">
          <div class="space-y-2 min-h-full w-full md:min-w-full">
            <div class="h-40 min-w-full bg-gray-300/20"></div>
            <div class="space-y-3 p-2">
              <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
              <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
            </div>
          </div>
          <div class="space-y-2 min-h-full w-full md:min-w-full">
            <div class="h-40 min-w-full bg-gray-300/20"></div>
            <div class="space-y-3 p-2">
              <div class="h-3 w-4/5 rounded-lg bg-gray-300/40"></div>
              <div class="h-3 w-2/5 rounded-lg bg-gray-300/40"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return <div>Error Loading data</div>
  }

  if (isDesktop) {
    return (
      <div className="min-h-[88vh] bg-[#f7f7f7]">
        <Inventory products={products} />
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="fixed right-10 bottom-10 rounded-full">
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-gray-200 shadow-2xl w-14 h-14 rounded-full">
                <LuPlus className="text-5xl" />
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col my-4">
            <Link href={"/add-collection"} className="hover hover:bg-[#f1f1f1f1] rounded-md">
              <div className="flex items-center gap-2 text-lg px-2 p-4">
                <HiOutlineViewGridAdd className="text-2xl" />
                <span>Create collection</span>
              </div>
            </Link>
            <Separator />
            <Link href={"/add-product"} className="hover hover:bg-[#f1f1f1f1] rounded-md">
              <div className="flex items-center gap-2 text-lg px-2 p-4">
                <CgAddR className="text-2xl" />
                <span>Add product</span>
              </div>
            </Link>
          </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="min-h-[88vh] bg-[#f7f7f7]">
      <Inventory products={products} />
      <Drawer open={open} onOpenChange={setOpen}>
        <div className="fixed right-10 bottom-10 rounded-full">
          <DrawerTrigger asChild>
            <Button variant="outline" className="bg-gray-200 shadow-2xl w-14 h-14 rounded-full">
              <LuPlus className="text-5xl" />
            </Button>
          </DrawerTrigger>
        </div>
        <DrawerContent>
          <div className="flex flex-col my-4">
            <Link href={"/add-collection"} className="hover hover:bg-[#f1f1f1f1]">
              <div className="flex items-center gap-2 text-lg px-2 p-4">
                <HiOutlineViewGridAdd className="text-2xl" />
                <span>Create collection</span>
              </div>
            </Link>
            <Separator />
            <Link href={"/add-product"} className="hover hover:bg-[#f1f1f1f1]">
              <div className="flex items-center gap-2 text-lg px-2 p-4">
                <CgAddR className="text-2xl" />
                <span>Add product</span>
              </div>
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}