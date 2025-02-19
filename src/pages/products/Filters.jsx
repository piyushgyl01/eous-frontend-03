import { useDispatch, useSelector } from "react-redux";
import {
  setPriceRange,
  toggleCategory,
  setRating,
  setSortOrder,
  resetFilters,
  selectFilters,
} from "../../features/product/productSlice";
import { useState } from "react";

export default function Filters() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handlePriceChange = (e) => {
    dispatch(
      setPriceRange({
        min: 0,
        max: parseInt(e.target.value),
      })
    );
  };

  const handleCategoryChange = (category) => {
    dispatch(toggleCategory(category));
  };

  const handleRatingChange = (rating) => {
    dispatch(setRating(rating));
  };

  const handleSortChange = (sortOrder) => {
    dispatch(setSortOrder(sortOrder));
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <>
      <button
        className={`btn w-100 d-md-none mb-3 d-flex align-items-center justify-content-between ${
          isFiltersVisible ? "btn-dark" : "btn-outline-dark"
        }`}
        onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        aria-expanded={isFiltersVisible}
        aria-controls="mobile-filters"
      >
        <div className="d-flex align-items-center gap-2">
          <i
            className={`bi bi-funnel${isFiltersVisible ? "-fill" : ""} fs-5`}
          ></i>
          <span className="fw-semibold">
            {isFiltersVisible ? "Hide Filters" : "Show Filters"}
          </span>
        </div>

        {(filters.selectedCategories.length > 0 ||
          filters.selectedRating > 0 ||
          filters.sortOrder !== "lowToHigh") && (
          <span className="badge bg-danger rounded-pill">
            {[
              filters.selectedCategories.length,
              filters.selectedRating > 0 ? 1 : 0,
              filters.sortOrder !== "lowToHigh" ? 1 : 0,
            ].reduce((a, b) => a + b, 0)}
          </span>
        )}
      </button>
      <div
        className={`${isFiltersVisible ? "d-block" : "d-none"} d-md-block`}
        id="mobile-filters"
      >
        <div className="mt-2 d-flex justify-content-between">
          <h4 className="">
            <strong>Filters</strong>
          </h4>
          <h5
            className=" mt-1"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={handleClearFilters}
          >
            Clear
          </h5>
        </div>
        <div className="row my-5">
          <h5>
            <strong>Price</strong>
          </h5>
          <input
            type="range"
            min="0"
            max="8000"
            value={filters.priceRange.max}
            onChange={handlePriceChange}
            className="form-range"
          />
          <small className="text-muted">
            Range: ${filters.priceRange.min} - ${filters.priceRange.max}
          </small>
        </div>
        <div className="row my-5">
          <h5>
            <strong>Category</strong>
          </h5>
          {["Premium", "Budget", "Ultra-Premium"].map((category) => (
            <label key={category} className="d-block mb-2">
              <input
                type="checkbox"
                checked={filters.selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="me-2"
              />
              {category}
            </label>
          ))}
        </div>
        <div className="row my-5">
          <h5>
            <strong>Rating</strong>
          </h5>
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="d-block mb-2">
              <input
                type="radio"
                name="ratingOptions"
                checked={filters.selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="me-2"
              />
              {rating} Stars & above
            </label>
          ))}
        </div>
        <div className="row my-5">
          <h5>
            <strong>Sort by</strong>
          </h5>
          <label className="d-block mb-2">
            <input
              type="radio"
              name="sortByOptions"
              checked={filters.sortOrder === "lowToHigh"}
              onChange={() => handleSortChange("lowToHigh")}
              className="me-2"
            />
            Price - Low to High
          </label>
          <label className="d-block">
            <input
              type="radio"
              name="sortByOptions"
              checked={filters.sortOrder === "highToLow"}
              onChange={() => handleSortChange("highToLow")}
              className="me-2"
            />
            Price - High to Low
          </label>
        </div>
      </div>
    </>
  );
}
