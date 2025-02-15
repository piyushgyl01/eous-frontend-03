// Imports

// React and Router
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
// MUI Core Components
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  TextField,
  Box,
  Container,
  Button,
  Badge,
} from "@mui/material";

// MUI Icons
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartProductsAsync,
  fetchWishlistedProductsAsync,
  selectCartItems,
  selectFilters,
  selectWishlistItems,
  setSearchTerm,
} from "../features/product/productSlice";

// Main Component

const Navbar = () => {
  //   State Management
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Mobile drawer state
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Mobile search state

  //   Redux Hooks
  const dispatch = useDispatch();
  const products = useSelector(selectWishlistItems); // Wishlist items
  const cartProducts = useSelector(selectCartItems); // Cart items

  //   Effects
  // Fetch wishlist items on mount
  useEffect(() => {
    dispatch(fetchWishlistedProductsAsync());
  }, [dispatch]);

  // Fetch cart items on mount
  useEffect(() => {
    dispatch(fetchCartProductsAsync());
  }, [dispatch]);
  const navigate = useNavigate();
  const handleSearchNavigation = () => {
    if (window.location.pathname !== "/products") {
      navigate("/products");
    }
  };

  //   Event Handlers
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  //   Render Helpers
  // Desktop Navigation Icons
  const renderDesktopNavIcons = () => (
    <Box
      sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}
    >
      <IconButton component={Link} to="/cart" sx={{ color: "white" }}>
        <Badge badgeContent={cartProducts.length} color="error">
          <CartIcon />
        </Badge>
      </IconButton>
      <IconButton component={Link} to="/wishlist" sx={{ color: "white" }}>
        <Badge badgeContent={products.length} color="error">
          <FavoriteIcon />
        </Badge>
      </IconButton>
      <IconButton component={Link} to="/profile" sx={{ color: "white" }}>
        <ProfileIcon />
      </IconButton>
    </Box>
  );

  const filters = useSelector(selectFilters);

  // Mobile Search Bar
  const renderMobileSearch = () =>
    isSearchOpen && (
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

  // Mobile Navigation Drawer
  const renderMobileDrawer = () => (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
      <Box
        sx={{ width: 250, bgcolor: "#1a1a1a", height: "100%" }}
        role="presentation"
      >
        <List>
          {["Profile", "Favorites", "Cart"].map((text, index) => (
            <ListItem
              button
              component={Link}
              to={
                text === "Profile"
                  ? "/profile"
                  : text === "Favorites"
                  ? "/wishlist"
                  : "/cart"
              }
              key={text}
              sx={{ color: "white" }}
              onClick={toggleDrawer}
            >
              <IconButton sx={{ color: "white" }}>
                {index === 0 ? (
                  <ProfileIcon />
                ) : index === 1 ? (
                  <FavoriteIcon />
                ) : (
                  <CartIcon />
                )}
              </IconButton>
              {text}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  //   Main Render
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1E1A2B" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <Link to="/" className="text-light text-decoration-none">
              <Box sx={{ display: "flex", alignItems: "center" }}>EOUS</Box>
            </Link>

            {/* Desktop Search Bar */}
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
                onClick={() => handleSearchNavigation()}
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
                    <IconButton
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                    </IconButton>
                  ),
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            {renderDesktopNavIcons()}

            {/* Mobile Navigation */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                onClick={() => {
                  toggleSearch();
                  handleSearchNavigation();
                }}
                sx={{ mr: 1, color: "white" }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Components */}
      {renderMobileSearch()}
      {renderMobileDrawer()}

      {/* Router Outlet */}
      <Outlet />
    </>
  );
};

export default Navbar;
