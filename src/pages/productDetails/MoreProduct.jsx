import useProductStatuses from "../../customHooks/useProductStatuses";
import useUpdateWishlist from "../../customHooks/useUpdateWishlist";
import useUpdateCart from "../../customHooks/useUpdateCart";
import useUnfilteredProducts from "../../customHooks/useUnfilteredProducts";
import Loader from "../../components/Loader";
import Notification from "../../components/Notification";
import ProductCard from "../../components/ProductCard";

export default function MoreProduct({ id }) {
  const unfilteredProducts = useUnfilteredProducts();
  const { fetchStatus } = useProductStatuses();
  const { handleUpdateWishlist, wishlistId } = useUpdateWishlist();
  const { handleUpdateCart, cartId } = useUpdateCart();

  return (
    <main className="row">
      {fetchStatus === "loading" ? (
        <Loader />
      ) : (
        <>
          <h3>
            <strong>More builds you may like</strong>
          </h3>
          <Notification />
          {fetchStatus === "error" && (
            <ErrorToast text="Unable to load the products" />
          )}
          {unfilteredProducts
            .filter((product) => product._id !== id)
            .map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                handleUpdateWishlist={handleUpdateWishlist}
                wishlistId={wishlistId}
                handleUpdateCart={handleUpdateCart}
                cartId={cartId}
                type={true}
              />
            ))}
        </>
      )}
    </main>
  );
}
