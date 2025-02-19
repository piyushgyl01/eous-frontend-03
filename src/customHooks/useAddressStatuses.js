import { useSelector } from "react-redux";
import { getAllAddressStatuses } from "../features/address/addressSlice";

export default function useAddressStatuses() {
  const { fetchStatus, addStatus, deleteStatus, updateStatus } = useSelector(
    getAllAddressStatuses
  );

  return { fetchStatus, addStatus, deleteStatus, updateStatus };
}
