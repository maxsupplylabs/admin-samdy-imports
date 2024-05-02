"use client"
import Customers from '@/components/admin/customers';
import { useVisitorsWithOrders } from '@/hooks/useVisitorsWithOrders';

export default function Page() {
  const { visitors, isLoading, isError } = useVisitorsWithOrders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
      <div className="grid md:grid-cols-2 gap-4 md:max-w-[90%] mx-2 md:mx-auto">
        <Customers visitorsWithOrders={visitors} />
      </div>
  );
}
