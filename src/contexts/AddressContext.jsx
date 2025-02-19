import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const AddressContext = createContext();

const useAddressContext = () => useContext(AddressContext);

export default useAddressContext;

export function AddressProvider({ children }) {
  const [formData, setFormData] = useState({
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

  return (
    <AddressContext.Provider value={{ setFormData, formData }}>
      {children}
    </AddressContext.Provider>
  );
}
