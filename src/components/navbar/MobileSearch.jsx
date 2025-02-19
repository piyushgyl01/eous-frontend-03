import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField, Box } from "@mui/material";

import { setSearchTerm } from "../../features/product/productSlice";

export default function MobileSearch({ filters, toggleSearch }) {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1300,
        bgcolor: "#28213A",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={filters.searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
            },
          }}
        />
        <IconButton onClick={toggleSearch} sx={{ ml: 1, color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
