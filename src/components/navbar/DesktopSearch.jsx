import { useDispatch } from "react-redux";
import { IconButton, TextField, Box } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { setSearchTerm } from "../../features/product/productSlice";

export default function DesktopSearch({ filters, handleSearchNavigation }) {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        mx: 2,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        onClick={handleSearchNavigation}
        value={filters.searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        sx={{
          width: "400px",
          backgroundColor: "rgba(255,255,255,0.1)",
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
            color: "white",
            "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
            "&:hover fieldset": {
              borderColor: "rgba(255,255,255,0.3)",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(255,255,255,0.5)",
          },
        }}
        InputProps={{
          startAdornment: (
            <IconButton size="small" sx={{ mr: 1 }}>
              <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}
