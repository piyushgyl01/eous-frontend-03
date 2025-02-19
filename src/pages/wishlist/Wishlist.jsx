import EmptyWishlist from "./EmptyWishlist";
import useWishlisted from "../../customHooks/useWishlisted";
import useProductStatuses from "../../customHooks/useProductStatuses";
import useUpdateWishlist from "../../customHooks/useUpdateWishlist";
import useUpdateCart from "../../customHooks/useUpdateCart";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import ProductCard from "../../components/ProductCard";
import Notification from "../../components/Notification";

export default function Wishlist() {
  const products = useWishlisted();
  const { fetchWishlistedProductsStatus } = useProductStatuses();
  const { handleUpdateWishlist, wishlistId } = useUpdateWishlist();
  const { handleUpdateCart, cartId } = useUpdateCart();

  return (
    <div className="container my-5">
      {products.length === 0 && <EmptyWishlist />}
      <main className="row">
        {products.length > 0 && fetchWishlistedProductsStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            {products.length > 0 && (
              <h1 className="text-center">My Wishlist ({products.length})</h1>
            )}
            <Notification />
            {fetchWishlistedProductsStatus === "error" && (
              <ErrorToast text="Unable to fetch wishlisted products" />
            )}
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                handleUpdateWishlist={handleUpdateWishlist}
                wishlistId={wishlistId}
                handleUpdateCart={handleUpdateCart}
                cartId={cartId}
                type={false}
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
}
