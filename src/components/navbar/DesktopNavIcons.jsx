import { Link } from "react-router-dom";
import { IconButton, Box, Badge } from "@mui/material";
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";
import useWishlisted from "../../customHooks/useWishlisted";
import useCartProducts from "../../customHooks/useCartProducts";

export default function DesktopNavIcons() {
  const wishlistItems = useWishlisted();
  const cartItems = useCartProducts();

  return (
    <Box
      sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}
    >
      <IconButton component={Link} to="/cart" sx={{ color: "white" }}>
        <Badge badgeContent={cartItems.length} color="error">
          <CartIcon />
        </Badge>
      </IconButton>
      <IconButton component={Link} to="/wishlist" sx={{ color: "white" }}>
        <Badge badgeContent={wishlistItems.length} color="error">
          <FavoriteIcon />
        </Badge>
      </IconButton>
      <IconButton component={Link} to="/profile" sx={{ color: "white" }}>
        <ProfileIcon />
      </IconButton>
    </Box>
  );
}
