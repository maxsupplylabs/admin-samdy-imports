'use client'
import React, { useEffect, useState } from "react";
import { getSubcollectionDocuments } from "@/utils/functions";
import Image from "next/image";

// SearchInput component
const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search by product name"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="px-4 text-lg py-3 border border-gray-300 rounded-sm focus:outline-none w-full mb-4"
  />
);

// OrderList component
const OrderList = ({ lists, emptyHeading }) => (
  <div>
    {lists.length === 0 ? (
      <p className="text-gray-600">{emptyHeading}</p>
    ) : (
      lists.map((order) => (
        <div key={order.id} className="mb-6 border-b pb-6">
            <div className="flex gap-2">
            <div>
            <Image src={order.image.src} alt={order.name} className="w-16 h-16 object-cover rounded-sm" width={500} height={500}/>    
            </div>
            <div className="text-sm">

          <h2 className="">{order.name}</h2>
          <p className="text-gray-600">Quantity: {order.quantity}</p>
          <p className="text-gray-600">Price: GHC {order.price}</p>
            </div>

            </div>

          {order.variations && (
            <div className="mt-2 text-sm">
              {/* <p className="text-lg font-semibold">Variations:</p> */}
              <ul className="list-disc pl-4">
                {Object.keys(order.variations).map((key) => (
                  <li key={key} className="text-gray-600">
                    <span className="font-semibold">{key}:</span> {order.variations[key]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))
    )}
  </div>
);

// SearchableOrderList component
const SearchableOrderList = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribeAllOrders = getSubcollectionDocuments("orders", (orders) => {
      setAllOrders(orders);
      filterOrders(orders, searchTerm);
    });

    return () => {
      unsubscribeAllOrders();
    };
  }, [searchTerm]);

  const filterOrders = (orders, term) => {
    const filtered = orders.filter((order) =>
      order.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleSearch = () => {
    filterOrders(allOrders, searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    filterOrders(allOrders, "");
  };

  return (
    <div className="container mx-auto px-2">
        <div className="sticky top-20 bg-white pt-3">
      <SearchInput value={searchTerm} onChange={setSearchTerm} />

        </div>
      <OrderList
        lists={filteredOrders}
        emptyHeading={`No matches for "${searchTerm}"`}
      />
    </div>
  );
};

export default SearchableOrderList;
