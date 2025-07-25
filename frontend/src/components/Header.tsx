import React, { useState, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Button,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItem
} from '@mui/material'
import {
  Menu as MenuIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  More as MoreIcon,
  Language as LanguageIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  InfoTwoTone as AboutIcon,
  DescriptionTwoTone as TosIcon,
  ExitToApp as SignoutIcon,
  Login as LoginIcon,
  EventSeat as BookingsIcon,
  Business as AgencyIcon,
  LocationOn as LocationIcon,
  PersonOutline as SignUpIcon,
  PrivacyTip as PrivacyIcon,
  Cookie as CookiePolicyIcon,
} from '@mui/icons-material'
import { toast } from 'react-toastify'
import { CircleFlag } from 'react-circle-flags'
import * as movininTypes from ':movinin-types'
import env from '@/config/env.config'
import { strings as commonStrings } from '@/lang/common'
import { strings as suStrings } from '@/lang/sign-up'
import { strings } from '@/lang/header'
import * as UserService from '@/services/UserService'
import * as PaymentService from '@/services/PaymentService'
import Avatar from './Avatar'
import * as langHelper from '@/utils/langHelper'
import * as helper from '@/utils/helper'
import { useNotificationContext, NotificationContextType } from '@/context/NotificationContext'
import { useUserContext, UserContextType } from '@/context/UserContext'

import '@/assets/css/header.css'

const flagHeight = 28

interface HeaderProps {
  hidden?: boolean
  hideSignin?: boolean
}

