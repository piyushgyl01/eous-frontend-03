import ProductList from "../../features/product/ProductList";
import Filters from "./Filters";

export default function Products() {
  return (
    <main className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <Filters />
        </div>
        <div className="col-md-9">
          <ProductList />
        </div>
      </div>
    </main>
  );
}
