"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { updateFirestoreField } from "@/utils/functions";
import { GoLinkExternal } from "react-icons/go";
import { BsToggles2 } from "react-icons/bs";
import { IoIosThumbsUp } from "react-icons/io";
import { IoIosThumbsDown } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoChevronUpOutline } from "react-icons/io5";

export default function Customers({ visitorsWithOrders }) {
  const [customers, setCustomers] = useState(visitorsWithOrders);
  const [showMore, setShowMore] = useState(false);

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  const updateCustomerState = (customerId, field, value) => {
    // Find the customer in the state array and update the specified field
    const updatedCustomers = customers.map((customer) =>
      customer.id === customerId ? { ...customer, [field]: value } : customer
    );

    // Update the state with the new array
    setCustomers(updatedCustomers);
  };

  if (!visitorsWithOrders) {
    return (
      <div className="flex h-[80vh] justify-center items-center mx-8 text-sm text-center">
        <p>Visitors who have ordered will appear here. Working on it...</p>
      </div>
    );
  }

  return (
    <>
    {/* <div className="flex flex-col justify-center mt-2 mb-4 mx-2">
        <div className="flex items-center gap-2">
        <button onClick={handleMoreClick} className="text-left">Visitors who ordered <span></span> </button>
        <span>{showMore ? <IoChevronUpOutline className="text-xl" /> : <IoChevronDownOutline className="text-xl" />}</span>

        </div>
        {showMore && (
          <p className="text-xs text-gray-500">
            These visitors clicked on the proceed to WhatsApp button after checking out. It may not
            mean that they sent the confirmation message to your DM. If an order is not confirmed or paid, go to more details and contact the customer.
          </p>
        )}
      </div> */}
       <div className="p-2">
                <h1 className="text-3xl font-bold capitalize">Customers</h1>
            </div>
      <div className="flex h-[60vh] justify-center items-center mx-8 text-sm text-center">
        <p>Visitors who have ordered will appear here. <span className="block">Coming soon...</span></p>
      </div>
      {/* {customers.map((customer) => (
        <div key={customer.id}>
          {customer.name != "" ? (
            <CustomerCard
              customer={customer}
              updateCustomerState={updateCustomerState}
            />
          ) : (
            ""
          )}
        </div>
      ))} */}
    </>
  );
}

function CustomerCard({ customer, updateCustomerState }) {


  return (
      
      <div className="bg-gray-100 rounded-b-lg mt-2">
        <div className="flex gap-3 relative justify-start items-start p-2">
          <Link
            href={`/customers/${customer.id}`}
            className="mx-2 border bg-blue-600 rounded-md p-1 flex gap-2 justify-center items-center text-white absolute right-0"
          >
            <GoLinkExternal className="text-sm" />
            <span className="text-xs">More details</span>
          </Link>
          <div className="">
            <Image
              src={"/avatar.png"}
              className="w-24 h-full rounded-full object-cover"
              width={500}
              height={500}
              alt=""
            />
          </div>
          <div className="flex flex-col text-sm">
            <p className="text-lg mb-2 font-medium">{customer.name}</p>
            <div className="mb-2">
              <p>Location: {customer.location}</p>
              <p>Phone: {customer.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <span>Confirmed: </span>{" "}
              {customer.confirmed ? (
                <div className="flex gap-1 items-center">
                  <span>Yes</span>{" "}
                  <span>
                    <IoIosThumbsUp className="text-lg text-green-500" />
                  </span>
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <span>No</span>{" "}
                  <span>
                    <IoIosThumbsDown className="text-lg text-red-500" />
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span>Paid: </span>{" "}
              {customer.paid ? (
                <div className="flex gap-1 items-center">
                  <span>Yes</span>{" "}
                  <span>
                    <IoIosThumbsUp className="text-lg text-green-500" />
                  </span>
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <span>No</span>{" "}
                  <span>
                    <IoIosThumbsDown className="text-lg text-red-500" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 bg-gray-300 flex flex-col items-start rounded-b-lg">
          <EditPanel
            customer={customer}
            updateCustomerState={updateCustomerState}
          />
        </div>
      </div>
  );
}

function EditPanel({ customer, updateCustomerState }) {
  const { id, name, confirmed, paid } = customer;
  const [isConfirmed, setIsConfirmed] = useState(confirmed);
  const [isPaid, setIsPaid] = useState(paid);

  const handleToggleConfirmed = () => {
    setIsConfirmed(!isConfirmed);
    updateFirestoreField(id, "confirmed", !isConfirmed);
    updateCustomerState(id, "confirmed", !isConfirmed);
  };

  const handleTogglePaid = () => {
    setIsPaid(!isPaid);
    updateFirestoreField(id, "paid", !isPaid);
    updateCustomerState(id, "paid", !isPaid);
  };

  return (
    <div className="flex gap-3 px-2 py-2 justify-center">
      <p>
        <button
          onClick={handleToggleConfirmed}
          className="flex items-center gap-2 bg-black text-white py-1 px-2 rounded-lg"
        >
          <span className="text-sm">Confirmed</span>
          <span>
            <BsToggles2 className="text-base" />
          </span>
        </button>
      </p>
      <br />
      <p>
        <button
          onClick={handleTogglePaid}
          className="flex items-center gap-2 bg-black text-white py-1 px-2 rounded-lg"
        >
          <span className="text-sm">Paid</span>
          <span>
            <BsToggles2 className="text-base" />
          </span>
        </button>
      </p>
    </div>
  );
}