const Header = ({
  hidden,
  hideSignin,
}: HeaderProps) => {
  const navigate = useNavigate()

  const { user } = useUserContext() as UserContextType
  const { notificationCount } = useNotificationContext() as NotificationContextType

  const [currentUser, setCurrentUser] = useState<movininTypes.User>()

  const [lang, setLang] = useState(helper.getLanguage(env.DEFAULT_LANGUAGE))
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [langAnchorEl, setLangAnchorEl] = useState<HTMLElement | null>(null)
  const [currencyAnchorEl, setCurrencyAnchorEl] = useState<HTMLElement | null>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<HTMLElement | null>(null)
  const [sideAnchorEl, setSideAnchorEl] = useState<HTMLElement | null>(null)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const isLangMenuOpen = Boolean(langAnchorEl)
  const isCurrencyMenuOpen = Boolean(currencyAnchorEl)
  const isSideMenuOpen = Boolean(sideAnchorEl)

  const classes = {
    list: {
      width: 250,
    },
    formControl: {
      margin: 1,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: 2,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 2,
      color: '#121212',
    },
  }

  useEffect(() => {
    const language = langHelper.getLanguage()
    setLang(helper.getLanguage(language))
    langHelper.setLanguage(strings, language)
  }, [])

  useEffect(() => {
    if (user) {
      setCurrentUser(user)
      setIsSignedIn(true)
    } else {
      setCurrentUser(undefined)
      setIsSignedIn(false)
    }
    setIsLoaded(true)
  }, [user])

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget)
  }

  const handleCurrencyMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCurrencyAnchorEl(event.currentTarget)
  }

  const refreshPage = () => {
    // const params = new URLSearchParams(window.location.search)

    // if (params.has('l')) {
    //   params.delete('l')
    //   // window.location.href = window.location.href.split('?')[0] + ([...params].length > 0 ? `?${params}` : '')
    //   window.location.replace(window.location.href.split('?')[0] + ([...params].length > 0 ? `?${params}` : ''))
    // } else {
    //   // window.location.reload()
    //   window.location.replace(window.location.href)
    // }
    navigate(0)
  }

  const handleLangMenuClose = async (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(null)

    const { code } = event.currentTarget.dataset
    if (code) {
      setLang(helper.getLanguage(code))
      const currentLang = UserService.getLanguage()
      if (isSignedIn && user) {
        // Update user language
        const data: movininTypes.UpdateLanguagePayload = {
          id: user._id as string,
          language: code,
        }
        const status = await UserService.updateLanguage(data)
        if (status === 200) {
          UserService.setLanguage(code)
          if (code && code !== currentLang) {
            // Refresh page
            refreshPage()
          }
        } else {
          toast(commonStrings.CHANGE_LANGUAGE_ERROR, { type: 'error' })
        }
      } else {
        UserService.setLanguage(code)
        if (code && code !== currentLang) {
          // Refresh page
          refreshPage()
        }
      }
    }
  }

  const handleCurrencyMenuClose = async (event: React.MouseEvent<HTMLElement>) => {
    setCurrencyAnchorEl(null)

    const { code } = event.currentTarget.dataset
    if (code) {
      const currentCurrency = PaymentService.getCurrency()

      if (code && code !== currentCurrency) {
        PaymentService.setCurrency(code)
        // Refresh page
        refreshPage()
      }
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleSettingsClick = () => {
    handleMenuClose()
    navigate('/settings')
  }

  const handleSignout = async () => {
    await UserService.signout(true, false)
    handleMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleSideMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSideAnchorEl(event.currentTarget)
  }

  const handleSideMenuClose = () => {
    setSideAnchorEl(null)
  }

  const handleNotificationsClick = () => {
    navigate('/notifications')
  }

  const menuId = 'primary-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className="menu"
    >
      <MenuItem onClick={handleSettingsClick}>
        <SettingsIcon className="header-action" />
        {strings.SETTINGS}
      </MenuItem>
      <MenuItem onClick={handleSignout}>
        <SignoutIcon className="header-action" />
        <Typography>{strings.SIGN_OUT}</Typography>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'mobile-menu'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className="menu"
    >
      <MenuItem onClick={handleSettingsClick}>
        <SettingsIcon className="header-action" />
        <p>{strings.SETTINGS}</p>
      </MenuItem>
      <MenuItem onClick={handleLangMenuOpen}>
        <IconButton aria-label="language of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
          <LanguageIcon />
        </IconButton>
        <p>{strings.LANGUAGE}</p>
      </MenuItem>
      <MenuItem onClick={handleSignout}>
        <IconButton color="inherit">
          <SignoutIcon />
        </IconButton>
        <Typography>{strings.SIGN_OUT}</Typography>
      </MenuItem>
    </Menu>
  )

  const languageMenuId = 'language-menu'
  const renderLanguageMenu = (
    <Menu
      anchorEl={langAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={languageMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isLangMenuOpen}
      onClose={handleLangMenuClose}
      className="menu"
    >
      {
        env._LANGUAGES.map((language) => (
          <MenuItem onClick={handleLangMenuClose} data-code={language.code} key={language.code}>
            <div className="language">
              <CircleFlag countryCode={language.countryCode as string} height={flagHeight} className="flag" title={language.label} />
              <span>{language.label}</span>
            </div>
          </MenuItem>
        ))
      }
    </Menu>
  )

  const currencyMenuId = 'currency-menu'
  const renderCurrencyMenu = (
    <Menu
      anchorEl={currencyAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={currencyMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isCurrencyMenuOpen}
      onClose={handleCurrencyMenuClose}
      className="menu"
    >
      {
        env.CURRENCIES.map((_currency) => (
          <MenuItem onClick={handleCurrencyMenuClose} data-code={_currency.code} key={_currency.code}>
            {_currency.code}
          </MenuItem>
        ))
      }
    </Menu>
  )

  return (
    (!hidden && (
      <div style={classes.grow} className="header">
        <AppBar position="relative" sx={{ bgcolor: '#fff', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
          <Toolbar className="toolbar">
            {isLoaded && (
              <>
                <IconButton edge="start" sx={classes.menuButton} color="inherit" aria-label="open drawer" onClick={handleSideMenuOpen}>
                  <MenuIcon />
                </IconButton>

                <Button onClick={() => navigate('/')} className="logo">{env.WEBSITE_NAME}</Button>
              </>
            )}
            <>
              <Drawer open={isSideMenuOpen} onClose={handleSideMenuClose} className="menu side-menu">
                <List sx={classes.list}>
                  <ListItem
                    onClick={() => {
                      navigate('/')
                      handleSideMenuClose()
                    }}
                  >
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary={strings.HOME} />
                  </ListItem>
                  {isSignedIn && (
                    <ListItem
                      onClick={() => {
                        navigate('/bookings')
                        handleSideMenuClose()
                      }}
                    >
                      <ListItemIcon><BookingsIcon /></ListItemIcon>
                      <ListItemText primary={strings.BOOKINGS} />
                    </ListItem>
                  )}
                  <ListItem
                    onClick={() => {
                      navigate('/agencies')
                      handleSideMenuClose()
                    }}
                  >
                    <ListItemIcon><AgencyIcon /></ListItemIcon>
                    <ListItemText primary={strings.AGENCIES} />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      navigate('/destinations')
                      handleSideMenuClose()
                    }}
                  >
                    <ListItemIcon><LocationIcon /></ListItemIcon>
                    <ListItemText primary={strings.LOCATIONS} />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      navigate('/about')
                      handleSideMenuClose()
                    }}
                  >
                    <ListItemIcon><AboutIcon /></ListItemIcon>
                    <ListItemText primary={strings.ABOUT} />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      navigate('/cookie-policy')
                      handleSideMenuClose()
                    }}
                  >
                    <ListItemIcon><CookiePolicyIcon /></ListItemIcon>
                    <ListItemText primary={strings.COOKIE_POLICY} />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      navigate('/privacy')
                      handleSideMenuClose()
                    }}
                  >
                    <ListItemIcon><PrivacyIcon /></ListItemIcon>
                    <ListItemText primary={strings.PRIVACY_POLICY} />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      navigate('/tos')
                      handleSideMenuClose()
                    }}
                  >
                    <ListItemIcon><TosIcon /></ListItemIcon>
                    <ListItemText primary={strings.TOS} />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      navigate('/contact')
                      handleSideMenuClose()
                    }}
                  >
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={strings.CONTACT} />
                  </ListItem>
                  {env.isMobile && !hideSignin && !isSignedIn && isLoaded && (
                    <>
                      <ListItem
                        onClick={() => {
                          navigate('/sign-in')
                          handleSideMenuClose()
                        }}
                      >
                        <ListItemIcon><LoginIcon /></ListItemIcon>
                        <ListItemText primary={strings.SIGN_IN} />
                      </ListItem>
                      <ListItem
                        onClick={() => {
                          navigate('/sign-up')
                          handleSideMenuClose()
                        }}
                      >
                        <ListItemIcon><SignUpIcon /></ListItemIcon>
                        <ListItemText primary={suStrings.SIGN_UP} />
                      </ListItem>
                    </>
                  )}
                </List>
              </Drawer>
            </>
            <div style={classes.grow} />
            <div className="header-desktop">
              {isLoaded && (
                <Button variant="contained" onClick={handleCurrencyMenuOpen} disableElevation className="btn bold">
                  {PaymentService.getCurrency()}
                </Button>
              )}
              {isLoaded && (
                <Button variant="contained" onClick={handleLangMenuOpen} disableElevation fullWidth className="btn">
                  {/* {lang?.label} */}
                  <CircleFlag countryCode={lang?.countryCode as string} height={flagHeight} className="flag" title={lang?.label} />
                </Button>
                
              )}
              {!hideSignin && !isSignedIn && isLoaded && (
                <Button variant="contained" size="medium" startIcon={<SignUpIcon />} onClick={() => navigate('/sign-up')} disableElevation className="btn btn-auth" aria-label="Sign in">
                  <span className="btn-auth-txt">{suStrings.SIGN_UP}</span>
                </Button>
              )}
              {!hideSignin && !isSignedIn && isLoaded && (
                <Button variant="contained" startIcon={<LoginIcon />} href="/sign-in" disableElevation fullWidth className="btn btn-auth">
                  <span className="btn-auth-txt">{strings.SIGN_IN}</span>
                </Button>
              )}
              {isSignedIn && (
                <IconButton aria-label="" color="inherit" onClick={handleNotificationsClick} className="btn">
                  <Badge badgeContent={notificationCount > 0 ? notificationCount : null} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}
              {isSignedIn && (
                <IconButton edge="end" aria-label="account" aria-controls={menuId} aria-haspopup="true" onClick={handleAccountMenuOpen} color="inherit" className="btn">
                  <Avatar loggedUser={currentUser} user={currentUser} size="small" readonly />
                </IconButton>
              )}
            </div>
            <div className="header-mobile">
              <Button variant="contained" onClick={handleCurrencyMenuOpen} disableElevation fullWidth className="btn bold">
                {PaymentService.getCurrency()}
              </Button>
              {!isSignedIn && (
                <Button variant="contained" onClick={handleLangMenuOpen} disableElevation fullWidth className="btn">
                  {/* {lang?.label} */}
                  <CircleFlag countryCode={lang?.countryCode as string} height={flagHeight} className="flag" title={lang?.label} />
                </Button>
              )}
              {isSignedIn && (
                <IconButton color="inherit" onClick={handleNotificationsClick} className="btn">
                  <Badge badgeContent={notificationCount > 0 ? notificationCount : null} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}
              {isSignedIn && (
                <IconButton aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit" className="btn">
                  <MoreIcon />
                </IconButton>
              )}
            </div>
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
        {renderMenu}
        {renderLanguageMenu}
        {renderCurrencyMenu}
      </div>
    )) || <></>
  )
}

export default memo(Header);
