import { useSelector } from "react-redux";
import { getAllOrdersStatuses } from "../features/order/orderSlice";

export default function useOrderStatuses() {
  const { fetchStatus, addOrderStatus } = useSelector(getAllOrdersStatuses);

  return { fetchStatus, addOrderStatus };
}
