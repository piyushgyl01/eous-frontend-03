import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrders, getAllOrders } from "../../features/order/orderSlice";
import { useEffect } from "react";

export default function useOrders() {
  const dispatch = useDispatch();

  const orders = useSelector(getAllOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return orders;
}
