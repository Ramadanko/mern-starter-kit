import React from 'react'
import Logout from '../Logout/Logout'
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  Box,
  Grid,
  Collapse
} from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'
import './header.scss'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../logo.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  Toolbar: { minHeight: 'auto' },
  MenuList: {
    padding: 0,
    '& li': {
      [theme.breakpoints.up('sm')]: {
        display: 'inline-block'
      },
      padding: '0'
    }
  },
  spacer: {
    flexGrow: 1
  },
  Grid: {
    maxWidth: 100
  }
}))

export default ({ toggleMenu, toggleAvatarMenu, isDesktop, anchorEl, closeAvatarMenu, ...props }) => {
  const classes = useStyles()
  return (
    <div className='top-header'>
      <AppBar position='static' color='primary'>
        <Toolbar className='toolbar-custom'>
          <Box className='logo-wrapper'>
            <Grid container>
              <Grid item><NavLink to='/' className='page-logo'><Avatar alt='logo' src={logo} /></NavLink></Grid>
              <Grid item>
                <IconButton
                  className='toggle-top-level-links' edge='start' color='inherit' aria-label='menu'
                  onClick={toggleMenu}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Collapse in={isDesktop}>
            <MenuList className={classes.MenuList + ' top-level-links'}>
              <MenuItem>
                <NavLink activeClassName='selected' exact to='/'>Home</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink activeClassName='selected' to='/task'>Tasks</NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink activeClassName='selected' to='/test'>Test</NavLink>
              </MenuItem>
            </MenuList>
          </Collapse>
          <span className='spacer' />
          <Box className='header-icons'>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
              onClick={toggleAvatarMenu}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={closeAvatarMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        className='avatar-menu'
      >
        <MenuItem>
          <Link to='/profile'>Profile</Link>
        </MenuItem>
        <MenuItem>
          <Logout />
        </MenuItem>
      </Menu>
    </div>
  )
}
