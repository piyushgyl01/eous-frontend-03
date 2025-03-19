import usePriceDetails from "../../customHooks/usePriceDetails";
import useCheckoutHandlers from "./useCheckoutHandlers";
import useAddress from "./useAddress";
import useOrderHandler from "./useOrderHandler";
import useAddressContext from "../../contexts/AddressContext";
import useCartProducts from "../../customHooks/useCartProducts";
import AddressForm from "../../components/AddressForm";
import PriceDetails from "../../components/PriceDetails";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import AddressView from "./AddressView";
import useAddressStatuses from "../../customHooks/useAddressStatuses";
import useOrderStatuses from "../../customHooks/useOrderStatuses";
import Notification from "../../components/Notification";

export default function Checkout() {
  const { totalDiscountedPrice, productQuantities } = usePriceDetails();
  const products = useCartProducts();
  const addresses = useAddress();
  const { fetchStatus, updateStatus } = useAddressStatuses();
  const { formData, setFormData } = useAddressContext();
  const {
    handleDelete,
    handleUpdate,
    selectedAddress,
    showEditModal,
    editAddressId,
    handleAddressSelect,
    handleEditClick,
    handleModalClose,
  } = useCheckoutHandlers();
  const { handlePlaceOrder } = useOrderHandler();
  const { addOrderStatus } = useOrderStatuses();

  return (
    <div className="container py-5">
      {fetchStatus === "loading" ? (
        <Loader />
      ) : (
        <>
          {fetchStatus === "loading" && (
            <ErrorToast text="Unable to fetch the addresses" />
          )}
          <div className="row">
            <Notification />
          </div>
          <h1 className="text-center mb-4">Checkout</h1>
          <section className="mb-5">
            <h5 className="mb-4">Saved Addresses</h5>
            <div className="row">
              {addresses.map((address) => (
                <AddressView
                  key={address._id}
                  address={address}
                  selectedAddress={selectedAddress}
                  handleAddressSelect={handleAddressSelect}
                  handleEditClick={handleEditClick}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </section>
          <div className="row">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title mb-4">Billing Details</h5>
                  <AddressForm
                    formData={formData}
                    setFormData={setFormData}
                    showModal={false}
                    isInline={true}
                  />
                </div>
              </div>
            </div>
            <PriceDetails
              handlePlaceOrder={handlePlaceOrder}
              totalDiscountedPrice={totalDiscountedPrice}
              productQuantities={productQuantities}
              products={products}
              cart={false}
              addOrderStatus={addOrderStatus}
            />
          </div>
        </>
      )}
      <AddressForm
        formData={formData}
        setFormData={setFormData}
        showModal={showEditModal}
        onClose={handleModalClose}
        onSubmit={() => handleUpdate(editAddressId)}
        isLoading={updateStatus === "loading"}
        title="Edit Address"
        submitText="Save Changes"
      />
    </div>
  );
}
