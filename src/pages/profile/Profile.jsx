import useAddressContext from "../../contexts/AddressContext";
import useOrders from "./useOrders";
import useProfileHandler from "./useProfileHandler";
import AddressForm from "../../components/AddressForm";
import Loader from "../../components/Loader";
import useOrderStatuses from "../../customHooks/useOrderStatuses";
import Notification from "../../components/Notification";
import ProfileCard from "./ProfileCard";
import OrderCard from "./OrderCard";

export default function Profile() {
  const { formData, setFormData } = useAddressContext();
  const {
    showEditModal,
    handleEditClick,
    handleModalClose,
    handlePostAddress,
  } = useProfileHandler();
  const orders = useOrders();
  const { fetchStatus, addStatus } = useOrderStatuses();

  return (
    <>
      <div className="container py-5">
        {fetchStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div className="row">
              <Notification />
            </div>
            <div className="d-flex justify-content-between mb-4">
              <h1>
                Welcome! <span className="text-primary">John Doe</span>
              </h1>
            </div>
            <ProfileCard handleEditClick={handleEditClick} />
            <div className="card shadow mt-5">
              <div className="card-body p-4">
                <h2 className="text-primary mb-4">Order History</h2>
                {orders.map((order) => (
                  <OrderCard order={order} key={order._id} />
                ))}
              </div>
            </div>
          </>
        )}
        <AddressForm
          formData={formData}
          setFormData={setFormData}
          showModal={showEditModal}
          onClose={handleModalClose}
          onSubmit={handlePostAddress}
          isLoading={addStatus === "loading"}
          title="Add New Address"
          submitText="Add Address"
        />
      </div>
    </>
  );
}
