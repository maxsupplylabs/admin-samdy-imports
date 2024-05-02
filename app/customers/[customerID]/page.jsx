import React from "react";
import { fetchDocumentFromFirestore } from "@/utils/functions";
import Customer from "@/components/admin/customer-single";
import { getSubcollectionData } from "@/utils/functions"


const page = async ({ params }) => {
  const { customerID } = params;
  const customer = await fetchDocumentFromFirestore('visitors', customerID );
  const customerOrders = await getSubcollectionData("visitors", customerID, "orders")
  return (
    <div className="max-w-lg mx-auto md:border-x">
        <Customer customer={customer} customerOrders={customerOrders} />
    </div>
  );
};
export default page;
