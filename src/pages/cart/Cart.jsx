import EmptyCart from "./EmptyCart";
import useProductStatuses from "../../customHooks/useProductStatuses";
import useCartProducts from "../../customHooks/useCartProducts";
import useUpdateWishlist from "../../customHooks/useUpdateWishlist";
import useUpdateCart from "../../customHooks/useUpdateCart";
import usePriceDetails from "../../customHooks/usePriceDetails";
import Loader from "../../components/Loader";
import Notification from "../../components/Notification";
import ErrorToast from "../../components/ErrorToast";
import PriceDetails from "../../components/PriceDetails";
import CartProduct from "./CartProduct";

export default function Cart() {
  const products = useCartProducts();
  const {
    handleDecrement,
    handleIncrement,
    totalDiscountedPrice,
    productQuantities,
  } = usePriceDetails();
  const { fetchCartProductsStatus } = useProductStatuses();
  const { handleUpdateWishlist, wishlistId } = useUpdateWishlist();
  const { handleUpdateCart, cartId } = useUpdateCart();

  return (
    <div className="container my-5">
      <main className="row">
        {products.length < 0 && fetchCartProductsStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-center">My Cart ({products.length})</h1>
            <Notification />
            {fetchCartProductsStatus === "error" && (
              <ErrorToast text="Unable to fetch the cart products" />
            )}
            <div className="col-md-8 ">
              {products.length === 0 && <EmptyCart />}
              {products.map((product) => (
                <CartProduct
                  product={product}
                  key={product._id}
                  handleUpdateWishlist={handleUpdateWishlist}
                  wishlistId={wishlistId}
                  handleUpdateCart={handleUpdateCart}
                  cartId={cartId}
                  type={true}
                  handleDecrement={handleDecrement}
                  handleIncrement={handleIncrement}
                  productQuantities={productQuantities}
                />
              ))}
            </div>
            <PriceDetails
              totalDiscountedPrice={totalDiscountedPrice}
              productQuantities={productQuantities}
              products={products}
              cart={true}
            />
          </>
        )}
      </main>
    </div>
  );
}
