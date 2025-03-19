import {
  deleteAddress,
  getAllAddressStatuses,
  updateAddress,
  getAllAddresses,
} from "../../features/address/addressSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setMessage } from "../../features/product/productSlice";
import useAddressContext from "../../contexts/AddressContext";

export default function useCheckoutHandlers() {
  const { formData, setFormData } = useAddressContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [addressBeingUpdated, setAddressBeingUpdated] = useState(null);

  const dispatch = useDispatch();

  const addresses = useSelector(getAllAddresses);
  
  const { deleteStatus, updateStatus } = useSelector(getAllAddressStatuses);

  useEffect(() => {
    if (updateStatus === "success" && addressBeingUpdated) {
      setSelectedAddress(addressBeingUpdated);
      setAddressBeingUpdated(null);
      
      dispatch(
        setMessage({
          show: true,
          message: "Address updated successfully",
          type: "success",
        })
      );

      // Clear message after delay
      setTimeout(() => {
        dispatch(setMessage({ show: false, message: "", type: "warning" }));
      }, 3000);
    } else if (updateStatus === "error") {
      setAddressBeingUpdated(null);
      dispatch(
        setMessage({
          show: true,
          message: "Unable to update the address",
          type: "warning",
        })
      );
    }
  }, [updateStatus, addressBeingUpdated, dispatch]);

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
    setFormData({...address});
    setEditAddressId(address._id);
    setShowEditModal(true);
  };
  
  const handleModalClose = () => {
    setShowEditModal(false);
    setEditAddressId(null);
    
    if (selectedAddress) {
      const currentAddress = addresses.find(addr => addr._id === selectedAddress);
      if (currentAddress) {
        setFormData({...currentAddress});
      } else {
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
      }
    } else {
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
    }
  };
  
  useEffect(() => {
    if (deleteStatus === "success") {
      dispatch(
        setMessage({
          show: true,
          message: "Address deleted successfully",
          type: "success",
        })
      );

      if (selectedAddress === editAddressId) {
        setSelectedAddress(null);
        
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
      }

      setTimeout(() => {
        dispatch(setMessage({ show: false, message: "", type: "warning" }));
      }, 3000);
    } else if (deleteStatus === "error") {
      dispatch(
        setMessage({
          show: true,
          message: "Unable to delete the address",
          type: "warning",
        })
      );
    }
  }, [deleteStatus, dispatch, editAddressId, selectedAddress, setFormData]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (isConfirmed) {
      if (selectedAddress === id) {
        setSelectedAddress(null);
      }
      dispatch(deleteAddress(id));
    }
  };

  const handleUpdate = () => {
    setAddressBeingUpdated(editAddressId);
    
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