import {
  deleteAddress,
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
  const dispatch = useDispatch();

  const addresses = useSelector(getAllAddresses);
  
  useEffect(() => {
    const handleUpdateSuccess = (updatedAddressId) => {
      setSelectedAddress(updatedAddressId);
      
      const updatedAddress = addresses.find(addr => addr._id === updatedAddressId);
      
      if (updatedAddress) {
        setFormData({
          firstName: updatedAddress.firstName,
          lastName: updatedAddress.lastName,
          country: updatedAddress.country,
          street: updatedAddress.street,
          town: updatedAddress.town,
          province: updatedAddress.province,
          zip: updatedAddress.zip,
          phoneNumber: updatedAddress.phoneNumber,
          email: updatedAddress.email,
        });
      }
      
      dispatch(
        setMessage({
          show: true,
          message: "Address updated successfully",
          type: "success",
        })
      );

      setTimeout(() => {
        dispatch(setMessage({ show: false, message: "", type: "warning" }));
      }, 3000);
    };

    const updateAddressHandler = async (id, formData) => {
      try {
        await dispatch(updateAddress({ id, formData })).unwrap();
        handleUpdateSuccess(id);
      } catch (error) {
        dispatch(
          setMessage({
            show: true,
            message: "Unable to update the address",
            type: "warning",
          })
        );
      }
    };

    window.updateAddressHandler = updateAddressHandler;

    return () => {
      delete window.updateAddressHandler;
    };
  }, [addresses, dispatch, setFormData]);

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
        resetFormData();
      }
    } else {
      resetFormData();
    }
  };
  
  const resetFormData = () => {
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
  
  useEffect(() => {
    const deleteHandler = async (id) => {
      try {
        await dispatch(deleteAddress(id)).unwrap();
        
        dispatch(
          setMessage({
            show: true,
            message: "Address deleted successfully",
            type: "success",
          })
        );

        if (selectedAddress === id) {
          setSelectedAddress(null);
          resetFormData();
        }

        setTimeout(() => {
          dispatch(setMessage({ show: false, message: "", type: "warning" }));
        }, 3000);
      } catch (error) {
        dispatch(
          setMessage({
            show: true,
            message: "Unable to delete the address",
            type: "warning",
          })
        );
      }
    };

    window.deleteHandler = deleteHandler;
    
    return () => {
      delete window.deleteHandler;
    };
  }, [dispatch, selectedAddress, setFormData]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (isConfirmed) {
      window.deleteHandler(id);
    }
  };

  const handleUpdate = () => {
    window.updateAddressHandler(editAddressId, formData);
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