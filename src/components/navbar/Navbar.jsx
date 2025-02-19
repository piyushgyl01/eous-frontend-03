import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, IconButton, Box, Container } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { selectFilters } from "../../features/product/productSlice";
import DesktopNavIcons from "./DesktopNavIcons";
import MobileDrawer from "./MobileDrawer";
import MobileSearch from "./MobileSearch";
import DesktopSearch from "./DesktopSearch";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const filters = useSelector(selectFilters);
  const navigate = useNavigate();
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const handleSearchNavigation = () => {
    if (window.location.pathname !== "/products") navigate("/products");
  };

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
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Box
                component="span"
                sx={{ fontWeight: 700, fontSize: "1.5rem" }}
              >
                EOUS
              </Box>
            </Link>

            <DesktopSearch
              filters={filters}
              handleSearchNavigation={handleSearchNavigation}
            />

            <DesktopNavIcons />

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
      {isSearchOpen && (
        <MobileSearch filters={filters} toggleSearch={toggleSearch} />
      )}
      <MobileDrawer toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />

      <Outlet />
    </>
  );
};

export default Navbar;
