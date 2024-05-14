import useSWR from 'swr';
import { getAllOrders, fetchProductsWithOrders } from '@/utils/functions';

export function useAllOrders() {
  const { data, error } = useSWR('allOrders', getAllOrders);

  return {
    allOrders: data,
    isLoading: !error && !data,
    isError: error,
  };
}


export function useAllOrderedProducts() {
  const { data, error } = useSWR('orderedProducts', fetchProductsWithOrders);

  return {
    orderedProducts: data,
    isLoading: !error && !data,
    isError: error,
  };
}

