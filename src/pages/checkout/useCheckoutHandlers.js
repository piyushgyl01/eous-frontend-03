import {
  deleteAddress,
  getAllAddressStatuses,
  updateAddress,
} from "../../features/address/addressSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setMessage } from "../../features/product/productSlice";
import useAddressContext from "../../contexts/AddressContext";

export default function useCheckoutHandlers() {
  const {formData, setFormData} = useAddressContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

  const dispatch = useDispatch();

  const handleAddressSelect = (address) => {
    setSelectedAddress(address._id);
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      country: address.country,
      street: address.street,
      town: address.town,
      province: address.province,
      zip: address.zip,
      phoneNumber: address.phoneNumber,
      email: address.email,
    });
  };
  const handleEditClick = (address) => {
    setFormData(address);
    setEditAddressId(address._id);
    setShowEditModal(true);
  };
  const handleModalClose = () => {
    setShowEditModal(false);
    setEditAddressId(null);
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

  const { fetchStatus, deleteStatus, updateStatus, addStatus } = useSelector(
    getAllAddressStatuses
  );
  useEffect(() => {
    if (deleteStatus === "success") {
      dispatch(
        setMessage({
          show: true,
          message: "Address deleted successfully",
          type: "success",
        })
      );

      const timer = setTimeout(() => {
        dispatch(setMessage({ show: false, message: "", type: "warning" }));
      }, 3000);

      return () => clearTimeout(timer);
    } else if (deleteStatus === "error") {
      dispatch(
        setMessage({
          show: true,
          message: "Unable to delete the address",
          type: "warning",
        })
      );
    }
  }, [deleteStatus]);

  //DELETE ADDRESS NOTIFICATION EFFECT
  useEffect(() => {
    if (updateStatus === "success") {
      dispatch(
        setMessage({
          show: true,
          message: "Address updated successfully",
          type: "success",
        })
      );

      const timer = setTimeout(() => {
        dispatch(setMessage({ show: false, message: "", type: "warning" }));
      }, 3000);

      return () => clearTimeout(timer);
    } else if (updateStatus === "error") {
      dispatch(
        setMessage({
          show: true,
          message: "Unable to update the address",
          type: "warning",
        })
      );
    }
  }, [updateStatus]);

  //HANDLE DELETE FUNCTION
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (isConfirmed) {
      dispatch(deleteAddress(id));
    }
  };

  //HANDLE UPDATE FUNCTION
  const handleUpdate = () => {
    dispatch(updateAddress({ id: editAddressId, formData }));
    handleModalClose();
  };
  return {
    handleDelete,
    handleUpdate,
    selectedAddress,
    showEditModal,
    editAddressId,
    handleAddressSelect,
    handleEditClick,
    handleModalClose,
  };
}
