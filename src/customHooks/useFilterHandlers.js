import { useDispatch, useSelector } from "react-redux";
import {
  setPriceRange,
  toggleCategory,
  setRating,
  setSortOrder,
  resetFilters,
  selectFilters,
} from "../features/product/productSlice";

export default function useFilterHandlers() {
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

  return {
    filters,
    handlePriceChange,
    handleCategoryChange,
    handleRatingChange,
    handleSortChange,
    handleClearFilters,
  };
}
