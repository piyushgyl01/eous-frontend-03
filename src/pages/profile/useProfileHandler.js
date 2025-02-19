import { useDispatch } from "react-redux";
import { postAddress } from "../../features/address/addressSlice";
import {  useState } from "react";
import useAddressContext from "../../contexts/AddressContext";

export default function useProfileHandler() {
  const { formData, setFormData } = useAddressContext();
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setShowEditModal(true);
  };
  const handleModalClose = () => {
    setShowEditModal(false);
    setFormData({
      firstName: "",
      lastName: "",
      country: "",
      street: "",
      town: "",
      province: "",
      zip: 0,
      phoneNumber: 0,
      email: "",
    });
  };

  const handlePostAddress = () => {
    dispatch(postAddress(formData));
    handleModalClose();
  };

  return {
    showEditModal,
    handleEditClick,
    handleModalClose,
    handlePostAddress,
  };
}
