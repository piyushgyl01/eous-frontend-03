import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllAddresses,
  getAllAddresses,
} from "../../features/address/addressSlice";

export default function useAddress() {
  const dispatch = useDispatch();

  const addresses = useSelector(getAllAddresses);

  //DISPATCHING API CALL
  useEffect(() => {
    dispatch(fetchAllAddresses());
  }, [dispatch]);

  return addresses;
}
