"use client"
import Link from "next/link";
import * as React from "react";
import { clsx } from "clsx";
import { usePathname } from 'next/navigation'

export default function AdminHeader() {
  const pathname = usePathname()

  // Function to determine if a link is active
  const isActive = (href) => {
    return pathname === href;
  };
  return (
    <div className="bg-white flex flex-col">
      <div className="px-2 flex justify-between items-center py-2 md:w-[98%] md:m-auto">
        <div className="flex flex-col items-center gap-1">
          <Link
            href={"/"}
            className={clsx(
              //   lusitana.className,
              "flex text-lg font-semibold uppercase md:text-xl"
            )}
          >
            Samdy Administration
          </Link>
        </div>
        <Link
            href={"/docs"}
            className={clsx(
              "md:text-xl underline"
            )}
          >
            Docs
          </Link>
      </div>
      <div>
        <div className="flex justify-normal overflow-auto shadow-lg px-2 sticky top-[2.5rem] md:top-[85px] z-50 bg-white py-1 gap-4">
        <Link
            href={"/"}
            className={clsx(
              "min-w-max h-min py-1 px-2",
              { 'bg-[#f1f1f7] rounded-md': isActive('/') } // Apply different border color if active
            )}
          >
            Dashboard
          </Link>
          <Link
            href={"/add-product"}
            className={clsx(
              "min-w-max h-min py-1 px-2",
              { 'bg-[#f1f1f7] rounded-md': isActive('/add-product') } // Apply different border color if active
            )}
          >
            Add product
          </Link>
          <Link
            href={"/add-collection"}
            className={clsx(
              "min-w-max h-min py-1 px-2",
              { 'bg-[#f1f1f7] rounded-md': isActive('/add-collection') } // Apply different border color if active
            )}
          >
            Create collection
          </Link>
          <Link
            href={"/customers"}
            className={clsx(
              "min-w-max h-min py-1 px-2",
              { 'bg-[#f1f1f7] rounded-md': isActive('/customers') } // Apply different border color if active
            )}
          >
            Customers
          </Link>
          {/* <Link
            href={"/orders"}
            className={clsx(
              "min-w-max h-min py-1 px-2",
              { 'bg-[#f1f1f7] rounded-md': isActive('/orders') } // Apply different border color if active
            )}
          >
            Orders
          </Link> */}

          
          <Link
            href={"/products"}
            className={clsx(
              "min-w-max h-min py-1 px-2",
              { 'bg-[#f1f1f7] rounded-md': isActive('/products') } // Apply different border color if active
            )}
          >
            All products
          </Link>
          
          <Link
            href={"/collections"}
            className={clsx(
              "min-w-max h-min py-1 px-2",
              { 'bg-[#f1f1f7] rounded-md': isActive('/collections') } // Apply different border color if active
            )}
          >
            All collections
          </Link>

        </div>
      </div>
    </div>
  );
}