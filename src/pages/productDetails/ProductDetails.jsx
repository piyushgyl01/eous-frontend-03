import { useNavigate } from "react-router-dom";
import MoreProduct from "./MoreProduct";
import useQuantity from "../../contexts/CartContext";
import useProductDetails from "./useProductDetails";
import useProductStatuses from "../../customHooks/useProductStatuses";
import useUpdateWishlist from "../../customHooks/useUpdateWishlist";
import useUpdateCart from "../../customHooks/useUpdateCart";
import useBuyNow from "./useBuyNow";
import Loader from "../../components/Loader";
import Notification from "../../components/Notification";
import ErrorToast from "../../components/ErrorToast";
import DetailsCard from "./DetailsCard";

export default function ProductDetails() {
  const { product, id } = useProductDetails();
  const { productQuantities, updateQuantity } = useQuantity();
  const { handleUpdateWishlist, wishlistId } = useUpdateWishlist();
  const { handleUpdateCart, cartId } = useUpdateCart();
  const { fetchProductByIdStatus } = useProductStatuses();
  const handleBuyNow = useBuyNow();

  return (
    <>
      {fetchProductByIdStatus === "loading" ? (
        <Loader />
      ) : (
        <main className="container my-5">
          <Notification />
          {fetchProductByIdStatus === "error" && (
            <ErrorToast text="Unable to load the product details" />
          )}
          <DetailsCard
            product={product}
            id={id}
            productQuantities={productQuantities}
            updateQuantity={updateQuantity}
            handleUpdateCart={handleUpdateCart}
            wishlistId={wishlistId}
            handleUpdateWishlist={handleUpdateWishlist}
            cartId={cartId}
            handleBuyNow={handleBuyNow}
          />
          <hr />
          <div className="row my-5">
            <MoreProduct id={id} />
          </div>
        </main>
      )}
    </>
  );
}
