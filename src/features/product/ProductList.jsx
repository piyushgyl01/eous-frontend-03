import useFilteredProducts from "../../customHooks/useFilteredProducts";
import useUpdateCart from "../../customHooks/useUpdateCart";
import useUpdateWishlist from "../../customHooks/useUpdateWishlist";
import useProductStatuses from "../../customHooks/useProductStatuses";
import Notification from "../../components/Notification";
import Loader from "../../components/Loader";
import ErrorToast from "../../components/ErrorToast";
import ProductCard from "../../components/ProductCard";

export default function ProductList() {
  const filteredProducts = useFilteredProducts();
  const { fetchStatus } = useProductStatuses();
  const { handleUpdateWishlist, wishlistId } = useUpdateWishlist();
  const { handleUpdateCart, cartId } = useUpdateCart();

  return (
    <main className="row">
      {fetchStatus === "loading" ? (
        <Loader />
      ) : (
        <>
          <h1>Showing All Products</h1>
          <small>(Showing {filteredProducts.length} Products)</small>
          <Notification />
          {fetchStatus === "error" && (
            <ErrorToast text="Unable to load the products" />
          )}
          {filteredProducts.map((product) => (
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
