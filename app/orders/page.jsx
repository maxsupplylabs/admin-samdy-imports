"use client"
import ProductsWithOrders from "@/components/admin/productsWithOrders"
const ProductOrders = () => {

  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      <div className="p-2">
      <h1 className="text-3xl font-semibold capitalize">Your orders</h1>
      </div>
      <ProductsWithOrders />
    </div>
  );
};
export default ProductOrders;