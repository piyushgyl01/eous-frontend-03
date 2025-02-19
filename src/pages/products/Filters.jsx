import { useState } from "react";
import useFilterHandlers from "../../customHooks/useFilterHandlers";

export default function Filters() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const {
    filters,
    handlePriceChange,
    handleCategoryChange,
    handleRatingChange,
    handleSortChange,
    handleClearFilters,
  } = useFilterHandlers();

  return (
    <div className="filter-container">
      <button
        className="btn btn-outline-dark d-md-none w-100 mb-3 d-flex justify-content-between align-items-center"
        onClick={() => setIsFiltersVisible(!isFiltersVisible)}
      >
        <span>
          <i className="bi bi-funnel me-2"></i>
          {isFiltersVisible ? "Hide Filters" : "Show Filters"}
        </span>
        {(filters.selectedCategories.length > 0 ||
          filters.selectedRating > 0 ||
          filters.sortOrder !== "lowToHigh") && (
          <span className="badge bg-danger rounded-pill">
            {filters.selectedCategories.length +
              (filters.selectedRating > 0 ? 1 : 0) +
              (filters.sortOrder !== "lowToHigh" ? 1 : 0)}
          </span>
        )}
      </button>
      <div className={`${isFiltersVisible ? "d-block" : "d-none"} d-md-block`}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Filters</h5>
          <button className="btn btn-link p-0" onClick={handleClearFilters}>
            Clear
          </button>
        </div>
        <div className="mb-4">
          <h6 className="mb-3">Price</h6>
          <input
            type="range"
            className="form-range"
            min="0"
            max="8000"
            value={filters.priceRange.max}
            onChange={handlePriceChange}
          />
          <small className="text-muted">
            ${filters.priceRange.min} - ${filters.priceRange.max}
          </small>
        </div>
        <div className="mb-4">
          <h6 className="mb-3">Category</h6>
          {["Premium", "Budget", "Ultra-Premium"].map((category) => (
            <div className="form-check mb-2" key={category}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={filters.selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                id={`category-${category}`}
              />
              <label
                className="form-check-label"
                htmlFor={`category-${category}`}
              >
                {category}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h6 className="mb-3">Rating</h6>
          {[4, 3, 2, 1].map((rating) => (
            <div className="form-check mb-2" key={rating}>
              <input
                className="form-check-input"
                type="radio"
                name="rating"
                checked={filters.selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
                id={`rating-${rating}`}
              />
              <label className="form-check-label" htmlFor={`rating-${rating}`}>
                {rating} Stars & above
              </label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h6 className="mb-3">Sort by</h6>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              checked={filters.sortOrder === "lowToHigh"}
              onChange={() => handleSortChange("lowToHigh")}
              id="sort-low"
            />
            <label className="form-check-label" htmlFor="sort-low">
              Price - Low to High
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              checked={filters.sortOrder === "highToLow"}
              onChange={() => handleSortChange("highToLow")}
              id="sort-high"
            />
            <label className="form-check-label" htmlFor="sort-high">
              Price - High to Low
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
