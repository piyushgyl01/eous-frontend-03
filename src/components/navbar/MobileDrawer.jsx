import { Link } from "react-router-dom";
import { IconButton, Drawer, List, ListItem, Box } from "@mui/material";
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";

export default function MobileDrawer({ isDrawerOpen, toggleDrawer }) {
  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 250, bgcolor: "#1a1a1a", height: "100%" }}>
        <List>
          {["Profile", "Favorites", "Cart"].map((text, index) => (
            <ListItem
              button
              component={Link}
              to={["/profile", "/wishlist", "/cart"][index]}
              key={text}
              sx={{ color: "white" }}
              onClick={toggleDrawer}
            >
              <IconButton sx={{ color: "white" }}>
                {[<ProfileIcon />, <FavoriteIcon />, <CartIcon />][index]}
              </IconButton>
              {text}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
