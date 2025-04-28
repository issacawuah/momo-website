import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { ShoppingCart, AccountCircle } from '@material-ui/icons';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}
        >
          MoMo Shop
        </Typography>
        <div>
          <IconButton
            component={Link}
            to="/cart"
            aria-label="Show cart items"
            color="inherit"
          >
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {userInfo ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>
                {userInfo.isAdmin && (
                  <>
                    <MenuItem
                      component={Link}
                      to="/admin/userlist"
                      onClick={handleClose}
                    >
                      Users
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/admin/productlist"
                      onClick={handleClose}
                    >
                      Products
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/admin/orderlist"
                      onClick={handleClose}
                    >
                      Orders
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
            >
              Sign In
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 