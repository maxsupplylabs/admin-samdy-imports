"use client"
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAllOrderedProducts } from "@/hooks/useAllOrders";
import { toast } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IoIosArrowForward } from "react-icons/io";
import { Separator } from "@radix-ui/react-separator";
import { BsFilter } from "react-icons/bs";
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
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"
import { FaWhatsapp } from "react-icons/fa";
import { TbCopy } from "react-icons/tb";

function ProductsWithOrders() {
  const { orderedProducts, isLoading, isError } = useAllOrderedProducts();
  const [selectedTab, setSelectedTab] = useState("week");
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [openStates, setOpenStates] = useState({});

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  // Function to toggle the open state for a specific product
  const toggleOpenState = (productId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
    setOpenStates({})
  };
  // Filter orders based on selected time period
  const filteredOrders = orderedProducts.filter((productWithOrders) => {
    const orderDate = productWithOrders.orders[0].timestamp.toDate();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const yearStart = new Date(today.getFullYear(), 0, 1); // First day of the current year

    // Function to check if two dates represent the same day
    const isSameDay = (date1, date2) => {
      return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
    };

    switch (selectedTab) {
      case "yesterday":
        return isSameDay(orderDate, yesterday);
      case "week":
        return orderDate >= weekStart && orderDate <= today;
      case "month":
        return orderDate >= monthStart && orderDate <= today;
      case "year":
        return orderDate >= yearStart && orderDate <= today;
      default:
        return isSameDay(orderDate, today); // Show all orders for today
    }
  });


  // Function to construct the text to be copied to clipboard
  const constructCopyText = (productWithOrder) => {
    const { productId, orders } = productWithOrder;
    const min = productWithOrder.orders[0].moq ? `${productWithOrder.orders[0].moq}` : "1"
    const orderTexts = orders.map(order => {
      // const moq = order.moq ? `${order.moq}` : "";
      const name = order.buyerName ? `${order.buyerName},` : "";
      const quantity = order.quantity ? `${order.quantity},` : "";
      const variationColor = order.variations.Color ? `${order.variations.Color},` : "";
      const variationSize = order.variations.Size ? `${order.variations.Size},` : "...";
      const paid = order.paid ? "Paid" : "Payment pending"
      return `${name} ${quantity} ${variationColor} ${variationSize} ${paid}`;
    }).join("\n");
    return `https://samdyimports.vercel.app/${productId}\n\nMOQ${min}\n${orderTexts}`;
  };

  // Function to handle copying text to clipboard
  const copyToClipboard = (productWithOrder) => {
    const copyText = constructCopyText(productWithOrder);
    navigator.clipboard.writeText(copyText).then(() => {
      toast.success("Order message copied successfully", {
        position: "top-center",
        icon: '👍🏾',
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#000',
      },
      });
    }).catch((error) => {
      console.error("Error copying to clipboard:", error);
      toast.error(`Error occured. Refresh.`);
    });
  };

  const encodedMessage = (productWithOrder) => constructCopyText(productWithOrder);

  if (isDesktop) {
    return (
      <>
        <div className="flex justify-between items-center m-2">
          <Tabs defaultValue="week">
            <TabsList className="bg-[#f1f1f1]">
              {/* <TabsTrigger value="yesterday" onClick={() => setSelectedTab("yesterday")}>Yesterday</TabsTrigger> */}
              <TabsTrigger value="week" onClick={() => setSelectedTab("week")}>Week</TabsTrigger>
              <TabsTrigger value="month" onClick={() => setSelectedTab("month")}>Month</TabsTrigger>
              <TabsTrigger value="year" onClick={() => setSelectedTab("year")}>Year</TabsTrigger>
            </TabsList>
          </Tabs>
          <button className="font-medium flex text-sm justify-center items-center gap-2 py-1 px-3 rounded-md border border-slate-200">
            <span>
              <BsFilter className="text-lg" />
            </span>
            <span className="md:block hidden">Filter</span>
          </button>
        </div>
        <div className="flex flex-col border border-slate-200 mx-2 mb-12 rounded-lg p-4 divide-y divide-solid">
          {filteredOrders.map((productWithOrders) => (
            <Dialog open={openStates[productWithOrders.productId]} onOpenChange={() => toggleOpenState(productWithOrders.productId)} key={productWithOrders.productId}>
              <div className="flex items-center justify-between gap-2 py-4 hover:bg-[#f6f6f6]">
                <DialogTrigger asChild>
                  <div className="flex gap-4 items-start w-full">
                    <div>
                      <Image
                        className="h-24 w-24 rounded-md object-cover"
                        src={productWithOrders.orders[0].image.src} // Render the first order's image
                        width={60}
                        height={80}
                        alt={productWithOrders.orders[0].image.alt} // Use the product name from the first order
                      />

                    </div>
                    <div className="flex flex-col gap-2 py-1">
                      <div className="text-xs text-black/60">
                        <p className="cla line-clamp-1">{productWithOrders.orders[0].name}</p>
                        <p className="text-">GHc{productWithOrders.orders[0].price}</p>
                      </div>
                      <div className="flex justify-center items-center gap-2 text-xs text-black/60">
                        <p className="flex flex-col items-center justify-center text-center">
                          <span>
                            Min Order Quantity
                          </span>
                          <span className="text-black text-xl font-semibold">{productWithOrders.orders[0].moq ? `${productWithOrders.orders[0].moq}` : "1"}</span></p>
                        <span className="h-6 w-[1px] bg-black/10">
                        </span>
                        <p className="flex flex-col items-center justify-center text-center">
                          <span>Ordered Quantity</span>
                          <span className="text-black text-xl font-semibold">{productWithOrders.orders.reduce((totalQuantity, order) => totalQuantity + order.quantity, 0)}</span></p>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-[#f1f1f1]">
                <div className="flex flex-col gap-4 mx-4 pb-4 sticky top-0">
                <div className="flex gap-4">
                  <div className="relative w-[25vw] pt-[20%] md:w-[12vw] lg:w-[8vw] xl:w-[6vw]">
                    <Image
                      className="absolute w-full h-full top-0 left-0 object-cover rounded-lg"
                      src={productWithOrders.orders[0].image.src} // Render the first order's image
                      width={60}
                      height={80}
                      alt={productWithOrders.orders[0].image.alt} // Use the product name from the first order
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-1">
                    <div className="text-xs text-black/60">
                      <p className="cla line-clamp-1">{productWithOrders.orders[0].name}</p>
                      <p className="text-">GHc{productWithOrders.orders[0].price}</p>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-xs text-black/60">
                      <p className="flex flex-col items-center justify-center text-center">
                        <span>
                          Min Order Quantity
                        </span>
                        <span className="text-black text-xl font-semibold">{productWithOrders.orders[0].moq ? `${productWithOrders.orders[0].moq}` : "1"}</span></p>
                      <span className="h-6 w-[1px] bg-black/10">

                      </span>
                      <p className="flex flex-col items-center justify-center text-center">
                        <span>Ordered Quantity</span>
                        <span className="text-black text-xl font-semibold">{productWithOrders.orders.reduce((totalQuantity, order) => totalQuantity + order.quantity, 0)}</span></p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <button className="flex justify-between items-center w-full bg-white p-3 rounded-lg" onClick={() => copyToClipboard(productWithOrders)}>
                    <span>Copy Order Message</span>
                    <span>
                      <TbCopy className="text-2xl" />
                    </span>
                  </button>
                </div>
              </div>
              <Separator className="bg-[#101010]/10 h-px" />
              <div className="flex flex-col mx-4 pb-8 pt-4 max-h-[40vh] overflow-auto">
                <div className="flex flex-col justify-center items-start">
                  <span className="text-xs font-semibold self-start mb-2">Order(s)</span>
                  <div>
                      <ul>
                        {productWithOrders.orders.map((order, index) => (
                          <li key={index}>
                            <p className="text-xs">{order.buyerName ? `${order.buyerName},` : ""} {order.quantity ? `${order.quantity},` : ""} {order.variations.Color ? `${order.variations.Color},` : ""} {order.variations.Size ? `${order.variations.Size},` : "..."} {order.paid ? "✅" : ""}</p>
                            {/* <p>Quantity: {order.quantity}</p> */}
                            {/* <p>Color: {order.variations.Color}, {order.variations.size}</p> */}
                            {/* <p>Size: {order.variations.size}</p> */}
                            {/* <p>Date: {order.timestamp.toTime().toLocaleTimeString()}</p> TODO: Display only time*/}
                          </li>
                        ))}
                      </ul>
                    </div>
                </div>
              </div>
                </DialogContent>
              </div>

            </Dialog>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center m-2">
        <Tabs defaultValue="week">
          <TabsList className="bg-[#f1f1f1]">
            <TabsTrigger value="week" onClick={() => setSelectedTab("week")}>Week</TabsTrigger>
            <TabsTrigger value="month" onClick={() => setSelectedTab("month")}>Month</TabsTrigger>
            <TabsTrigger value="year" onClick={() => setSelectedTab("year")}>Year</TabsTrigger>
          </TabsList>
        </Tabs>
        <button className="font-medium flex text-sm justify-center items-center gap-2 py-1 px-3 rounded-md border border-slate-200">
          <span>
            <BsFilter className="text-lg" />
          </span>
          <span className="md:block hidden">Filter</span>
        </button>
      </div>
      <div className="flex flex-col border border-slate-200 mx-2 mb-12 rounded-lg p-4 divide-y divide-solid">
        {filteredOrders.map((productWithOrders) => (
          <Drawer open={openStates[productWithOrders.productId]} onOpenChange={() => toggleOpenState(productWithOrders.productId)} key={productWithOrders.productId}>
            <div className="flex items-center justify-between gap-2 hover:bg-[#f1f1f1]">
              <DrawerTrigger asChild>
                <div className="flex gap-4 items-start w-full py-4">
                  <div>
                    <Image
                      className="h-24 w-24 rounded-md object-cover"
                      src={productWithOrders.orders[0].image.src} // Render the first order's image
                      width={60}
                      height={80}
                      alt={productWithOrders.orders[0].image.alt} // Use the product name from the first order
                    />

                  </div>
                  <div className="flex flex-col gap-2 py-1">
                    <div className="text-xs text-black/60">
                      <p className="cla line-clamp-1">{productWithOrders.orders[0].name}</p>
                      <p className="text-">GHc{productWithOrders.orders[0].price}</p>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-xs text-black/60">
                      <p className="flex flex-col items-center justify-center text-center">
                        <span>
                          Min Order Quantity
                        </span>
                        <span className="text-black text-xl font-semibold">{productWithOrders.orders[0].moq ? `${productWithOrders.orders[0].moq}` : "1"}</span></p>
                      <span className="h-6 w-[1px] bg-black/10">

                      </span>
                      <p className="flex flex-col items-center justify-center text-center">
                        <span>Ordered Quantity</span>
                        <span className="text-black text-xl font-semibold">{productWithOrders.orders.reduce((totalQuantity, order) => totalQuantity + order.quantity, 0)}</span></p>
                    </div>
                  </div>
                </div>
              </DrawerTrigger>
            </div>
            <DrawerContent className="bg-[#f1f1f1]">
              <div className="flex flex-col gap-4 mx-4 pb-4 sticky top-0">
                <div className="flex gap-4">
                  <div className="relative w-[25vw] pt-[20%]">
                    <Image
                      className="absolute w-full h-full top-0 left-0 object-cover rounded-lg"
                      src={productWithOrders.orders[0].image.src} // Render the first order's image
                      width={60}
                      height={80}
                      alt={productWithOrders.orders[0].image.alt} // Use the product name from the first order
                    />
                  </div>
                  <div className="flex flex-col gap-2 py-1">
                    <div className="text-xs text-black/60">
                      <p className="cla line-clamp-1">{productWithOrders.orders[0].name}</p>
                      <p className="text-">GHc{productWithOrders.orders[0].price}</p>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-xs text-black/60">
                      <p className="flex flex-col items-center justify-center text-center">
                        <span>
                          Min Order Quantity
                        </span>
                        <span className="text-black text-xl font-semibold">{productWithOrders.orders[0].moq ? `${productWithOrders.orders[0].moq}` : "1"}</span></p>
                      <span className="h-6 w-[1px] bg-black/10">

                      </span>
                      <p className="flex flex-col items-center justify-center text-center">
                        <span>Ordered Quantity</span>
                        <span className="text-black text-xl font-semibold">{productWithOrders.orders.reduce((totalQuantity, order) => totalQuantity + order.quantity, 0)}</span></p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <button className="flex justify-between items-center w-full bg-white p-3 rounded-lg" onClick={() => copyToClipboard(productWithOrders)}>
                    <span>Copy Order Message</span>
                    <span>
                      <TbCopy className="text-2xl" />
                    </span>
                  </button>
                </div>
              </div>
              <Separator className="bg-[#101010]/10 h-px" />
              <div className="flex flex-col mx-4 pb-8 pt-4 max-h-[40vh] overflow-auto">
                <div className="flex flex-col justify-center items-start">
                  <span className="text-xs font-semibold self-start mb-2">Order(s)</span>
                  <div>
                      <ul>
                        {productWithOrders.orders.map((order, index) => (
                          <li key={index}>
                            <p className="text-xs">{order.buyerName ? `${order.buyerName},` : ""} {order.quantity ? `${order.quantity},` : ""} {order.variations.Color ? `${order.variations.Color},` : ""} {order.variations.Size ? `${order.variations.Size},` : "..."} {order.paid ? "✅" : ""}</p>
                            {/* <p>Quantity: {order.quantity}</p> */}
                            {/* <p>Color: {order.variations.Color}, {order.variations.size}</p> */}
                            {/* <p>Size: {order.variations.size}</p> */}
                            {/* <p>Date: {order.timestamp.toTime().toLocaleTimeString()}</p> TODO: Display only time*/}
                          </li>
                        ))}
                      </ul>
                    </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </>
  )
}

export default ProductsWithOrders;