"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getSubcollectionData, updateFirestoreField } from "@/utils/functions";
import { GoLinkExternal } from "react-icons/go";
import { BsToggles2 } from "react-icons/bs";
import { IoIosThumbsUp } from "react-icons/io";
import { IoIosThumbsDown } from "react-icons/io";
import { BiLogoWhatsapp } from "react-icons/bi";
import { MdLocalPhone } from "react-icons/md";
import { Separator } from "../../components/ui/separator";
import useSWR from "swr";
import { getOrdersForVisitor } from "@/utils/functions";
import { RiShip2Line } from "react-icons/ri";

export default function Customer({ customer, customerOrders }) {
  console.log(customerOrders);

  function parseCustomDate(date) {
    try {
      if (date && date.seconds && date.nanoseconds !== undefined) {
        // Firestore timestamp format
        const milliseconds = date.seconds * 1000 + date.nanoseconds / 1e6;
        return new Date(milliseconds);
      } else {
        throw new Error("Invalid date format");
      }
    } catch (error) {
      console.error(`Error parsing date: ${error.message}`);
      return null; // Return null or another default value in case of error
    }
  }
  const firstVisit = parseCustomDate(customer.firstVisitOn);
  if (!customer) {
    return (
      <div className="flex h-[80vh] justify-center items-center mx-8 text-sm text-center">
        <p>This customer does not exit...</p>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/+233${
    customer.phone
  }/?text=${`Hello, ${customer.name}`}`;

  return (
    <>
      <div className="flex flex-col justify-center items-center px-2 bg-gray-100 py-4">
        <div className="">
          <Image
            src={"/avatar.png"}
            className="w-24 h-full rounded-full object-cover"
            width={500}
            height={500}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center text-sm">
          <h1 className="text-lg font-medium mb-2">{customer.name}</h1>
          {firstVisit && (
            <p className="text-gray-400">
              Since: {firstVisit.toLocaleDateString()}{" "}
              {firstVisit.toLocaleTimeString()}
            </p>
          )}
          <p className="text-gray-400">Location: {customer.location}</p>
          <div className="flex items-center gap-3 mt-4">
            <Link
              href={`${whatsappUrl}`}
              target="_blank"
              className="flex gap-1 flex-col items-center"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex justify-center items-center">
                <span>
                  <BiLogoWhatsapp className="text-2xl text-white" />
                </span>
              </div>
              <span className="text-xs text-gray-400">WhatsApp</span>
            </Link>
            <Link
              href={`tel:+233${customer.phone}`}
              className="flex gap-1 flex-col items-center"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex justify-center items-center">
                <span>
                  <MdLocalPhone className="text-2xl text-white" />
                </span>
              </div>
              <span className="text-xs text-gray-400">Call</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="px-2 mt-2">
        <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Orders({customerOrders.length})</h1>
        </div>
        <div className="flex flex-col text-sm overflow-auto  justify-center items-center">
          {/* <p>Products this person ordered will appear here.</p> */}
          {customerOrders.map((item) => (
            <div className="flex w-full p-2 my-2 gap-4 bg-gray-100 mx-2 rounded-md">
              {item.image && (
                <div className="relative w-[25%] md:w-[20%] pt-[20%] object-cover md:pt-[20%]">
                  <Image
                    className="absolute w-full h-full top-0 left-0 object-cover rounded-sm"
                    src={item.image.src}
                    width={500}
                    height={500}
                    alt=""
                  />
                </div>
              )}
              <div className="w-full">
                <div className="flex flex-col gap-2 text-sm">
              {item.isFreeShipping && (
                <div className="flex items-center gap-1 text-[#fff] text-xs bg-red-600 w-full rounded-sm px-1">
                  <p className="text-white">
                    {item.isFreeShipping ? `Free shipping` : ""}
                  </p>
                </div>
              )}
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <p href={`/${item.productId}`}>{item.name}</p>
                      <p className="font-semibold">
                        <span className="text-xs">GHc</span>
                        {item.price}
                      </p>
                    </div>
                  </div>

                  {item.variations &&
                    Object.keys(item.variations).length > 0 && (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {Object.entries(item.variations).map(
                          ([type, value]) => (
                            <p key={type}>
                              <span style={{ fontWeight: "600" }}>{type}:</span>{" "}
                              {value}
                            </p>
                          )
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Separator />
      </div>
      {/* <div className="px-2 mt-2">
        <h1 className="text-lg font-semibold">Browser history</h1>
        <div className="flex flex-col text-sm h-[30vh] justify-center items-center">
          <p>Products this person view will appear here.</p>
          <p>Working on it...</p>
        </div>
      </div> */}
    </>
  );
}

// const BagItem = ({ item }) => (
//   {item.map((order) => (

//   ))}
// );
