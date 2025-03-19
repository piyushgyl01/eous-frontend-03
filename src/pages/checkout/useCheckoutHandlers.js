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
    if (selectedAddress) {
      const currentAddress = addresses.find(addr => addr._id === selectedAddress);
      if (currentAddress) {
        setFormData({
          firstName: currentAddress.firstName,
          lastName: currentAddress.lastName,
          country: currentAddress.country,
          street: currentAddress.street,
          town: currentAddress.town,
          province: currentAddress.province,
          zip: currentAddress.zip,
          phoneNumber: currentAddress.phoneNumber,
          email: currentAddress.email,
        });
      }
    }
  }, [addresses, selectedAddress, setFormData]);

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
    let isMounted = true;
    
    const handleDeleteEffect = async (id) => {
      try {
        await dispatch(deleteAddress(id)).unwrap();
        
        if (isMounted) {
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
            if (isMounted) {
              dispatch(setMessage({ show: false, message: "", type: "warning" }));
            }
          }, 3000);
        }
      } catch (error) {
        if (isMounted) {
          dispatch(
            setMessage({
              show: true,
              message: "Unable to delete the address",
              type: "warning",
            })
          );
        }
      }
    };
    
    window.handleDeleteEffect = handleDeleteEffect;
    
    return () => {
      isMounted = false;
      delete window.handleDeleteEffect;
    };
  }, [dispatch, selectedAddress, resetFormData]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (isConfirmed) {
      window.handleDeleteEffect(id);
    }
  };

  const handleUpdate = () => {
    const updateAddressAndSelectIt = async () => {
      try {
        const result = await dispatch(updateAddress({ 
          id: editAddressId, 
          formData 
        })).unwrap();
        
        setSelectedAddress(editAddressId);
        
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
    
    updateAddressAndSelectIt();
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