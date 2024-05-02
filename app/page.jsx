"use client";
import * as React from "react";
import { useVisitors } from '@/hooks/useAllVisitors';
import { useNumberOfEnquiries } from '@/hooks/useNumberOfEnquiries';
import { useAllOrders } from '@/hooks/useAllOrders';
import { useNumberOfDBTBVisitors }  from '@/hooks/useDontBreakTheBankVisitors';


export default function Page() {

  const { visitors, isLoading: visitorsLoading, isError: visitorsError } = useVisitors();
  const { numberOfEnquiries, isLoading: enquiriesLoading, isError: enquiriesError } = useNumberOfEnquiries();
  const { allOrders, isLoading: allOrdersLoading, isError: allOrdersError } = useAllOrders();
  const { numberOfDBTBVisitors, isLoading: numberOfDBTBVisitorsisLoading, isError: numberOfDBTBVisitorsError } = useNumberOfDBTBVisitors();

  if (visitorsLoading || enquiriesLoading || allOrdersLoading || numberOfDBTBVisitorsisLoading) {
    return <div>Loading...</div>;
  }

  if (visitorsError || enquiriesError || allOrdersError || numberOfDBTBVisitorsError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center mt-8 mx-2 overflow-hidden">
        <div className="flex flex-col gap-4 justify-cente items-cente">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col justify-center items-center gap-4 border rounded-lg px-6 py-2">
              <p className="opacity-30">Visitors</p>
              <span className="text-4xl font-semibold">{visitors.length}</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 border rounded-lg px-6 py-2">
              <p className="opacity-30">Enquiries</p>
              <span className="text-4xl font-semibold">
                {numberOfEnquiries}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 border rounded-lg px-6 py-2">
              <p className="opacity-30">Orders</p>
              <span className="text-4xl font-semibold">{allOrders.length}</span>
            </div>
            
            {/* <div className="flex flex-col justify-center items-center gap-4 border rounded-lg px-6 py-2">
              <div className="flex items-center flex-col">
                <p className="opacity-30">DBTB</p>
                <span className="text-xs opacity-30">Collection</span>
              </div>
              <span className="text-4xl font-semibold">
                {numberOfDBTBVisitors}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
