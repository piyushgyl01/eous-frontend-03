import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrders, getAllOrders } from "../../features/order/orderSlice";
import { useEffect } from "react";

export default function useOrders() {
  const dispatch = useDispatch();

  const orders = useSelector(getAllOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const sortedOrders = [...orders].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return {orders: sortedOrders};
}
