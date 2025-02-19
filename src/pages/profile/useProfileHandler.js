import { useDispatch } from "react-redux";
import { postAddress } from "../../features/address/addressSlice";
import { useState } from "react";
import useAddressContext from "../../contexts/AddressContext";
import { setMessage } from "../../features/product/productSlice";

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

  const handlePostAddress = async () => {
    try {
      const result = await dispatch(postAddress(formData)).unwrap();
      if (result) {
        dispatch(
          setMessage({
            show: true,
            message: "Address added successfully",
            type: "success",
          })
        );

        handleModalClose();

        setTimeout(() => {
          dispatch(
            setMessage({
              show: false,
              message: "",
              type: "warning",
            })
          );
        }, 3000);
      }
    } catch (error) {
      dispatch(
        setMessage({
          show: true,
          message: "Failed to add address",
          type: "warning",
        })
      );
    }
  };

  return {
    showEditModal,
    handleEditClick,
    handleModalClose,
    handlePostAddress,
  };
}
